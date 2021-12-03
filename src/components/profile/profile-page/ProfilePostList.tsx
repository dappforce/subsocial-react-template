import React, { FC, useEffect, useState } from 'react'
import { useApi } from '../../api'
import { InnerLoadMoreFn } from '../../post/infinity-post-list/post-list'
import { DEFAULT_FIRST_PAGE, DEFAULT_PAGE_SIZE } from '../../../config/ListData.config'
import InfinityList from '../../post/infinity-post-list/infinity-post-list'
import { FlatSubsocialApi } from '@subsocial/api/flat-subsocial'
import { bnsToIds } from '@subsocial/utils'
import { getSuggestedPostIdsByPage } from '../../post/loadSuggestedPostIdsFromEnv'
import { fetchPosts } from 'src/rtk/features/posts/postsSlice'
import { SpaceIds } from 'src/models/profile'
import { AnySpaceId } from '@subsocial/types'
import { SpaceId } from '@subsocial/api/flat-subsocial/dto'
import { useAppDispatch } from 'src/rtk/app/store'
import { AnyAccountId } from '@subsocial/types/substrate/interfaces/utils'
import { useMyAddress } from 'src/rtk/features/myAccount/myAccountHooks'

let suggestedPostIds: string[] | undefined = undefined

export const loadSuggestedPostIds = async (api: FlatSubsocialApi, ids: SpaceId[]) => {

    const suggestedPostIdsPromises = ids.map(spaceId =>
        api.subsocial.substrate.postIdsBySpaceId(spaceId as unknown as AnySpaceId))

    const suggestedPostIdsArray = await Promise.all(suggestedPostIdsPromises)

    suggestedPostIds = bnsToIds(suggestedPostIdsArray.flat().sort((a, b) => b.sub(a).toNumber()))

    return suggestedPostIds
}

const loadMorePostsFn = async (loadMoreValues: any & {subsocial: FlatSubsocialApi}) => {
    const {
        size,
        page,
        subsocial,
        dispatch,
        visibility,
        ids,
    } = loadMoreValues

    let postIds: string[]

    const allSuggestedPotsIds = await loadSuggestedPostIds(subsocial, ids)

    postIds = getSuggestedPostIdsByPage(allSuggestedPotsIds, size, page)

    await dispatch(fetchPosts({api: subsocial, ids: postIds, reload: false, visibility}))

    return postIds
}

const UserPostsList: FC<SpaceIds & {address?: AnyAccountId}> = ({ids, address}) => {
    const {api} = useApi()
    const myAddress = useMyAddress()
    const [ posts, setPosts ] = useState<string[]>([])
    const [ totalCount, setTotalCount ] = useState(0)
    const [isEmpty, setIsEmpty] = useState(false)

    const dispatch = useAppDispatch()

    const loadMore: InnerLoadMoreFn = (page, size) => loadMorePostsFn({
        size,
        page,
        subsocial: api,
        dispatch,
        visibility: address !== myAddress ? 'onlyVisible' : undefined,
        ids
    })

    useEffect(() => {
        loadSuggestedPostIds(api, ids)
            .then(ids => {
                setTotalCount(ids.length)
                if (!ids.length) {
                    setIsEmpty(true)
                }
                loadMore(DEFAULT_FIRST_PAGE, DEFAULT_PAGE_SIZE)
                    .then(ids => {
                        setPosts(ids)
                    })
            })
    }, [])

    return <InfinityList dataSource={posts} loadMore={loadMore} totalCount={totalCount} isEmpty={isEmpty}/>
}

export default UserPostsList
