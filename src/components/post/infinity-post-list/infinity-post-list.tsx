import React, { FC, useEffect, useState } from 'react'
import styles from './PostList.module.sass'
import Post from '../post-item/Post'
import InfiniteScroll from 'react-infinite-scroll-component'
import { DEFAULT_PAGE_SIZE } from '../../../config/ListData.config'
import { nonEmptyArr } from '@subsocial/utils'
import { InnerLoadMoreFn } from './post-list'
import Loader from '../../common/loader/Loader'
import EmptyComponent from '../../common/empty/EmptyComponent'

type InfinityPostList = {
    dataSource: string[],
    loadMore: InnerLoadMoreFn,
    totalCount: number,
    isEmpty?: boolean
}

const InfinityList: FC<InfinityPostList> = ({
                                                dataSource,
                                                loadMore,
                                                totalCount,
                                                isEmpty
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

    return <InfiniteScroll
        dataLength={data.length}
        loader={<Loader/>}
        next={() => handleInfiniteOnLoad(page)}
        hasMore={data.length < totalCount}
        className={styles.list}
    >
        {!isEmpty
            ? data.map((id: string) => <Post key={id} postId={id} isShowActions/>)
            : <EmptyComponent text={'No posts yet'}/>}
    </InfiniteScroll>
}

export default InfinityList
