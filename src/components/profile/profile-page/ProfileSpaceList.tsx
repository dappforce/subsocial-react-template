import React, { FC, useEffect } from 'react'
import { useApi } from '../../api'
import { fetchSpaces } from 'src/rtk/features/spaces/spacesSlice'
import { Space } from '../../space/space-item/Space'
import { SpaceIds } from 'src/models/profile'
import EmptyComponent from '../../common/empty/EmptyComponent'
import { useAppDispatch } from 'src/rtk/app/store'

const ProfileSpaceList: FC<SpaceIds> = ({ids}) => {
    const dispatch = useAppDispatch()
    const {api} = useApi()
    useEffect(() => {
        dispatch(fetchSpaces({api, ids, reload: false}))
    }, [])

    return (
        <>
            {ids.length > 0
                ? ids.map(id => <Space ids={id} key={id}/>)
                : <EmptyComponent text={'No spaces yet'}/>}
        </>
    )
}
export default ProfileSpaceList
