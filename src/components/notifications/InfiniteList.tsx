import DataList from './DataList';
import { useState, useCallback, useEffect } from 'react';
import { config } from 'src/config'
import { nonEmptyArr } from '@subsocial/utils';
import InfiniteScroll from 'react-infinite-scroll-component';
import { useLinkParams } from '../utils/useLinkParams';
import { useRouter } from 'next/router';
import { tryParseInt } from '../utils/num';
import {
  DataListItemProps,
  InnerLoadMoreFn,
  CanHaveMoreDataFn,
  DataListProps,
} from '../../models/dataActivities';
import Loader from '../common/loader/Loader';

type InnerInfiniteListProps<T> = Partial<DataListProps<T>> &
  DataListItemProps<T> & {
    loadMore: InnerLoadMoreFn<T>;
    totalCount?: number;
    loadingLabel?: string;
    withLoadMoreLink?: boolean; // Helpful for SEO
    canHaveMoreData: CanHaveMoreDataFn<T>;
  };

type InfiniteListPropsByData<T> = Omit<
  InnerInfiniteListProps<T>,
  'canHaveMoreData'
>;

type InfiniteListByPageProps<T> = InfiniteListPropsByData<T> & {
  totalCount: number;
};

export const InfiniteListByPage = <T extends any>(
  props: InfiniteListByPageProps<T>
) => {
  const { totalCount } = props;
  const {
    query: { page: pagePath },
  } = useRouter();

  const initialPage = pagePath
    ? tryParseInt(pagePath.toString(), config.infinityScrollFirstPage)
    : config.infinityScrollFirstPage;

  const offset = (initialPage - 1) * config.infinityScrollOffset;
  const lastPage = Math.ceil((totalCount - offset) / config.infinityScrollOffset);

  const canHaveMoreData: CanHaveMoreDataFn<T> = (data, page) =>
    data ? (page ? page < lastPage && nonEmptyArr(data) : false) : true;

  return <InnerInfiniteList {...props} canHaveMoreData={canHaveMoreData} />;
};

const canHaveMoreData = <T extends any>(currentPageItems?: T[]) => {
  return currentPageItems ? currentPageItems.length >= config.infinityScrollOffset : true;
};

export const InfiniteListByData = <T extends any>(
  props: InfiniteListPropsByData<T>
) => <InnerInfiniteList {...props} canHaveMoreData={canHaveMoreData} />;

const InnerInfiniteList = <T extends any>(props: InnerInfiniteListProps<T>) => {
  const {
    loadingLabel = 'Loading data...',
    withLoadMoreLink = false,
    dataSource,
    getKey,
    renderItem,
    loadMore,
    totalCount,
    canHaveMoreData,
    ...otherProps
  } = props;

  const {
    query: { page: pagePath },
  } = useRouter();

  const hasInitialData = nonEmptyArr(dataSource);

  const initialPage = pagePath
    ? tryParseInt(pagePath.toString(), config.infinityScrollFirstPage)
    : config.infinityScrollFirstPage;

  const [page, setPage] = useState(initialPage);
  const [data, setData] = useState(dataSource || []);
  const [loading, setLoading] = useState(false);

  const [hasMore, setHasMore] = useState(canHaveMoreData(dataSource, page));

  const getLinksParams = useLinkParams({
    defaultSize: config.infinityScrollOffset,
    triggers: [page],
  });

  const handleInfiniteOnLoad = useCallback(async (page: number) => {
    setLoading(true);
    const newData = await loadMore(page, config.infinityScrollOffset);
    data.push(...newData);

    setData([...data]);

    if (!canHaveMoreData(newData, page)) {
      setHasMore(false);
    }

    setPage(page + 1);
    setLoading(false);
  }, []);
  useEffect(() => {
    if (hasInitialData) return setPage(page + 1);
    handleInfiniteOnLoad(page);
  }, []);

  const linkProps = getLinksParams(page + 1);
  return (
    <InfiniteScroll
      dataLength={data.length}
      next={() => handleInfiniteOnLoad(page)}
      hasMore={hasMore}
      loader={<Loader label={loadingLabel} />}
    >
      <DataList
        {...otherProps}
        totalCount={totalCount}
        dataSource={data}
        getKey={getKey}
        renderItem={renderItem}
      />
    </InfiniteScroll>
  );
};
