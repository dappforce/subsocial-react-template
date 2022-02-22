import type { NextPage } from 'next';
import { useEffect, useState } from 'react';
import { useAppSelector } from 'src/store/app/store';
import SpaceList from '../space/space-list/space-list';
import PostList from '../post/post-list/post-list';
import styles from './HomePage.module.sass';
import Layout from '../layout/Layout';
import { config } from 'src/config'
import Tabs from '../../components/common/tabs/Tabs';
import { useRouter } from 'next/router';
import { useAppDispatch } from 'src/store/app/store';
import { changeTab } from 'src/store/features/mainSlice';
import { TabProps } from '../../models/common/tabs';
import { useTranslation } from 'react-i18next';
import { useMyAddress } from 'src/store/features/myAccount/myAccountHooks';
import { useApi } from '../api';
import { SpaceId } from '@subsocial/types/dto';
import MyFeed from '../activity/feed/MyFeed';
import { useAuth } from '../auth/AuthContext';
import { ACCOUNT_STATUS } from 'src/models/auth';

export enum ListType {
  feeds = 'feeds',
  posts = 'posts',
}

const ButtonBar = () => {
  const { value } = useAppSelector((state) => state.main);
  const dispatch = useAppDispatch();
  const router = useRouter();
  const { t } = useTranslation();
  const { status } = useAuth();
  const isAuthorized = status === ACCOUNT_STATUS.AUTHORIZED;

  useEffect(() => {
    if (router) {
      if (router.pathname === '/') {
        dispatch(changeTab('posts'));
      }

      if (router.query.tab) {
        dispatch(changeTab(router.query.tab));
      }
    }
  }, [router]);

  const handleChange = (newValue: string) => {
    router.push({ pathname: '/', query: { tab: newValue } });
    dispatch(changeTab(newValue));
  };

  const tabs: TabProps[] = isAuthorized
    ? [
        { label: t('tabs.feed'), tabValue: 'feeds' },
        { label: t('tabs.posts'), tabValue: 'posts' },
        { label: t('tabs.spaces'), tabValue: 'spaces' },
      ]
    : [
        { label: t('tabs.posts'), tabValue: 'posts' },
        { label: t('tabs.spaces'), tabValue: 'spaces' },
      ];

  return (
    <div className={styles.box}>
      <Tabs
        className={styles.tabs}
        tabs={tabs}
        value={value}
        setValue={handleChange}
        unselected={router.pathname !== '/'}
      />
    </div>
  );
};

const Content = () => {
  const { value } = useAppSelector((state) => state.main);
  const address = useMyAddress();
  const { api } = useApi();

  const [followedSpaceIds, setFollowedSpaceIds] = useState<SpaceId[]>([]);

  const getAccountFeedIds = async (address: string) =>
    await api.subsocial.substrate.spaceIdsFollowedByAccount(address);

  useEffect(() => {
    let postIds: string[] = [];

    address &&
      getAccountFeedIds(address).then((ids) => {
        ids.forEach((id) => postIds.push(id.toString()));
        setFollowedSpaceIds(postIds);
      });
  }, [address]);

  switch (value) {
    case 'feeds':
      return (
        <MyFeed
          ids={followedSpaceIds}
          type={ListType.feeds}
          address={address}
        />
      );
    case 'posts':
      return <PostList ids={config.recommendedSpaceIds} visibility={'onlyVisible'} />;
    case 'spaces':
      return <SpaceList ids={config.recommendedSpaceIds} />;
    default:
      return null;
  }
};

const HomePage: NextPage = () => {
  return (
    <Layout className={styles.main}>
      <ButtonBar />
      <div className={styles.content}>
        <Content />
      </div>
    </Layout>
  );
};

export default HomePage;
