import { FlatSubsocialApi } from '@subsocial/api/flat-subsocial';
import { ProfileData } from '@subsocial/types/dto';
import {
  Activity,
  AnyAccountId,
  EventsName,
} from '@subsocial/types';
import { AppDispatch } from 'src/store/app/store';

export type AddressProps = {
  className?: string;
  style?: React.CSSProperties;
  address: AnyAccountId;
  owner?: ProfileData;
};

export type EventsMsg = {
  [key in EventsName]: string;
};

export type RowKeyFn<T> = (item: T) => string;

export type RenderItemFn<T> = (item: T, index: number) => React.ReactNode;

export type ParsedPaginationQuery = {
  page: number;
  size: number;
};

export type LoadMoreProps = ParsedPaginationQuery & {
  api: FlatSubsocialApi;
  dispatch: AppDispatch;
  address?: string;
};
export type LoadMoreFn = (
  myAddress: string,
  offset: number,
  limit: number
) => Promise<Activity[]>;

type GetCountFn = (account: string) => Promise<number>;

export type BaseActivityProps = {
  address: string;
  totalCount?: number;
  title?: string;
};

export type ActivityProps<T> = BaseActivityProps & {
  loadMore: (props: LoadMoreProps) => Promise<T[]>;
  getCount?: GetCountFn;
  noDataDesc?: string;
  loadingLabel?: string;
};

export type DataListItemProps<T> = {
  getKey: RowKeyFn<T>;
  renderItem: RenderItemFn<T>;
};
export type DataListOptProps = {
  title?: React.ReactNode;
  level?: number;
  noDataDesc?: React.ReactNode;
  noDataExt?: React.ReactNode;
  customNoData?: React.ReactNode;
  className?: string;
};

export type DataListProps<T extends any> = DataListOptProps &
  DataListItemProps<T> & {
    totalCount?: number;
    dataSource: T[];
    beforeList?: React.ReactNode;
    children?: React.ReactNode;
  };

export type InnerActivitiesProps<T> = ActivityProps<T> & DataListItemProps<T>;

//----------------------------------------------------------------------------

export type Data = {
  account: string;
  agg_count: number;
  aggregated: boolean;
  block_number: string;
  comment_id: string | null;
  date: string;
  event: string;
  event_index: number;
  following_id: string | null;
  parent_comment_id: string | null;
  post_id: string | null;
  space_id: string;
};

export type InnerLoadMoreFn<T = string> = (
  page: number,
  size: number
) => Promise<T[]>;

export type CanHaveMoreDataFn<T> = (
  data: T[] | undefined,
  page: number
) => boolean;
