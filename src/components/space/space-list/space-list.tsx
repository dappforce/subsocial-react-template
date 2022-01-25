import { FC, useEffect, useState } from 'react'
import { DEFAULT_FIRST_PAGE, DEFAULT_PAGE_SIZE } from 'src/config/ListData.config'
import { getPageOfIds } from '../../utils/getIds'
import { fetchSpaces } from 'src/rtk/features/spaces/spacesSlice'
import { useApi } from '../../api'
import { useAppDispatch } from 'src/rtk/app/store'
import InfinityListScroll from '../../common/infinity-list/InfinityListScroll'
import { Space } from '../space-item/Space'
import { InnerLoadMoreFn, loadMoreValuesArgs } from 'src/models/infinity-scroll'
import { SpaceIds } from 'src/models/profile'

const loadMoreSpacesFn = async (loadMoreValues: loadMoreValuesArgs) => {
    const {
        size,
        page,
        api,
        dispatch,
        ids,
        withUnlisted
    } = loadMoreValues

    const spaceIds: string[] = getPageOfIds(ids, {page, size})
    await dispatch(fetchSpaces({api, ids: spaceIds, reload: false, withUnlisted: withUnlisted}))

    return spaceIds
}

const SpaceList: FC<SpaceIds> = ({ ids, withUnlisted = false }) => {
    const [ spaceData, setSpaceData ] = useState<string[]>([])
    const dispatch = useAppDispatch()
    const { api } = useApi()
    const [ isEmpty, setIsEmpty ] = useState(false)

    const loadMore: InnerLoadMoreFn = (page, size) => loadMoreSpacesFn({
        size,
        page,
        api,
        dispatch,
        ids,
        withUnlisted
    })

    useEffect(() => {
        let isMounted = true

        isMounted && loadMore(DEFAULT_FIRST_PAGE, DEFAULT_PAGE_SIZE)
            .then(ids => {
                if (!ids.length) {
                    setIsEmpty(true)
                }
                setSpaceData(ids)
            })

        return () => {
            isMounted = false
        }
    }, [])

    return <InfinityListScroll
        dataSource={spaceData}
        loadMore={loadMore}
        totalCount={ids.length}
        emptyText={'No spaces yet'}
        renderItem={(id) => <Space id={id} key={id} withUnlisted={withUnlisted} />}
        isEmpty={isEmpty}
    />
}

export default SpaceList
