import React, { FC, useEffect, useState } from 'react';
import styles from './InfinityListScroll.module.sass';
import InfiniteScroll from 'react-infinite-scroll-component';
import { config } from 'src/config'
import { nonEmptyArr } from '@subsocial/utils';
import Loader from '../../common/loader/Loader';
import EmptyComponent from '../../common/empty/EmptyComponent';
import { DataListItemProps, InnerLoadMoreFn } from 'src/models/infinity-scroll';
import { useTranslation } from 'react-i18next';

interface InfinityPostList extends DataListItemProps {
  dataSource: string[];
  loadMore: InnerLoadMoreFn;
  totalCount: number;
  isEmpty?: boolean;
  emptyText: string;
}

const InfinityListScroll: FC<InfinityPostList> = ({
  dataSource,
  loadMore,
  totalCount,
  isEmpty,
  emptyText,
  renderItem,
}) => {
  const [page, setPage] = useState(1);
  const [data, setData] = useState(dataSource.length > 0 ? dataSource : []);
  const { t } = useTranslation();

  const handleInfiniteOnLoad = async (page: number) => {
    const newData = page === 1 ? [] : await loadMore(page, config.infinityScrollOffset);
    setData((current: any) => [...current, ...newData]);
    setPage(page + 1);
  };

  const hasInitialData = nonEmptyArr(dataSource);

  useEffect(() => {
    setData(dataSource);
  }, [dataSource]);

  useEffect(() => {
    if (hasInitialData) return setPage(page + 1);
    handleInfiniteOnLoad(page);
  }, []);

  return (
    <InfiniteScroll
      dataLength={data.length}
      loader={<Loader label={t('content.loading')} />}
      next={() => handleInfiniteOnLoad(page)}
      hasMore={data.length < totalCount}
      className={styles.list}
    >
      {!isEmpty ? (
        data.map((id: string) => renderItem(id))
      ) : (
        <EmptyComponent text={emptyText} />
      )}
    </InfiniteScroll>
  );
};

export default InfinityListScroll;
