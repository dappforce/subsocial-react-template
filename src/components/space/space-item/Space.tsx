import React, { FC } from 'react'
import styles from './Space.module.sass'
import { AvatarSizes } from 'src/models/common/avatar'
import { CardContent, CardHeader, Typography } from '@mui/material'
import AvatarElement from '../../common/avatar/AvatarElement'
import Options from '../../common/button/button-options/ButtonOptions'
import ButtonFollowSpace from '../../common/button/button-follow/ButtonFollowSpace'
import Link from '../../common/links/link/Link'
import Title from '../../common/title/Title'
import CardWrapper from '../../common/card-wrapper/CardWrapper'
import TagList from '../../common/tag/TagList'
import { TitleSizes } from 'src/models/common/typography'
import SmallLink from '../../common/links/small-link/SmallLink'
import { useModal } from 'src/hooks/useModal'
import ModalFollow from '../../modal/modal-reactions/modal-follow/ModalFollow'
import Modal from '../../modal/Modal'
import { getUrl, transformCount, TypeUrl } from '../../../utils'
import { SpaceId } from '@subsocial/types/substrate/interfaces'
import { useSelectSpace } from 'src/rtk/features/spaces/spacesHooks'
import { pluralize } from '@subsocial/utils'
import { useApi } from '../../api'
import { useResponsiveSize } from '../../responsive/ResponsiveContext'
import { SpaceWithSomeDetails } from '@subsocial/api/flat-subsocial/dto'
import { useMyAddress } from 'src/rtk/features/myAccount/myAccountHooks'
import SeeMore from '../../common/links/see-more/SeeMore'

export const Space: FC<{id: SpaceId | string}> = (props) => {
    const spaceData = useSelectSpace(props.id as string)

    if (!spaceData) return null

    return <SpaceView spaceData={spaceData}/>
}

const Subheader: FC<{spaceData: SpaceWithSomeDetails}> = (props) => {
    const { isMobile } = useResponsiveSize()
    const { isVisible, toggleModal } = useModal()
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
        {!isMobile
            && <>
                {/* @ts-ignore */}
                <SmallLink href={getUrl({ type: TypeUrl.Space, title: props.spaceData.content?.handle, id: props.spaceData.id })}>
                    {transformCount(+postCount)} {postLabel}
                </SmallLink>
                &nbsp;·&nbsp;
            </>
        }
        <span onClick={toggleModal} className={styles.followers}>
            {transformCount(+followerCount)} {followerLabel}
        </span>
    </>
}

const SpaceView: FC<{spaceData: SpaceWithSomeDetails}> = (props) => {
    const { spaceData } = props

    if (!spaceData?.content) return null

    return (
        <CardWrapper>
            <CardHeader
                className={styles.header}
                avatar={
                    <Link
                        href={getUrl({
                            type: TypeUrl.Space,
                            //@ts-ignore
                            title: spaceData.content.handle,
                            id: spaceData.id,
                        })}
                        image
                    >
                        <AvatarElement
                            src={spaceData.content.image}
                            size={AvatarSizes.SMALL}
                            id={spaceData.id}
                        />
                    </Link>
                }
                action={
                    <>
                        <ButtonFollowSpace space={spaceData.struct} />
                        <Options className={styles.options} withHidden/>
                    </>
                }
                title={
                    <Link
                        href={getUrl({
                            type: TypeUrl.Space,
                            //@ts-ignore
                            title: spaceData.content.handle,
                            id: spaceData.id,
                        })}
                    >
                        <Title type={TitleSizes.PROFILE}>
                            {spaceData.content?.name}
                        </Title>
                    </Link>
                }
                subheader={<Subheader spaceData={spaceData}/>}
            />

            {spaceData.content.summary &&
                <CardContent className={styles.content}>
                    <Typography variant="body2" className={styles.content}>
                        {spaceData.content.summary}
                        {' '}
                        {spaceData.content.isShowMore &&
                        //@ts-ignore
                        <SeeMore href={`${getUrl({ type: TypeUrl.Space, title: spaceData.content.handle, id: spaceData.id })}?isAutoExpand=true`}/>}
                    </Typography>
                </CardContent>
            }

            <TagList tags={spaceData.content.tags} className={styles.tags}/>

        </CardWrapper>
    )
}

export default SpaceView
