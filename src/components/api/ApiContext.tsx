import { createContext, FC, useContext, useEffect, useState } from 'react';
import { newFlatSubsocialApi } from '@subsocial/api';
import { FlatSubsocialApi } from '@subsocial/api/flat-subsocial';
import useLoader from '../../hooks/useLoader';
import Snackbar from '../common/snackbar/Snackbar';
import { HttpRequestMethod } from '@subsocial/api/types';
import store from 'store';
import {
  MY_ADDRESS,
  setMyAddress,
} from '../../rtk/features/myAccount/myAccountSlice';
import { useAppDispatch } from '../../rtk/app/store';
import { useSnackbar } from 'src/hooks/useSnackbar';

type ContextType = { api: FlatSubsocialApi };
export const ApiContext = createContext<ContextType>({
  api: {} as FlatSubsocialApi,
});

const config = {
  substrateNodeUrl: 'wss://dev-subsocial.codebridge.tech/rpc',
  offchainUrl: 'https://dev-subsocial.codebridge.tech/offchain',
  ipfsNodeUrl: 'https://dev-subsocial.codebridge.tech/ipfs/read',
  useServer: {
    httpRequestMethod: 'get' as HttpRequestMethod,
  },
};

export async function initSubsocialApi() {
  return await newFlatSubsocialApi(config);
}

export const ApiProvider: FC = (props) => {
  const [api, setApi] = useState<FlatSubsocialApi>({} as FlatSubsocialApi);
  const { isLoader, toggleLoader } = useLoader();
  const dispatch = useAppDispatch();
  const { type, message, setSnackConfig, removeSnackbar } = useSnackbar();

  useEffect(() => {
    if (store.get(MY_ADDRESS)) {
      dispatch(setMyAddress(store.get(MY_ADDRESS)));
      setSnackConfig({ message: 'Connecting to the network...' });
    }

    toggleLoader();
    initSubsocialApi().then((res) => {
      setApi(res);
      toggleLoader();
    });
  }, []);

  return !api.subsocial ? (
    <Snackbar
      type={type}
      open={isLoader}
      message={message}
      onClose={() => {
        toggleLoader();
        removeSnackbar();
      }}
    />
  ) : (
    <ApiContext.Provider value={{ api }}>{props.children}</ApiContext.Provider>
  );
};

export function useApi() {
  return useContext(ApiContext);
}
