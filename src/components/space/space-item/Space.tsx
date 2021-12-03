import React, { FC, useEffect, useState } from 'react'
import styles from './Space.module.sass'
import { AvatarSizes } from 'src/models/common/avatar'
import { CardContent, CardHeader, Typography } from '@mui/material'
import AvatarElement from '../../common/avatar/AvatarElement'
import Options from '../../common/button/button-options/ButtonOptions'
import ButtonFollow from '../../common/button/ButtonFollow'
import Link from '../../common/links/link/Link'
import Title from '../../common/title/Title'
import CardWrapper from '../../common/card-wrapper/CardWrapper'
import TagList from '../../common/tag/TagList'
import { TitleSizes } from 'src/models/common/typography'
import SmallLink from '../../common/links/small-link/SmallLink'
import { useModal } from 'src/hooks/useModal'
import ModalFollow from '../../modal/modal-reactions/modal-follow/ModalFollow'
import Modal from '../../modal/Modal'
import { getSpaceUrl, transformCount } from '../../../utils'
import { SpaceId } from '@subsocial/types/substrate/interfaces'
import { useSelectSpace } from 'src/rtk/features/spaces/spacesHooks'
import { idToBn, pluralize } from '@subsocial/utils'
import { useApi } from '../../api'
import { AnyAccountId } from '@subsocial/types/substrate/interfaces/utils'
import { useResponsiveSize } from '../../responsive/ResponsiveContext'
import { SpaceWithSomeDetails } from '@subsocial/api/flat-subsocial/dto'
import { useMyAddress } from 'src/rtk/features/myAccount/myAccountHooks'
import SeeMore from '../../common/links/see-more/SeeMore'

export const Space: FC<{ids: SpaceId | string}> = (props) => {
    const spaceData = useSelectSpace(props.ids as string)

    if (!spaceData) return null

    return <SpaceView spaceData={spaceData}/>
}

const Subheader: FC<{spaceData: SpaceWithSomeDetails}> = (props) => {
    const {isMobile} = useResponsiveSize()
    const {isVisible, toggleModal} = useModal()
    const [ postCount, postLabel ] = pluralize(
        props.spaceData.struct.postsCount, 'Post', 'Posts'
    ).split(' ')

    const [ followerCount, followerLabel ] = pluralize(
        props.spaceData.struct.followersCount, 'Follower', 'Followers'
    ).split(' ')

    return <>
        <Modal open={isVisible} onClose={toggleModal}>
            <ModalFollow count={props.spaceData.struct.followersCount} id={props.spaceData.id}/>
        </Modal>
        {/*@ts-ignore*/}
        {!isMobile && <><SmallLink href={`${getSpaceUrl(props.spaceData.content?.handle, props.spaceData.id)}`}>
            {transformCount(+postCount)} {postLabel}
        </SmallLink>&nbsp;·&nbsp;</>}
        <span onClick={toggleModal} className={styles.followers}>
            {transformCount(+followerCount)} {followerLabel}
        </span>
    </>
}

const SpaceView: FC<{spaceData: SpaceWithSomeDetails}> = (props) => {
    const {spaceData} = props
    const address = useMyAddress()
    const {api} = useApi()
    const [ isFollowed, setIsFollowed ] = useState(false)

    useEffect(() => {
         const getFollowers = async () => {
             const isFollower = await api.subsocial.substrate.isSpaceFollower(address as AnyAccountId, idToBn(spaceData?.id))
             if (isMounted) setIsFollowed(isFollower)
         }

        let isMounted = true

        isMounted && getFollowers().catch(err => console.error('Failed load space:', err))

        return () => {
            isMounted = false
        }
    }, [])

    if (!spaceData?.content) return null

    return (
        <CardWrapper>
            <CardHeader
                className={styles.header}
                avatar={
                    <Link href={
                        //@ts-ignore
                        `${getSpaceUrl(spaceData.content.handle, spaceData.id)}`
                    } image>
                        <AvatarElement src={spaceData.content.image}
                                       size={AvatarSizes.SMALL}
                                       id={spaceData.id}/>
                    </Link>}
                action={
                    <>
                        <ButtonFollow isFollowing={isFollowed}/>
                        <Options sx={{ml: 1}} withHidden/>
                    </>
                }
                title={<Link href={
                    //@ts-ignore
                    `${getSpaceUrl(spaceData.content.handle, spaceData.id)}`
                }>
                    <Title type={TitleSizes.PROFILE}>{spaceData.content?.name}</Title>
                </Link>}
                subheader={<Subheader spaceData={spaceData}/>}
            />

            {spaceData.content.summary &&
            <CardContent sx={{pt: 0}}>
                <Typography variant="body2" className={styles.content}>
                    {spaceData.content.summary} {' '}
                    {spaceData.content.isShowMore &&
                    //@ts-ignore
                    <SeeMore href={`${getSpaceUrl(spaceData.content.handle, spaceData.id)}?isAutoExpand=true`}/>}
                </Typography>
            </CardContent>
            }

            <TagList tags={spaceData.content.tags} className={styles.tags}/>

        </CardWrapper>
    )
}

export default SpaceView
