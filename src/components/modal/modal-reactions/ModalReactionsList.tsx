import React, { FC, useCallback, useEffect, useRef, useState } from 'react'
import { DEFAULT_PAGE_SIZE } from 'src/config/ListData.config'
import Loader from '../../common/loader/Loader'
import VoteUserItem from '../../common/vote-user-item/VoteUserItem'
import styles from './modal-follow/ModalFollow.module.sass'
import { ModalReactionsListProps } from 'src/models/modal'

const ModalReactionsList: FC<ModalReactionsListProps> = ({
                                                             dataSource,
                                                             loadMore,
                                                             totalCount,
                                                             isEmpty,
                                                             onClose
                                                         }) => {
    const [ page, setPage ] = useState(1)
    const [ data, setData ] = useState<string[]>([])
    const [ fetching, setFetching ] = useState(true)
    const ref = useRef<HTMLDivElement>(null)

    const handleInfiniteOnLoad = async () => {
        const newData = page === 1 ? [] : await loadMore(page, DEFAULT_PAGE_SIZE)
        setData((current: any) => [ ...current, ...newData ])
        setPage(page + 1)
    }

    useEffect(() => {
        setData(dataSource)
        return () => setPage(1)
    }, [ dataSource ])

    useEffect(() => {
        if (fetching) {
            handleInfiniteOnLoad().then(() => setFetching(false))
        }
    }, [ fetching ])

    useEffect(() => {
        setFetching(true)
        handleInfiniteOnLoad().then(() => setFetching(false))
    }, [])

    const scrollHandler = useCallback((e: Event) => {
        const target = e.target as Element
        const scrollThreshold = 300

        if ((target.scrollHeight - (target.scrollTop + target.clientHeight) < scrollThreshold)
            && data.length < totalCount) {
            setFetching(true)
        }
    }, [data, totalCount])

    useEffect(() => {
        const currentRef = ref.current

        if (currentRef) {
            currentRef.addEventListener('scroll', scrollHandler)
        }

        return () => {
            if (currentRef) {
                currentRef.removeEventListener('scroll', scrollHandler)
            }
        }
    }, [ref, scrollHandler])

    return <div ref={ref} style={{overflowY: 'auto', height: '60vh'}} className={styles.scroll}>
        {data.map((id: string) => <VoteUserItem id={id} key={id} onClose={onClose}/>)}
        {fetching && <Loader/>}
    </div>

}

export default ModalReactionsList
