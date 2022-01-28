import { FC, useEffect, useState } from 'react';
import styles from './ProfileAccount.module.sass';
import Options from '../../common/button/button-options/ButtonOptions';
import Tabs from '../../common/tabs/Tabs';
import ButtonComponent from '../../common/button/button-component/ButtonComponent';
import Account from '../../account/Account';
import { ProfileAccountProps } from 'src/models/profile';
import { toShortAddress } from '../../utils/address';
import ButtonFollowAccount from '../../common/button/button-follow/ButtonFollowAccount';
import { useMyAddress } from 'src/rtk/features/myAccount/myAccountHooks';
import { useApi } from 'src/components/api';
import { useIsMyAddress } from 'src/hooks/useIsMySpace';
import { useRouter } from 'next/router';
import classNames from 'classnames';
import { useLocalStorage } from 'src/hooks/useLocalStorage';
import { Tooltip } from '@mui/material';
import ButtonEdit from 'src/components/common/button/button-edit/ButtonEdit';
import { useAuth } from 'src/components/auth/AuthContext';
import { ACCOUNT_STATUS } from 'src/models/auth';

const ProfileAccount: FC<ProfileAccountProps> = (props) => {
  const { content, struct, id } = props;
  const { api } = useApi();
  const router = useRouter();
  const address = useMyAddress();
  const isMy = useIsMyAddress(router.query.address as string);
  const [hasSpace, setHasSpace] = useState(false);
  const [spaceId, setSpaceId] = useLocalStorage<string>('spaceId', '');
  const { status } = useAuth();
  const isAuthRequired = status !== ACCOUNT_STATUS.AUTHORIZED;
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
              Create Space
            </ButtonComponent>
            <Tooltip
              title={hasSpace ? '' : 'Please create your space first'}
              className={styles.tooltip}
              placement="top"
              arrow
            >
              <div>
                <ButtonComponent
                  variant={'contained'}
                  className={styles.button}
                  onClick={() => {
                    setSpaceId(id);
                    router.push('/posts/new');
                  }}
                  disabled={!hasSpace}
                  data-tooltip={'test'}
                >
                  Write post
                </ButtonComponent>
              </div>
            </Tooltip>
          </>
        ) : (
          <>
            <ButtonComponent
              variant={'outlined'}
              className={`${styles.button} ${styles.buttonGrey}`}
              disabled={isAuthRequired}
            >
              Send tips
            </ButtonComponent>
            <ButtonFollowAccount address={id} className={styles.button} />
          </>
        )
      }
      action={
        <>
          {isMy && (
            <ButtonEdit
              onClick={() => router.push(`/accounts/${address}/edit`)}
            />
          )}
          <Options className={styles.option} />
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
