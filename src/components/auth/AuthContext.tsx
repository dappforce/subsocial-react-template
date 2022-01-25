import { createContext, FC, useContext, useEffect, useState } from 'react';
import { asAccountId } from '@subsocial/api';
import { fetchProfiles } from '../../rtk/features/profiles/profilesSlice';
import {
  MY_ADDRESS,
  setAccounts,
  setSigner,
} from '../../rtk/features/myAccount/myAccountSlice';
import { ACCOUNT_STATUS } from '../../models/auth';
import { useModal } from '../../hooks/useModal';
import { useApi } from '../api';
import { useAppDispatch, useAppSelector } from '../../rtk/app/store';
import ModalSignIn from '../modal/modal-sign-in/ModalSignIn';
import { reloadSpaceIdsFollowedByAccount } from '../space/reloadSpaceIdsFollowedByAccount';
import { useCreateReloadAccountIdsByFollower } from '../../rtk/features/profiles/profilesHooks';
import store from 'store';

type ContextType = {
  openSingInModal: (isAlert?: boolean) => void;
  status: ACCOUNT_STATUS;
  hasToken: boolean;
};

export const AuthContext = createContext<ContextType>({
  openSingInModal: () => {},
  status: ACCOUNT_STATUS.INIT,
  hasToken: false,
});

export const AuthProvider: FC = (props) => {
  const [status, setStatus] = useState(ACCOUNT_STATUS.INIT);
  const [isAlert, setIsAlert] = useState(false);
  const [hasToken, setHasToken] = useState(false);
  const { isVisible, toggleModal } = useModal();
  const { api } = useApi();
  const { address, accounts } = useAppSelector((state) => state.myAccount);
  const dispatch = useAppDispatch();
  const reloadAccountIdsByFollower = useCreateReloadAccountIdsByFollower();

  useEffect(() => {
    (async () => {
      const { isWeb3Injected, web3Enable, web3Accounts } = await import(
        '@polkadot/extension-dapp'
      );

      if (!isWeb3Injected) {
        setStatus(ACCOUNT_STATUS.EXTENSION_NOT_FOUND);
      }

      if (isWeb3Injected) {
        const injectedExtensions = await web3Enable('Subsocial');

        const polkadotJs = injectedExtensions.find(
          (extension) => extension.name === 'polkadot-js'
        );

        if (!polkadotJs) {
          setStatus(ACCOUNT_STATUS.EXTENSION_NOT_FOUND);
          store.remove(MY_ADDRESS);
          return;
        }

        dispatch(setSigner(polkadotJs.signer));

        unsub = polkadotJs.accounts.subscribe(async (accounts) => {
          if (!accounts.length) {
            store.remove(MY_ADDRESS);
            return setStatus(ACCOUNT_STATUS.ACCOUNTS_NOT_FOUND);
          }

          const addresses = accounts.map((account) => {
            return {
              address: asAccountId(account.address)?.toString() as string,
              name: account.name as string,
            };
          });
          await dispatch(
            fetchProfiles({
              api,
              ids: addresses.map((address) => address.address),
              reload: true,
            })
          );
          dispatch(setAccounts(addresses));
        });
      }
    })();

    let unsub: (() => void) | undefined;

    return () => {
      unsub && unsub();
    };
  }, [api, dispatch]);

  useEffect(() => {
    if (accounts?.length && !address) {
      setStatus(ACCOUNT_STATUS.UNAUTHORIZED);
    }

    (async () => {
      if (!address) {
        setStatus(ACCOUNT_STATUS.UNAUTHORIZED);
        return;
      }

      if (address) {
        setStatus(ACCOUNT_STATUS.AUTHORIZED);
        await reloadSpaceIdsFollowedByAccount({
          substrate: api.subsocial.substrate,
          dispatch: dispatch,
          account: address,
        });

        await reloadAccountIdsByFollower(address);
      }
    })();

    let unsubBalance: (() => void) | undefined;

    const subBalance = async () => {
      if (!address) return;

      const substrateApi = await api.subsocial.substrate.api;

      unsubBalance = await substrateApi.derive.balances.all(
        address,
        ({ freeBalance }) => {
          const isEmptyBalance = freeBalance.eqn(0);

          if (isEmptyBalance) {
            setHasToken(false);
          } else {
            setHasToken(true);
          }
        }
      );
    };

    subBalance();

    return () => {
      unsubBalance && unsubBalance();
    };
  }, [accounts, address]);

  useEffect(() => {
    !isVisible && setIsAlert(false);
  }, [isVisible]);

  const openSingInModal = (isAlert?: boolean) => {
    if (isAlert) {
      setIsAlert(true);
    }

    toggleModal();
  };

  const value = {
    openSingInModal,
    status,
    hasToken,
  };

  return (
    <AuthContext.Provider value={value}>
      <ModalSignIn
        onClose={openSingInModal}
        open={isVisible}
        status={status}
        isAlert={isAlert}
      />
      {props.children}
    </AuthContext.Provider>
  );
};

export function useAuth() {
  return useContext(AuthContext);
}
