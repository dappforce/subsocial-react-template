import { useEffect, useState } from 'react'
import { getSuggestedPostIdsByPage, loadSuggestedPostIds } from '../loadSuggestedPostIdsFromEnv'
import { DEFAULT_FIRST_PAGE, DEFAULT_PAGE_SIZE } from 'src/config/ListData.config'
import InfinityList from './infinity-post-list'
import { fetchPosts } from 'src/rtk/features/posts/postsSlice'
import { useApi } from 'src/components/api'
import { FlatSubsocialApi } from '@subsocial/api/flat-subsocial'
import { useAppDispatch, useAppSelector } from 'src/rtk/app/store'

export type InnerLoadMoreFn<T = string> = (page: number, size: number) => Promise<T[]>

const loadMorePostsFn = async (loadMoreValues: any & {api: FlatSubsocialApi}) => {
    const {
        size,
        page,
        api,
        dispatch,
        myAddress
    } = loadMoreValues

    let postIds: string[]
    const allSuggestedPotsIds = await loadSuggestedPostIds(api)
    postIds = getSuggestedPostIdsByPage(allSuggestedPotsIds, size, page)
    await dispatch(fetchPosts({api, ids: postIds, reload: false, withReactionByAccount: myAddress, visibility: 'onlyVisible' }))

    return postIds
}

const PostList = () => {
    const [ postsData, setPostsData ] = useState<string[]>([])
    const dispatch = useAppDispatch()
    const {api} = useApi()
    const {address: myAddress} = useAppSelector(state => state.myAccount)
    const [ totalCount, setTotalCount ] = useState(0)

    const loadMore: InnerLoadMoreFn = (page, size) => loadMorePostsFn({
        size,
        page,
        api,
        dispatch,
        myAddress
    })

    useEffect(() => {
        if (totalCount) return

        let isMounted = true

        isMounted && loadSuggestedPostIds(api)
            .then(ids => {
                isMounted && setTotalCount(ids.length)
                loadMore(DEFAULT_FIRST_PAGE, DEFAULT_PAGE_SIZE).then(ids => setPostsData(ids))
            })

        return () => {
            isMounted = false
        }

    }, [])

    return <InfinityList dataSource={postsData} loadMore={loadMore} totalCount={totalCount}/>
}

export default PostList
