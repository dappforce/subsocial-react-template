import * as React from 'react';
import { FC, useState } from 'react';
import styles from './SwitchAccount.module.sass';
import AvatarElement from '../common/avatar/AvatarElement';
import { AvatarSizes } from '../../models/common/avatar';
import Title from '../common/title/Title';
import Address from '../common/address/Address';
import Balance from '../common/balance/Balance';
import { List, ListItem, ListItemAvatar } from '@mui/material';
import { TitleSizes } from '../../models/common/typography';
import { useAppDispatch } from '../../rtk/app/store';
import { setMyAddress } from '../../rtk/features/myAccount/myAccountSlice';
import { useSelectProfile } from '../../rtk/features/profiles/profilesHooks';
import { Account, AccountsProps } from '../../models/account';
import { useMyAddress } from '../../rtk/features/myAccount/myAccountHooks';

const SwitchAccountsExtensionItem: FC<Account> = (props) => {
  const [isCopy, setIsCopy] = useState(false);
  const dispatch = useAppDispatch();
  const profile = useSelectProfile(props.address);

  const chooseAccount = async (address: string) => {
    await dispatch(setMyAddress(address));
  };

  return (
    <ListItem
      className={styles.item}
      onMouseEnter={() => setIsCopy(true)}
      onMouseLeave={() => setIsCopy(false)}
      onClick={() => chooseAccount(props.address)}
    >
      <ListItemAvatar>
        <AvatarElement
          src={profile?.content?.avatar}
          size={AvatarSizes.LARGE}
          id={props.address}
        />
      </ListItemAvatar>

      <div className={styles.info}>
        <Title type={TitleSizes.PROFILE} className={styles.name}>
          {profile?.content?.name || props.name}
        </Title>
        <Address
          size={'sm'}
          label={props.address}
          isCopy={isCopy}
          className={styles.address}
        />
      </div>
      <Balance
        address={props.address}
        isIcon={false}
        className={styles.balance}
      />
    </ListItem>
  );
};

const SwitchAccountsExtension: FC<AccountsProps> = ({ accounts = [] }) => {
  const address = useMyAddress();

  return (
    <List className={styles.accounts}>
      {accounts
        .filter((account) => account.address !== address)
        .map((account) => (
          <SwitchAccountsExtensionItem {...account} key={account.address} />
        ))}
    </List>
  );
};

export default SwitchAccountsExtension;
