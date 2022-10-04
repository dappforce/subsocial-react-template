import { createContext, FC, useContext, useEffect, useState } from 'react';
import { SubsocialApi, ISubsocialApi } from '@subsocial/api';
import useLoader from 'src/hooks/useLoader';
import Snackbar from '../common/snackbar/Snackbar';
import { HttpRequestMethod } from '@subsocial/api/types';
import store from 'store';
import {
  MY_ADDRESS,
  setMyAddress,
} from '../../store/features/myAccount/myAccountSlice';
import { useAppDispatch } from 'src/store/app/store';
import { useSnackbar } from 'src/hooks/useSnackbar';
import { useTranslation } from 'react-i18next';
import { ApiPromise } from '@polkadot/api';
import { config as inputConfig } from 'src/config';

type ContextType = { api: SubsocialApi, substrateApi: ApiPromise };
export const ApiContext = createContext<ContextType>({
  api: {} as SubsocialApi,
  substrateApi: {} as ApiPromise,
});

const config = {
  substrateNodeUrl: inputConfig.substrateNodeUrl,
  offchainUrl: '',
  ipfsNodeUrl: inputConfig.ipfsNodeUrl,
  useServer: {
    httpRequestMethod: 'get' as HttpRequestMethod,
  },
};

export async function initSubsocialApi() {
  console.log('hi', 'here')
  return await SubsocialApi.create(config);
}

export const ApiProvider: FC = (props) => {
  const [api, setApi] = useState<SubsocialApi>({} as SubsocialApi);
  const [substrateApi, setSubstrateApi] = useState<ApiPromise>({} as ApiPromise);
  const { isLoader, toggleLoader } = useLoader();
  const dispatch = useAppDispatch();
  const { type, message, setSnackConfig, removeSnackbar } = useSnackbar();
  const { t } = useTranslation();

  useEffect(() => {
    if (store.get(MY_ADDRESS)) {
      dispatch(setMyAddress(store.get(MY_ADDRESS)));
      setSnackConfig({ message: t('connectingToNetwork') });
    }

    toggleLoader();
    initSubsocialApi().then((res) => {
      console.log(res)
      setApi(res);
      res.subsocial.substrate.api.then((res) => {
        setSubstrateApi(res);
        toggleLoader();
      });
    });
  }, []);

  return !api ? (
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
    <ApiContext.Provider value={{ api, substrateApi }}>{props.children}</ApiContext.Provider>
  );
};

export function useApi() {
  return useContext(ApiContext);
}
