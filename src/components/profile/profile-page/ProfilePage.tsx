import type { NextPage } from 'next'
import styles from './ProfilePage.module.sass'
import Layout from '../../layout/Layout'
import ProfileAccount from '../profile-account/ProfileAccount'
import { getInitialPropsWithRedux } from 'src/rtk/app'
import { fetchProfile, selectProfile } from 'src/rtk/features/profiles/profilesSlice'
import React, { FC, useState } from 'react'
import { asString } from '@subsocial/utils'
import UserPostsList from './ProfilePostList'
import ProfileSpaceList from './ProfileSpaceList'
import { ProfileContentProps, ProfilePageProps, ProfileTabValues } from 'src/models/profile'

const Content: FC<ProfileContentProps> = ({ids, activeTab, address}) => {
    switch (activeTab) {
        case 'userPosts':
            return <UserPostsList ids={ids} address={address}/>
        case 'userSpaces':
        default:
            return <ProfileSpaceList ids={ids}/>
    }
}

const ProfilePage: NextPage<ProfilePageProps> = (props) => {
    const {owner, address, mySpaceIds = []} = props
    const [activeTab, setActiveTab] = useState<ProfileTabValues>('userPosts')

    const changeTab = (value: ProfileTabValues) => {
        setActiveTab(value)
    }

    return (
        <Layout className={styles.layout}>
            <ProfileAccount {...owner} activeTab={activeTab} changeTab={changeTab}/>
            <Content ids={mySpaceIds} activeTab={activeTab} address={address}/>
        </Layout>
    )
}

getInitialPropsWithRedux(ProfilePage, async ({context, subsocial, dispatch, reduxStore}) => {
    const {query: {address}, res} = context

    const addressStr = address as string

    await dispatch(fetchProfile({api: subsocial, id: addressStr, reload: true}))
    const owner = selectProfile(reduxStore.getState(), addressStr)

    if (!addressStr) return {} as ProfilePageProps
    const mySpaceIds = await subsocial.subsocial.substrate.spaceIdsByOwner(addressStr)

    return {
        address: addressStr,
        owner,
        mySpaceIds: mySpaceIds.map(asString).reverse()
    }
})

export default ProfilePage
