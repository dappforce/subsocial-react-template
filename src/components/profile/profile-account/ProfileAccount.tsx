import { FC, useEffect, useState } from 'react';
import styles from './ProfileAccount.module.sass';
import Options from '../../common/button/button-options/ButtonOptions';
import Tabs from '../../common/tabs/Tabs';
import ButtonComponent from '../../common/button/button-component/ButtonComponent';
import Account from '../../account/Account';
import { ProfileAccountProps } from 'src/models/profile';
import { toShortAddress } from '../../utils/address';
import ButtonFollowAccount from '../../common/button/button-follow/ButtonFollowAccount';
import { useMyAddress } from 'src/store/features/myAccount/myAccountHooks';
import { useApi } from 'src/components/api';
import { useIsMyAddress } from 'src/hooks/useIsMySpace';
import { useRouter } from 'next/router';
import classNames from 'classnames';
import { useLocalStorage } from 'src/hooks/useLocalStorage';
import { Tooltip } from '@mui/material';
import ButtonEdit from 'src/components/common/button/button-edit/ButtonEdit';
import { useAuth } from 'src/components/auth/AuthContext';
import { ACCOUNT_STATUS } from 'src/models/auth';
import ModalSendTips from "../../modal/modal-send-tips/ModalSendTips";
import { useModal } from "../../../hooks/useModal";
import { useTranslation } from 'react-i18next';
import { useResponsiveSize } from "../../responsive/ResponsiveContext";
import { TypeContent } from "../../../models/common/button";
import ButtonSendTips from '../../common/button/button-send-tips/ButtonSendTips';
import ButtonWritePost from '../../common/button/button-wtire-post/ButtonWritePost';
import { config } from 'src/config';

const ProfileAccount: FC<ProfileAccountProps> = (props) => {
  const { content, struct, id } = props;
  const { api } = useApi();
  const router = useRouter();
  const address = useMyAddress();
  const isMy = useIsMyAddress(router.query.address as string);
  const [hasSpace, setHasSpace] = useState(false);
  const [spaceId, setSpaceId] = useLocalStorage<string>('spaceId', '');
  const { status } = useAuth();
  const { t } = useTranslation();
  const isAuthRequired = status !== ACCOUNT_STATUS.AUTHORIZED;
  const { isVisible, toggleModal} = useModal();
  const { isDesktop } = useResponsiveSize()

  const onClickEdit = () => {
    router.push(`/accounts/${address}/edit`)
  }

  const tabs = [
    { label: 'Posts', tabValue: 'userPosts' },
    { label: 'Spaces', tabValue: 'userSpaces' },
  ];

  useEffect(() => {
    (async () => {
      if (!address) return null;
      await api.subsocial.substrate.spaceIdsByOwner(address).then((data) => {
        if (data.length) {
          setHasSpace(true);
        } else {
          setHasSpace(false);
        }
      });
    })();
  }, [address, api]);

  if (!struct || !id) return null;

  return (
    <Account
      name={content?.name || toShortAddress(id)}
      avatar={content?.avatar}
      id={id as string}
      followersCount={struct.followersCount}
      followingCount={struct.followingAccountsCount}
      buttons={
        isMy ? (
          <>
            <ButtonComponent
              variant={'outlined'}
              className={classNames(styles.button, {
                [styles.buttonGrey]: hasSpace,
              })}
              onClick={() => {
                router.push('/new');
              }}
            >
              {t('buttons.createSpace')}
            </ButtonComponent>
            <Tooltip
              title={hasSpace ? '' : `${t('generalMessages.createSpaceFirst')}`}
              className={styles.tooltip}
              placement="top"
              arrow
            >
              <div>
                <ButtonWritePost
                  onClick={() => setSpaceId(id)}
                  disabled={!hasSpace}
                  className={styles.button}
                />
              </div>
            </Tooltip>
          </>
        ) : (
          <>
            <ModalSendTips open={isVisible} toggleModal={toggleModal} ownerId={id}/>

            <ButtonSendTips
              onClick={toggleModal}
              className={styles.button}
              disabled={config.enableTips && isAuthRequired}
            />
            <ButtonFollowAccount address={id} className={styles.button} />
          </>
        )
      }
      action={
        <>
          {isMy && isDesktop && (
            <ButtonEdit
              onClick={() => router.push(`/accounts/${address}/edit`)}
            />
          )}
          <Options
            className={styles.option}
            onClickEdit={isDesktop ? undefined : onClickEdit}
            typeContent={TypeContent.Profile}
          />
        </>
      }
      about={content?.about}
      summary={content?.summary}
      //@ts-ignore
      links={content?.links}
      isShowMore={content?.isShowMore}
      tabs={
        <Tabs
          className={styles.tabs}
          tabs={tabs}
          value={props.activeTab}
          setValue={props.changeTab}
        />
      }
      withBalance
    />
  );
};

export default ProfileAccount;
