import React, { FC, useEffect, useState } from 'react'
import styles from './VoteUserListItem.module.sass'
import { AvatarSizes } from 'src/models/common/avatar'
import { Divider, ListItem, ListItemAvatar } from '@mui/material'
import Address from '../address/Address'
import AvatarElement from '../avatar/AvatarElement'
import ButtonFollow from '../button/ButtonFollow'
import Title from '../title/Title'
import { TitleSizes } from 'src/models/common/typography'
import { useSelectProfile } from 'src/rtk/features/profiles/profilesHooks'
import { toShortAddress } from '../../utils/address'
import Link from '../links/link/Link'
import { AccountId } from '@subsocial/api/flat-subsocial/dto'
import { useApi } from '../../api'
import { AnyAccountId } from '@subsocial/types/substrate/interfaces/utils'
import { useMyAddress } from 'src/rtk/features/myAccount/myAccountHooks'

interface VoteUserItemProps {
    id: AccountId,
    onClose?: () => void
}

const VoteUserItem: FC<VoteUserItemProps> = (props) => {
    const [ isCopy, setIsCopy ] = useState(false)
    const profile = useSelectProfile(props.id)
    const {api} = useApi()
    const address = useMyAddress()
    const [ isFollowed, setIsFollowed ] = useState(false)

    useEffect(() => {
        (async () => {
            const isFollower = await api.subsocial.substrate.isAccountFollower(address as AnyAccountId, props.id)
            setIsFollowed(isFollower)
        })()
    }, [])

    if (!props.id) return null

    return (
        <>
            <ListItem
                className={styles.item}
                onMouseEnter={() => setIsCopy(true)}
                onMouseLeave={() => setIsCopy(false)}
            >
                <ListItemAvatar className={styles.avatar}>
                    <AvatarElement src={profile?.content?.avatar}
                                   size={AvatarSizes.SMALL}
                                   id={props.id}/>
                </ListItemAvatar>
                <div className={styles.info}>
                    <Link href={`/accounts/${props.id}`} onClick={props.onClose}>
                        <Title
                            type={TitleSizes.PROFILE}>{profile?.content?.name || toShortAddress(props.id)}</Title>
                    </Link>
                    <Address size={'sm'} label={props.id} isCopy={isCopy} className={styles.address}/>
                </div>
                <ButtonFollow isFollowing={isFollowed}/>
            </ListItem>
            <Divider variant="middle"/>
        </>
    )
}

export default VoteUserItem
