import type { NextPage } from 'next';
import { useEffect, useState } from 'react';
import { useAppSelector } from 'src/rtk/app/store';
import SpaceList from '../space/space-list/space-list';
import PostList from '../post/post-list/post-list';
import styles from './HomePage.module.sass';
import Layout from '../layout/Layout';
import { recommendedSpaceIds } from '../../config';
import Tabs from '../../components/common/tabs/Tabs';
import { useRouter } from 'next/router';
import { useAppDispatch } from 'src/rtk/app/store';
import { changeTab } from 'src/rtk/features/mainSlice';
import { TabProps } from '../../models/common/tabs';
import { useTranslation } from 'react-i18next'
import { useMyAddress } from 'src/rtk/features/myAccount/myAccountHooks';
import { useApi } from '../api';
import { SpaceId } from '@subsocial/api/flat-subsocial/dto';
import MyFeed from '../activity/feed/MyFeed';

const ButtonBar = () => {
  const { value } = useAppSelector((state) => state.main);
  const dispatch = useAppDispatch();
  const router = useRouter();
  const { t } = useTranslation();

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

  const tabs: TabProps[] = [
    { label: t('tabs.feed'), tabValue: 'feeds' },
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
      getAccountFeedIds(address).then((ids) =>
        ids.forEach((id) => postIds.push(id.toString()))
      );
    setFollowedSpaceIds(postIds);
  }, [address]);

  switch (value) {
    case 'feeds':
      return <MyFeed ids={followedSpaceIds} />;
    case 'posts':
      return <PostList ids={recommendedSpaceIds} visibility={'onlyVisible'} />;
    case 'spaces':
      return <SpaceList ids={recommendedSpaceIds} />;
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
