import React from 'react';
import { DataListItemProps, DataListProps } from '../../models/dataActivities';
import NotificationsPage from './NotificationsPage';

export function DataList<T extends any>(props: DataListProps<T>) {
  const {
    dataSource,
    totalCount,
    renderItem,
    getKey,
    customNoData,
    beforeList,
  } = props;

  const total = totalCount || dataSource.length;

  const hasData = total > 0;

  const list = (
    <>
      {beforeList}
      {hasData ? (
        <>
          {dataSource.map((x, i) => (
            <React.Fragment key={getKey(x)}>{renderItem(x, i)}</React.Fragment>
          ))}
        </>
      ) : (
        customNoData
      )}
    </>
  );

  return <NotificationsPage> {list}</NotificationsPage>;
}

export default DataList;
