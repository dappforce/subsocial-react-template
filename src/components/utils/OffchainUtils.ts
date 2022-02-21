import axios from 'axios';
import { Activity } from '@subsocial/types';
import { nonEmptyStr } from '@subsocial/utils';

type ActivityType =
  | 'follows'
  | 'posts'
  | 'comments'
  | 'reactions'
  | 'spaces'
  | 'counts';

const offchainUrl = 'https://dev-subsocial.codebridge.tech/offchain';
function getOffchainUrl(subUrl: string): string {
  return `${offchainUrl}/v1/offchain${subUrl}`;
}

export const createActivitiesUrlByAddress = (
  address: string,
  entity: 'feed' | 'notifications' | 'activities'
) => getOffchainUrl(`/${entity}/${address}`);

const axiosRequest = async (url: string) => {
  try {
    const res = await axios.get(url);
    if (res.status !== 200) {
      console.error('Failed request to offchain with status', res.status);
    }

    return res;
  } catch (err) {
    console.error('Failed request to offchain with error', err);
    return err;
  }
};

export const getActivity = async (
  url: string,
  offset: number,
  limit: number
): Promise<Activity[]> => {
  try {
    const res = await axiosRequest(`${url}?offset=${offset}&limit=${limit}`);
    //@ts-ignore
    const { data } = res;
    return data;
  } catch (err) {
    console.error('Failed to get activities from offchain with error', err);
    return [];
  }
};

export const getCount = async (url: string): Promise<number> => {
  try {
    const res = await axiosRequest(`${url}/count`);
    //@ts-ignore
    const { data } = res;
    return data;
  } catch (err) {
    console.error(
      'Failed to get count of activities from offchain with error',
      err
    );
    return 0;
  }
};

const createFeedUrlByAddress = (address: string) =>
  createActivitiesUrlByAddress(address, 'feed');
const createNotificationsUrlByAddress = (address: string) =>
  createActivitiesUrlByAddress(address, 'notifications');
const createActivityUrlByAddress = (
  address: string,
  activityType?: ActivityType
) => {
  const type = nonEmptyStr(activityType) ? `/${activityType}` : '';
  return `${createActivitiesUrlByAddress(address, 'activities')}${type}`;
};

export const getNewsFeed = async (
  myAddress: string,
  offset: number,
  limit: number
): Promise<Activity[]> =>
  await getActivity(createFeedUrlByAddress(myAddress), offset, limit);

export const getFeedCount = (myAddress: string) =>
  getCount(createFeedUrlByAddress(myAddress));

export const getNotifications = async (
  myAddress: string,
  offset: number,
  limit: number
): Promise<Activity[]> =>
  getActivity(createNotificationsUrlByAddress(myAddress), offset, limit);
export const getNotificationsCount = async (myAddress: string) =>
  getCount(createNotificationsUrlByAddress(myAddress));

export const getActivities = async (
  myAddress: string,
  offset: number,
  limit: number
): Promise<Activity[]> =>
  getActivity(createActivityUrlByAddress(myAddress), offset, limit);
export const getActivitiesCount = async (myAddress: string) =>
  getCount(createActivityUrlByAddress(myAddress));

export const getCommentActivities = async (
  myAddress: string,
  offset: number,
  limit: number
): Promise<Activity[]> =>
  getActivity(createActivityUrlByAddress(myAddress, 'comments'), offset, limit);
export const getCommentActivitiesCount = async (myAddress: string) =>
  getCount(createActivityUrlByAddress(myAddress, 'comments'));

export const getPostActivities = async (
  myAddress: string,
  offset: number,
  limit: number
): Promise<Activity[]> =>
  getActivity(createActivityUrlByAddress(myAddress, 'posts'), offset, limit);
export const getPostActivitiesCount = async (myAddress: string) =>
  getCount(createActivityUrlByAddress(myAddress, 'posts'));

export const getReactionActivities = async (
  myAddress: string,
  offset: number,
  limit: number
): Promise<Activity[]> =>
  getActivity(
    createActivityUrlByAddress(myAddress, 'reactions'),
    offset,
    limit
  );
export const getReactionActivitiesCount = async (myAddress: string) =>
  getCount(createActivityUrlByAddress(myAddress, 'reactions'));

export const getFollowActivities = async (
  myAddress: string,
  offset: number,
  limit: number
): Promise<Activity[]> =>
  getActivity(createActivityUrlByAddress(myAddress, 'follows'), offset, limit);
export const getFollowActivitiesCount = async (myAddress: string) =>
  getCount(createActivityUrlByAddress(myAddress, 'follows'));

export const getSpaceActivities = async (
  myAddress: string,
  offset: number,
  limit: number
): Promise<Activity[]> =>
  getActivity(createActivityUrlByAddress(myAddress, 'spaces'), offset, limit);
export const getSpaceActivitiesCount = async (myAddress: string) =>
  getCount(createActivityUrlByAddress(myAddress, 'spaces'));
