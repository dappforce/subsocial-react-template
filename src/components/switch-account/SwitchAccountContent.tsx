import React, { FC } from 'react';
import { SwitchAccountContentProps } from '../../models/account';
import { useAppDispatch, useAppSelector } from '../../store/app/store';
import { useSelectProfile } from '../../store/features/profiles/profilesHooks';
import { signOut } from '../../store/features/myAccount/myAccountSlice';
import styles from './SwitchAccount.module.sass';
import AvatarElement from '../common/avatar/AvatarElement';
import { AvatarSizes } from '../../models/common/avatar';
import Title from '../common/title/Title';
import { TitleSizes } from '../../models/common/typography';
import AccountFollowers from './AccountFollowers';
import Address from '../common/address/Address';
import Balance from '../common/balance/Balance';
import SwitchAccountMenu from './SwitchAccountMenu';
import SwitchAccountsExtension from './SwitchAccountsExtension';
import { Divider } from '@mui/material';
import ButtonSignOut from '../common/button/button-sign-out/ButtonSignOut';

const SwitchAccountContent: FC<SwitchAccountContentProps> = (props) => {
  const { address, accounts = [] } = useAppSelector((state) => state.myAccount);
  const profile = useSelectProfile(address);
  const dispatch = useAppDispatch();
  const account = accounts?.find((acc) => acc.address === address);

  if (!address || (!account && !profile)) return null;

  const singOut = () => {
    dispatch(signOut());
    props.onClose();
  };

  return (
    <>
      <div className={styles.account}>
        <div className={styles.header}>
          <AvatarElement
            src={profile?.content?.image}
            size={AvatarSizes.MEDIUM}
            id={address}
          />

          <div>
            <Title type={TitleSizes.PREVIEW} className={styles.title}>
              {profile?.content?.name || account?.name}
            </Title>
            <AccountFollowers
              className={styles.followers}
              following={0} // TODO: add count profile?.struct.followingAccountsCount
              followers={0} // TODO: add count profile?.struct.followersCount
              accountId={address}
            />
          </div>
        </div>

        <Address
          className={styles.address}
          label={address}
          size={'lg'}
          isCopy
          isQr
          isIcon
        />

        <Balance address={address} isIcon className={styles.balance} />
      </div>

      <SwitchAccountMenu onClose={props.onClose} />

      <SwitchAccountsExtension accounts={accounts} />

      <div className={styles.signout}>
        <Divider />

        <ButtonSignOut onClick={singOut} />
      </div>
    </>
  );
};

export default SwitchAccountContent;
