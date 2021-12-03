import Layout from '../../layout/Layout'
import SpaceAccount from '../space-account/SpaceAccount'
import React, { FC, useEffect, useState } from 'react'
import Post from '../../post/post-item/Post'
import { getInitialPropsWithRedux } from 'src/rtk/app'
import { loadSpaceOnNextReq } from './loadSpaceOnNextReq'
import { bnsToIds, idToBn, nonEmptyArr } from '@subsocial/utils'
import { getPageOfIds } from '../../utils/getIds'
import { fetchPosts, selectPosts } from 'src/rtk/features/posts/postsSlice'
import { InnerLoadMoreFn } from '../../post/infinity-post-list/post-list'
import { DEFAULT_PAGE_SIZE } from 'src/config/ListData.config'
import InfiniteScroll from 'react-infinite-scroll-component'
import Loader from '../../common/loader/Loader'
import styles from '../../post/infinity-post-list/PostList.module.sass'
import { useApi } from '../../api'
import { PostId, PostWithSomeDetails, SpaceWithSomeDetails } from '@subsocial/api/flat-subsocial/dto'
import { useAppDispatch } from '../../../rtk/app/store'
import EmptyComponent from '../../common/empty/EmptyComponent'

const PostList: FC<Omit<ViewSpaceProps, 'spaceData'>> = ({posts, postIds}) => {
    const dispatch = useAppDispatch()
    const {api} = useApi()
    const [ totalCount, setTotalCount ] = useState(0)

    useEffect(() => {
        setTotalCount(postIds?.length || 0)
    }, [])

    if (!posts || !postIds) return <EmptyComponent text={'No posts yet'}/>

    const initialPostIds = posts.map((post) => post.id)

    const loadMore: InnerLoadMoreFn<PostId> = async (page, size) => {
        const pageIds = getPageOfIds(postIds, { page, size })
        await dispatch(fetchPosts({ api: api, ids: pageIds}))
        return pageIds
    }

    return <InfinityList dataSource={initialPostIds} loadMore={loadMore} totalCount={totalCount}/>
}

type InfinityPostList = {
    dataSource: string[],
    loadMore: InnerLoadMoreFn,
    totalCount: number
}

const InfinityList: FC<InfinityPostList> = ({
                                                dataSource,
                                                loadMore,
                                                totalCount
                                            }) => {
    const [ page, setPage ] = useState(1)
    const [ data, setData ] = useState(dataSource.length > 0 ? dataSource : [])

    const handleInfiniteOnLoad = async (page: number) => {
        const newData = page === 1 ? [] : await loadMore(page, DEFAULT_PAGE_SIZE)
        setData((current: any) => [ ...current, ...newData ])
        setPage(page + 1)
    }

    const hasInitialData = nonEmptyArr(dataSource)

    useEffect(() => {
        setData(dataSource)
    }, [ dataSource ])

    useEffect(() => {
        if (hasInitialData) return setPage(page + 1)
        handleInfiniteOnLoad(page)
    }, [])

    return  (
        <InfiniteScroll
            dataLength={data.length}
            loader={<Loader />}
            next={() => handleInfiniteOnLoad(page)}
            hasMore={data.length < totalCount}
            className={styles.list}
        >
            {data.map((id: string) => <Post key={id} postId={id}/>)}
        </InfiniteScroll>
    )
}

interface ViewSpaceProps {
    spaceData: SpaceWithSomeDetails
    postIds: PostId[],
    posts: PostWithSomeDetails[]
}

const SpacePage: FC<ViewSpaceProps> = (props) => {
    const {spaceData, postIds, posts} = props

    return (
        <Layout>
            <SpaceAccount {...spaceData}/>
            <PostList postIds={postIds} posts={posts}/>
        </Layout>
    )
}

getInitialPropsWithRedux(SpacePage, async (props) => {
    const {context, subsocial, dispatch, reduxStore} = props
    const {query} = context
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
