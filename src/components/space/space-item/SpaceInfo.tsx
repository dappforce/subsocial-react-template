import React, { FC } from 'react';
import { CardHeader } from '@mui/material';
import Link from '../../common/links/link/Link';
import styles from './Space.module.sass';
import { getUrl, transformCount, TypeUrl } from '../../../utils';
import AvatarElement from '../../common/avatar/AvatarElement';
import ButtonFollowSpace from '../../common/button/button-follow/ButtonFollowSpace';
import Title from '../../common/title/Title';
import { SpaceWithSomeDetails } from '@subsocial/types/dto';
import { useResponsiveSize } from '../../responsive/ResponsiveContext';
import { useModal } from 'src/hooks/useModal';
import { useTranslation } from 'react-i18next';
import Modal from '../../modal/Modal';
import ModalFollow from '../../modal/modal-reactions/modal-follow/ModalFollow';
import SmallLink from '../../common/links/small-link/SmallLink';
import { toEdit } from '../toEdit';
import { TypeContent } from 'src/models/common/button';
import { TitleSizes } from 'src/models/common/typography';
import { AvatarSizes } from 'src/models/common/avatar';
import Options from '../../common/button/button-options/ButtonOptions';

const Subheader: FC<{ spaceData: SpaceWithSomeDetails }> = (props) => {
  const { isMobile } = useResponsiveSize();
  const { isVisible, toggleModal } = useModal();
  const { t } = useTranslation();

  return (
    <>
      <Modal open={isVisible} onClose={toggleModal}>
        <ModalFollow
          count={props.spaceData.struct.followersCount}
          id={props.spaceData.id}
        />
      </Modal>
      {!isMobile && (
        <>
          <SmallLink
            className={styles.followers}
            href={getUrl({
              type: TypeUrl.Space,
              //@ts-ignore
              title: props.spaceData.content?.handle,
              id: props.spaceData.id,
            })}
          >
            {transformCount(props.spaceData.struct.postsCount)}{' '}
            {t('plural.post', {
              count: props.spaceData.struct.postsCount || 0,
            })}
          </SmallLink>
          &nbsp;·&nbsp;
        </>
      )}
      <span onClick={toggleModal} className={styles.followers}>
        {transformCount(props.spaceData.struct.followersCount)}{' '}
        {t('plural.follower', {
          count: props.spaceData.struct.followersCount || 0,
        })}
      </span>
    </>
  );
};

const SpaceInfo: FC<{ spaceData: SpaceWithSomeDetails }> = ({ spaceData }) => {
  return (
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
            src={spaceData.content?.image}
            size={AvatarSizes.MEDIUM}
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
          <Title type={TitleSizes.PROFILE}>{spaceData.content?.name}</Title>
        </Link>
      }
      subheader={<Subheader spaceData={spaceData} />}
    />
  );
};

export default SpaceInfo;
