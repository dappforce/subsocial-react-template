import { FC, SyntheticEvent, useCallback, useEffect, useMemo, useState } from 'react'
import ModalReactionsLayout from './ModalReactionsLayout'
import { ModalConnectionsFetchType, ModalConnectionsProps } from 'src/models/modal'
import { useApi } from '../../api'
import { fetchProfiles } from 'src/rtk/features/profiles/profilesSlice'
import { asString } from '@subsocial/utils'
import { FlatSubsocialApi } from '@subsocial/api/flat-subsocial'
import { useAppDispatch } from 'src/rtk/app/store'
import { DEFAULT_FIRST_PAGE, DEFAULT_PAGE_SIZE } from 'src/config/ListData.config'
import { Tab } from 'src/models/common/tabs'
import { PostId } from '@subsocial/api/flat-subsocial/dto'
import { getPageOfIds } from '../../utils/getIds'

const loadSuggestedConnectionsIds = async (api: FlatSubsocialApi, address: unknown, type: ModalConnectionsFetchType) => {
    const method = await api.subsocial.substrate.getPalletQuery('profileFollows')
    const ids = await method[type](address) as unknown as string[]
    return ids.map(asString)
}
const getAccountsIdsByPage = (ids: PostId[], size: number, page: number) => getPageOfIds(ids, { page, size })

const loadMoreAccountsFn = async (loadMoreValues: any & {api: FlatSubsocialApi}) => {
    const {
        size,
        page,
        api,
        dispatch,
        address,
        type
    } = loadMoreValues
    const ids = await loadSuggestedConnectionsIds(api, address, type)
    let accountsIds: string[]

    accountsIds = getAccountsIdsByPage(ids, size, page)

    await dispatch(fetchProfiles({api, ids: accountsIds, reload: false}))

    return accountsIds
}

const ModalConnections: FC<ModalConnectionsProps> = ({
    activeTab,
    accountId,
    countFollowing = 0,
    countFollowers = 0,
    onClose
}) => {
    const [ value, setValue ] = useState<string>(activeTab || 'following')
    const [ data, setData ] = useState<any[]>([])

    const tabs: Tab[] = useMemo(() => ([
            { label: 'Following', tabValue: 'following', count: countFollowing },
            { label: 'Followers', tabValue: 'followers', count: countFollowers },
        ]), [countFollowers, countFollowing])
    const { api } = useApi()
    const dispatch = useAppDispatch()

    const loadMore = useCallback((page, size) => loadMoreAccountsFn({
        size,
        page,
        api,
        dispatch,
        address: accountId,
        type: ModalConnectionsFetchType[value as keyof typeof ModalConnectionsFetchType]
    }), [accountId, api, dispatch, value])

    useEffect(() => {
        loadMore(DEFAULT_FIRST_PAGE, DEFAULT_PAGE_SIZE).then((res) => {
            setData(res)
        })
    }, [loadMore, value])

    const handleChange = (event: SyntheticEvent, newValue: string) => {
        setValue(newValue)
    }

    return (
        <ModalReactionsLayout
            title={`Connections`}
            valueTabs={value}
            handleTabs={handleChange}
            isTabs={true}
            tabs={tabs}
            dataSource={data}
            totalCount={value === 'followers' ? countFollowers : countFollowing}
            loadMore={loadMore}
            onClose={onClose}
        />
    )
}

export default ModalConnections
