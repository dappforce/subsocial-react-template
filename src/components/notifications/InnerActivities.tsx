import { InnerActivitiesProps } from '../../models/dataActivities';
import { useState, useEffect, useCallback } from 'react';
import { useDispatch } from 'react-redux';
import { useApi } from '../api';
import { InfiniteListByPage } from './InfiniteList';

export function InnerActivities<T>(props: InnerActivitiesProps<T>) {
  const {
    address,
    getCount,
    totalCount,
    noDataDesc,
    loadingLabel,
    loadMore,
    ...otherProps
  } = props;

  const { api } = useApi();
  const dispatch = useDispatch();

  const [total, setTotalCount] = useState<number | undefined>(totalCount);

  useEffect(() => {
    if (!address || !getCount) return;

    getCount ? getCount(address).then(setTotalCount) : setTotalCount(0);
  }, [address]);

  const loadMoreFn = (page: number, size: number) =>
    loadMore({ api, dispatch, address, page, size });

  const List = useCallback(
    () => (
      <InfiniteListByPage
        {...otherProps}
        loadMore={loadMoreFn}
        loadingLabel={loadingLabel}
        noDataDesc={noDataDesc}
        totalCount={total || 0}
      />
    ),
    [address, loadMoreFn]
  );

  return <List />;
}
