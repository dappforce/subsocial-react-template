import type { NextPage } from 'next';
import { useEffect } from 'react';
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
import { useTranslation } from 'next-i18next';

const ButtonBar = () => {
  const { value } = useAppSelector((state) => state.main);
  const dispatch = useAppDispatch();
  const router = useRouter();
  const { t } = useTranslation('common');

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
    // {label: 'My feed', tabValue: 'feeds'},
    { label: t('posts'), tabValue: 'posts' },
    { label: t('spaces'), tabValue: 'spaces' },
  ];
  return (
    <Tabs
      className={styles.tabs}
      tabs={tabs}
      value={value}
      setValue={handleChange}
      unselected={router.pathname !== '/'}
    />
  );
};

const Content = () => {
  const { value } = useAppSelector((state) => state.main);

  switch (value) {
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
