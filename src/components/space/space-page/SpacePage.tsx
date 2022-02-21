import Layout from '../../layout/Layout'
import SpaceAccount from '../space-account/SpaceAccount'
import React, { FC, useEffect, useState } from 'react'
import Post from '../../post/post-item/Post'
import { getInitialPropsWithRedux } from 'src/store/app'
import { loadSpaceOnNextReq } from './loadSpaceOnNextReq'
import { bnsToIds, idToBn } from '@subsocial/utils'
import { getPageOfIds } from '../../utils/getIds'
import { fetchPosts, selectPosts } from 'src/store/features/posts/postsSlice'
import { useApi } from '../../api'
import { PostId, PostWithSomeDetails, SpaceWithSomeDetails } from '@subsocial/types/dto'
import { useAppDispatch } from '../../../store/app/store'
import EmptyComponent from '../../common/empty/EmptyComponent'
import InfinityListScroll from '../../common/infinity-list/InfinityListScroll'
import { InnerLoadMoreFn } from '../../../models/infinity-scroll'
import { useTranslation } from 'react-i18next';

const PostList: FC<Omit<ViewSpaceProps, 'spaceData'>> = ({posts, postIds}) => {
    const dispatch = useAppDispatch()
    const { api } = useApi()
    const [ totalCount, setTotalCount ] = useState(0)
    const { t } = useTranslation();

    useEffect(() => {
        setTotalCount(postIds?.length || 0)
    }, [])

    if (!posts || !postIds) return <EmptyComponent text={t('content.noPosts')}/>

    const initialPostIds = posts.map((post) => post.id)

    const loadMore: InnerLoadMoreFn<PostId> = async (page, size) => {
        const pageIds = getPageOfIds(postIds, { page, size })
        await dispatch(fetchPosts({ api: api, ids: pageIds }))
        return pageIds
    }

    return <InfinityListScroll
        dataSource={initialPostIds}
        loadMore={loadMore}
        totalCount={totalCount}
        emptyText={t('content.noPosts')}
        renderItem={(id) => <Post postId={id} key={id} />}
    />
}

interface ViewSpaceProps {
    spaceData: SpaceWithSomeDetails
    postIds: PostId[],
    posts: PostWithSomeDetails[]
}

const SpacePage: FC<ViewSpaceProps> = (props) => {
    const { spaceData, postIds, posts } = props

    return (
        <Layout>
            <SpaceAccount {...spaceData}/>
            <PostList postIds={postIds} posts={posts}/>
        </Layout>
    )
}

getInitialPropsWithRedux(SpacePage, async (props) => {
    const { context, subsocial, dispatch, reduxStore } = props
    const { query } = context
    const spaceData = await loadSpaceOnNextReq(props)
    const spaceId = idToBn(spaceData.id)

    const postIds = (await subsocial.subsocial.substrate.postIdsBySpaceId(spaceId)).reverse()

    const pageIds = bnsToIds(getPageOfIds(postIds, query))
    await dispatch(fetchPosts({ api: subsocial, ids: pageIds, reload: true }))
    const posts = selectPosts(reduxStore.getState(), { ids: pageIds })

    return {
        spaceData,
        posts,
        postIds: bnsToIds(postIds),
    }
})

export default SpacePage
