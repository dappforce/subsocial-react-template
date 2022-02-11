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
import { useResponsiveSize } from '../../responsive/ResponsiveContext'
import { SpaceWithSomeDetails } from '@subsocial/api/flat-subsocial/dto'
import SeeMore from '../../common/links/see-more/SeeMore'
import { TypeContent } from 'src/models/common/button'
import HiddenComponent from 'src/components/common/hidden-component/HiddenComponent'
import { toEdit } from '../toEdit'
import { useTranslation } from 'react-i18next';

export const Space: FC<{id: SpaceId | string, withUnlisted?: boolean }> = (props) => {
    const { id, withUnlisted } = props
    const spaceData = useSelectSpace(id as string)

    if (!spaceData) return null

    return <SpaceView spaceData={spaceData} withUnlisted={withUnlisted} />
}

const Subheader: FC<{spaceData: SpaceWithSomeDetails}> = (props) => {
  const { isMobile } = useResponsiveSize();
  const { isVisible, toggleModal } = useModal();
  const { t } = useTranslation();

  return <>
    <Modal open={isVisible} onClose={toggleModal}>
      <ModalFollow count={props.spaceData.struct.followersCount} id={props.spaceData.id}/>
    </Modal>
    {!isMobile
      && <>
        {/* @ts-ignore */}
        <SmallLink href={getUrl({ type: TypeUrl.Space, title: props.spaceData.content?.handle, id: props.spaceData.id })}>
          {transformCount(props.spaceData.struct.postsCount)}
          {' '}
          {t('plural.post', { count: props.spaceData.struct.postsCount || 0 })}
        </SmallLink>
        &nbsp;·&nbsp;
      </>
    }
    <span onClick={toggleModal} className={styles.followers}>
      {transformCount(props.spaceData.struct.followersCount)}
      {' '}
      {t('plural.follower', { count: props.spaceData.struct.followersCount || 0 })}
    </span>
  </>
}

const SpaceView: FC<{spaceData: SpaceWithSomeDetails, withUnlisted?: boolean }> = (props) => {
  const { spaceData, withUnlisted } = props

  if (!spaceData?.content || (!withUnlisted && spaceData.struct.hidden)) return null

  return (
    <CardWrapper>
      {spaceData.struct.hidden&& <HiddenComponent data={spaceData} typeContent={TypeContent.Space} />}
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
              size={AvatarSizes.LARGE}
              id={spaceData.id}
            />
          </Link>
        }
        action={
          <>
            <ButtonFollowSpace space={spaceData.struct} />
            <Options
              className={styles.options}
              contentStruct={spaceData?.struct}
              typeContent={TypeContent.Space}
              withHidden
              onClickEdit={() => toEdit(spaceData.id)}
            />
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
