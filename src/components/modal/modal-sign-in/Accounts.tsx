import React, { FC, Fragment } from 'react';
import { Divider, List } from '@mui/material';
import styles from './ModalSignIn.module.sass';
import ModalListUserItem from './ModalListUserItem';
import ModalSignInInfo from './ModalSignInInfo';
import { fetchProfile } from 'src/store/features/profiles/profilesSlice';
import { setMyAddress } from 'src/store/features/myAccount/myAccountSlice';
import { useApi } from '../../api';
import { AccountsModalProps } from 'src/models/account';
import { useAppDispatch } from 'src/store/app/store';

const Accounts: FC<AccountsModalProps> = (props) => {
  const dispatch = useAppDispatch();
  const { api } = useApi();

  const chooseAccount = async (address: string) => {
    await dispatch(fetchProfile({ api, id: address, reload: true }));
    await dispatch(setMyAddress(address));
    props.onClose();
  };

  return (
    <>
      <List className={styles.list}>
        {props.accounts.map((account) => (
          <Fragment key={account.address}>
            <ModalListUserItem {...account} onClick={chooseAccount} />
            <Divider variant="middle" />
          </Fragment>
        ))}
      </List>
      <ModalSignInInfo />
    </>
  );
};

export default Accounts;
