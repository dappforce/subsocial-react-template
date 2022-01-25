import { AppBar, Button, /*IconButton,*/ Toolbar } from '@mui/material';
// import MenuIcon from '@mui/icons-material/Menu';
import Link from 'next/link';
import { FC, useEffect, useState } from 'react';
import styles from './Header.module.sass';
import { Box } from '@mui/system';
import Title from '../common/title/Title';
import { TextSizes, TitleSizes } from '../../models/common/typography';
import { useRouter } from 'next/router';
import { useAppDispatch, useAppSelector } from 'src/rtk/app/store';
import { toggleAccount } from 'src/rtk/features/mainSlice';
import { HeaderProps } from '../../models/header';
import ButtonComponent from '../common/button/button-component/ButtonComponent';
import ButtonIcon from '../common/button/button-icon/ButtonIcon';
import AvatarElement from '../common/avatar/AvatarElement';
import { AvatarSizes } from '../../models/common/avatar';
import NotificationsNoneIcon from '@mui/icons-material/NotificationsNone';
import { useSelectProfile } from '../../rtk/features/profiles/profilesHooks';
import Balance from '../common/balance/Balance';
import Text from '../common/text/Text';
import { useAuth } from '../auth/AuthContext';
import { useApi } from '../api';
import classNames from 'classnames';

const Header: FC<HeaderProps> = ({ label }) => {
  const dispatch = useAppDispatch();
  const router = useRouter();
  const { address, accounts } = useAppSelector((state) => state.myAccount);
  const profile = useSelectProfile(address);
  const account = accounts?.find((acc) => acc.address === address);
  const { openSingInModal } = useAuth();
  const { api } = useApi();
  const [hasSpace, setHasSpace] = useState(false);

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

  return (
    <AppBar position="fixed" className={styles.bar}>
      <Toolbar className={styles.header}>
        <div className={styles.menu}>
          {/* It may use for mobile layout */}
          {/* <IconButton
                        className={styles.icon}
                        size="large"
                        edge="start"
                        aria-label="menu"
                        color="default"
                    >
                        <MenuIcon/>
                    </IconButton>
          */}

          <Title type={TitleSizes.PREVIEW} className={styles.label}>
            <Link href={'/'}>
              <a>{label}</a>
            </Link>
          </Title>
        </div>

        <Box className={styles.user}>
          {!address || (!profile && !account) ? (
            <ButtonComponent
              variant={'outlined'}
              onClick={() => openSingInModal()}
            >
              Sign in
            </ButtonComponent>
          ) : (
            <>
              <Button
                variant="outlined"
                onClick={() => router.push(hasSpace ? '/posts/new' : '/new')}
                className={classNames([styles.spaceButton], {
                  [styles.postButton]: hasSpace,
                })}
              >
                <span>+</span> {hasSpace ? 'New Post' : 'Create Space'}
              </Button>

              <ButtonIcon
                onClick={() => router.push('/notifications')}
                className={styles.button}
              >
                <NotificationsNoneIcon />
              </ButtonIcon>

              <button
                onClick={() => dispatch(toggleAccount())}
                className={styles.account}
              >
                <AvatarElement
                  src={profile?.content?.avatar}
                  size={AvatarSizes.SMALL}
                  id={address}
                />

                <div>
                  <Text type={TextSizes.SECONDARY} className={styles.name}>
                    {profile?.content?.name || account?.name}
                  </Text>
                  <Balance
                    isIcon={false}
                    address={address}
                    className={styles.balance}
                  />
                </div>
              </button>
            </>
          )}
        </Box>
      </Toolbar>
    </AppBar>
  );
};

export default Header;
