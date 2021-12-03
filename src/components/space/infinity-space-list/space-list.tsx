import { useEffect, useState } from 'react'
import { DEFAULT_FIRST_PAGE, DEFAULT_PAGE_SIZE } from 'src/config/ListData.config'
import { getPageOfIds } from '../../utils/getIds'
import { fetchSpaces } from 'src/rtk/features/spaces/spacesSlice'
import { recommendedSpaceIds } from 'src/config'
import InfinityList from './infinity-space-list'
import { useApi } from '../../api'
import { useAppDispatch } from 'src/rtk/app/store'

export type InnerLoadMoreFn<T = string> = (page: number, size: number) => Promise<T[]>

const loadMoreSpacesFn = async (loadMoreValues: any) => {
    const {
        size,
        page,
        subsocial,
        dispatch,
    } = loadMoreValues

    const spaceIds: string[] = getPageOfIds(recommendedSpaceIds, {page, size})
    await dispatch(fetchSpaces({api: subsocial, ids: spaceIds, reload: false}))

    return spaceIds
}

const SpaceList = () => {
    const [ spaceData, setSpaceData ] = useState<string[]>([])
    const dispatch = useAppDispatch()
    const {api} = useApi()

    const loadMore: InnerLoadMoreFn = (page, size) => loadMoreSpacesFn({
        size,
        page,
        subsocial: api,
        dispatch,
    })

    useEffect(() => {
        loadMore(DEFAULT_FIRST_PAGE, DEFAULT_PAGE_SIZE).then(ids => setSpaceData(ids))
    }, [])

    return <InfinityList dataSource={spaceData} loadMore={loadMore} totalCount={recommendedSpaceIds.length}/>
}

export default SpaceList
