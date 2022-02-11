import { AppBar, Button, /*IconButton,*/ Toolbar } from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import CloseIcon from '@mui/icons-material/Close';
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
import IconButton from '@mui/material/IconButton';
import { useResponsiveSize } from "../responsive/ResponsiveContext";
import Image from "../common/image/Image";
import { useTranslation } from 'react-i18next';

const Header: FC<HeaderProps> = ({ label, isShowingMobileBurger, onMobileBurgerClick }) => {
  const dispatch = useAppDispatch();
  const router = useRouter();
  const { address, accounts } = useAppSelector((state) => state.myAccount);
  const profile = useSelectProfile(address);
  const account = accounts?.find((acc) => acc.address === address);
  const { openSingInModal } = useAuth();
  const { api } = useApi();
  const [hasSpace, setHasSpace] = useState(false);
  const { isDesktop, isMobile } = useResponsiveSize();
  const { t } = useTranslation();

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
    <AppBar position="fixed" className={classNames(styles.bar, { [styles.barWithMenu]: isShowingMobileBurger })}>
      <Toolbar className={styles.header}>
        <div className={styles.menu}>
          {!isDesktop ? (
            <IconButton
              className={styles.icon}
              size="large"
              edge="start"
              onClick={onMobileBurgerClick}
            >
              {isShowingMobileBurger ? <CloseIcon /> : <MenuIcon />}
            </IconButton>
          ) : (
            <Image
              src={'/react_logo.svg'}
              alt={'react logo'}
              width={30}
              height={30}
            />
          )}
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
              {t('buttons.signIn')}
            </ButtonComponent>
          ) : (
            <>
              {isDesktop && <Button
                variant="outlined"
                onClick={() => router.push(hasSpace ? '/posts/new' : '/new')}
                className={classNames([styles.spaceButton], {
                  [styles.postButton]: hasSpace,
                })}
              >
                <span>+</span> {hasSpace ? t('buttons.newPost') : t('buttons.createSpace')}
              </Button>}

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
                  <Text type={TextSizes.SECONDARY} className={classNames(styles.name, { [styles.mobileName]: isMobile })}>
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
