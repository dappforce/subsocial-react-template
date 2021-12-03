import React, { FC, useEffect, useState } from 'react'
import styles from './SpaceList.module.sass'
import InfiniteScroll from 'react-infinite-scroll-component'
import { DEFAULT_PAGE_SIZE } from '../../../config/ListData.config'
import { nonEmptyArr } from '@subsocial/utils'
import { InnerLoadMoreFn } from './space-list'
import { Space } from '../space-item/Space'

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


    return (
        <InfiniteScroll
            dataLength={data.length}
            loader={''}
            next={() => handleInfiniteOnLoad(page)}
            hasMore={true}
            className={styles.list}
        >
            {data.map((id: string) => <Space key={id} ids={id}/>)}
        </InfiniteScroll>
    )
}

export default InfinityList
