import type { NextPage } from 'next';
import Layout from '../../layout/Layout';
import ProfileAccount from '../profile-account/ProfileAccount';
import { getInitialPropsWithRedux } from 'src/rtk/app';
import {
  fetchProfile,
  selectProfile,
} from 'src/rtk/features/profiles/profilesSlice';
import React, { FC, useState } from 'react';
import { asString } from '@subsocial/utils';
import {
  ProfileContentProps,
  ProfilePageProps,
  ProfileTabValues,
} from 'src/models/profile';
import SpaceList from '../../space/space-list/space-list';
import { useMyAddress } from 'src/rtk/features/myAccount/myAccountHooks';
import PostList from '../../post/post-list/post-list';

const Content: FC<ProfileContentProps> = ({ ids, activeTab, address }) => {
  const myAddress = useMyAddress();
  const visibilityPosts = address !== myAddress ? 'onlyVisible' : undefined;

  switch (activeTab) {
    case 'userPosts':
      return (
        <PostList
          ids={ids}
          myAddress={myAddress}
          visibility={visibilityPosts}
          withSpace={false}
        />
      );
    case 'userSpaces':
    default:
      return <SpaceList ids={ids} withUnlisted />;
  }
};

const ProfilePage: NextPage<ProfilePageProps> = (props) => {
  const { owner, address, mySpaceIds = [] } = props;
  const [activeTab, setActiveTab] = useState<ProfileTabValues>('userPosts');

  const changeTab = (value: ProfileTabValues) => {
    setActiveTab(value);
  };

  return (
    <Layout>
      <ProfileAccount {...owner} activeTab={activeTab} changeTab={changeTab} />
      <Content ids={mySpaceIds} activeTab={activeTab} address={address} />
    </Layout>
  );
};

getInitialPropsWithRedux(
  ProfilePage,
  async ({ context, subsocial, dispatch, reduxStore }) => {
    const {
      query: { address },
      res,
    } = context;

    const addressStr = address as string;

    await dispatch(
      fetchProfile({ api: subsocial, id: addressStr, reload: true })
    );
    const owner = selectProfile(reduxStore.getState(), addressStr);

    if (!addressStr) return {} as ProfilePageProps;
    const mySpaceIds = await subsocial.subsocial.substrate.spaceIdsByOwner(
      addressStr
    );

    return {
      address: addressStr,
      owner,
      mySpaceIds: mySpaceIds.map(asString).reverse(),
    };
  }
);

export default ProfilePage;
