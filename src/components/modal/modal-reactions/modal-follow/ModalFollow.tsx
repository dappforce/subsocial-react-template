import ModalReactionsLayout from '../ModalReactionsLayout';
import { FC, useCallback, useEffect, useState } from 'react';
import { ModalFollowProps } from 'src/models/modal';
import { transformCount } from 'src/utils';
import { useApi } from '../../../api';
import { asString } from '@subsocial/utils';
import { fetchProfiles } from 'src/rtk/features/profiles/profilesSlice';
import { FlatSubsocialApi } from '@subsocial/api/flat-subsocial';
import { PostId } from '@subsocial/api/flat-subsocial/dto';
import { getPageOfIds } from '../../../utils/getIds';
import {
  DEFAULT_FIRST_PAGE,
  DEFAULT_PAGE_SIZE,
} from 'src/config/ListData.config';
import { useAppDispatch } from 'src/rtk/app/store';
import { InnerLoadMoreFn } from '../../../../models/infinity-scroll';
import { useTranslation } from 'react-i18next';

export const getAccountsIdsByPage = (
  ids: PostId[],
  size: number,
  page: number
) => getPageOfIds(ids, { page, size });

const loadSuggestedAccountIds = async (
  api: FlatSubsocialApi,
  spaceId: unknown
) => {
  const method = await api.subsocial.substrate.getPalletQuery('spaceFollows');
  const ids = (await method.spaceFollowers(spaceId)) as unknown as string[];
  return ids.map(asString);
};

const loadMoreAccountsFn = async (
  loadMoreValues: any & { api: FlatSubsocialApi }
) => {
  const { size, page, api, dispatch, spaceId } = loadMoreValues;
  const ids = await loadSuggestedAccountIds(api, spaceId);
  let accountIds: string[];

  accountIds = getAccountsIdsByPage(ids.map(asString), size, page);

  await dispatch(fetchProfiles({ api, ids: accountIds, reload: false }));

  return accountIds;
};

const ModalFollow: FC<ModalFollowProps> = ({ count = 0, id }) => {
  const [data, setData] = useState<string[]>([]);
  const dispatch = useAppDispatch();
  const { api } = useApi();
  const [totalCount, setTotalCount] = useState(0);
  const { t } = useTranslation();

  const loadMore: InnerLoadMoreFn = useCallback(
    (page, size) =>
      loadMoreAccountsFn({
        size,
        page,
        api,
        dispatch,
        spaceId: id,
      }),
    [api, dispatch, id]
  );

  useEffect(() => {
    loadSuggestedAccountIds(api, id).then((ids) => {
      setTotalCount(ids.length);
      loadMore(DEFAULT_FIRST_PAGE, DEFAULT_PAGE_SIZE).then((ids) =>
        setData(ids)
      );
    });
  }, [api, id, loadMore]);

  return (
    <ModalReactionsLayout
      title={`${transformCount(count) || ''} ${t('plural.follower', { count: count || 0 })}`}
      dataSource={data}
      loadMore={loadMore}
      totalCount={totalCount}
    />
  );
};

export default ModalFollow;
