import {
  FC,
  SyntheticEvent,
  useCallback,
  useEffect,
  useMemo,
  useState,
} from 'react';
import ModalReactionsLayout from './ModalReactionsLayout';
import {
  ModalConnectionsFetchType,
  ModalConnectionsProps,
} from 'src/models/modal';
import { useApi } from '../../api';
import { fetchProfiles } from 'src/store/features/profiles/profilesSlice';
import { asString } from '@subsocial/utils';
import { SubsocialApi } from '@subsocial/api';
import { useAppDispatch } from 'src/store/app/store';
import { config } from 'src/config'
import { Tab } from 'src/models/common/tabs';
import { PostId } from '@subsocial/api/types/dto';
import { getPageOfIds } from '../../utils/getIds';
import { useTranslation } from 'react-i18next';

const loadSuggestedConnectionsIds = async (
  api: SubsocialApi,
  address: string,
  type: ModalConnectionsFetchType
) => {
  const substrateApi = await api.substrateApi
  const ids = (await substrateApi.query.accountFollows[type](address)) as unknown as string[];
  return ids.map(asString);
};
const getAccountsIdsByPage = (ids: PostId[], size: number, page: number) =>
  getPageOfIds(ids, { page, size });

const loadMoreAccountsFn = async (
  loadMoreValues: any & { api: SubsocialApi }
) => {
  const { size, page, api, dispatch, address, type } = loadMoreValues;
  const ids = await loadSuggestedConnectionsIds(api, address, type);
  let accountsIds: string[];

  accountsIds = getAccountsIdsByPage(ids, size, page);

  await dispatch(fetchProfiles({ api, ids: accountsIds, reload: false }));

  return accountsIds;
};

const ModalConnections: FC<ModalConnectionsProps> = ({
  activeTab,
  accountId,
  countFollowing = 0,
  countFollowers = 0,
  onClose,
}) => {
  const { t } =useTranslation();
  const [value, setValue] = useState<string>(activeTab || 'following');
  const [data, setData] = useState<any[]>([]);

  const tabs: Tab[] = useMemo(
    () => [
      { label: t('tabs.following'), tabValue: 'following', count: countFollowing },
      { label: t('tabs.followers'), tabValue: 'followers', count: countFollowers },
    ],
    [countFollowers, countFollowing, t]
  );
  const { api } = useApi();
  const dispatch = useAppDispatch();

  const loadMore = useCallback(
    (page, size) =>
      loadMoreAccountsFn({
        size,
        page,
        api,
        dispatch,
        address: accountId,
        type: ModalConnectionsFetchType[
          value as keyof typeof ModalConnectionsFetchType
        ],
      }),
    [accountId, api, dispatch, value]
  );

  useEffect(() => {
    loadMore(config.infinityScrollFirstPage, config.infinityScrollOffset).then((res) => {
      setData(res);
    });
  }, [loadMore, value]);

  const handleChange = (event: SyntheticEvent, newValue: string) => {
    setValue(newValue);
  };

  return (
    <ModalReactionsLayout
      title={t('modals.connections.connections')}
      valueTabs={value}
      handleTabs={handleChange}
      isTabs={true}
      tabs={tabs}
      dataSource={data}
      totalCount={value === 'followers' ? countFollowers : countFollowing}
      loadMore={loadMore}
      onClose={onClose}
    />
  );
};

export default ModalConnections;
