import { createContext, FC, useContext, useEffect, useState } from 'react';
import {SubsocialApi, generateCrustAuthToken} from '@subsocial/api';
import Snackbar from '../common/snackbar/Snackbar';
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
  ipfsNodeUrl: inputConfig.ipfsNodeUrl,
};

export async function initSubsocialApi() {
  const api = await SubsocialApi.create(config);
  const authHeader = generateCrustAuthToken('bottom drive obey lake curtain smoke basket hold race lonely fit walk//Alice')
  api.ipfs.setWriteHeaders({
    authorization: 'Basic ' + authHeader
  })

  return api
}

export const ApiProvider: FC = (props) => {
  const [api, setApi] = useState<SubsocialApi>({} as SubsocialApi);
  const [substrateApi, setSubstrateApi] = useState<ApiPromise>({} as ApiPromise);
  const [ isApiReady, setApiReady ] = useState(false);
  const dispatch = useAppDispatch();
  const { type, message, setSnackConfig, removeSnackbar } = useSnackbar();
  const { t } = useTranslation();

  useEffect(() => {
    if (store.get(MY_ADDRESS)) {
      dispatch(setMyAddress(store.get(MY_ADDRESS)));
      setSnackConfig({ message: t('connectingToNetwork') });
    }

    setApiReady(false)
    initSubsocialApi().then((res) => {
      setApi(res);
      res.substrateApi.then((res) => {
        setSubstrateApi(res);
        setApiReady(true)
      });
    });
  }, []);

  if (!isApiReady) {
    return <Snackbar
        type={type}
        open={isApiReady}
        message={message}
        onClose={() => {
          removeSnackbar();
        }}
    />
  }

  return <ApiContext.Provider value={{ api, substrateApi }}>{props.children}</ApiContext.Provider>
};

export function useApi() {
  return useContext(ApiContext);
}
