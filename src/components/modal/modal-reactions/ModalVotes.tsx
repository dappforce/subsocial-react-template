import { FC, SyntheticEvent, useCallback, useEffect, useState } from 'react';
import ModalReactionsLayout from './ModalReactionsLayout';
import { useApi } from '../../api';
import { ModalVotesProps } from 'src/models/modal';
import { Reaction, ReactionId } from '@subsocial/api/types/substrate';
import partition from 'lodash.partition';
import { SubsocialApi } from '@subsocial/api';
import { getPageOfIds } from '../../utils/getIds';
import { fetchProfiles } from 'src/store/features/profiles/profilesSlice';
import { config } from 'src/config'
import { useAppDispatch } from 'src/store/app/store';
import { AccountId, PostId } from '@subsocial/api/types/dto';
import { Tab } from 'src/models/common/tabs';
import { useTranslation } from 'react-i18next';

interface ReactionType {
  account: AccountId;
  kind: 'Upvote' | 'Downvote';
}

const loadSuggestedReactionsIds = async (
  api: SubsocialApi,
  postId: PostId
) => {
  const substrateApi = await api.substrateApi;
  const ids = await substrateApi.query.reactions.reactionIdsByPostId(postId);
  return await api.blockchain.findReactions(
    ids as unknown as ReactionId[]
  );
};

const getReactionsIdsByPage = (ids: Reaction[], size: number, page: number) =>
  getPageOfIds(ids, { page, size });

function isUpvote(reaction: ReactionType): boolean {
  return reaction && (reaction?.kind as unknown as string) === 'Upvote';
}

const loadMoreReactionsFn = async (
  loadMoreValues: any & { api: SubsocialApi }
) => {
  const { size, page, api, dispatch, postId } = loadMoreValues;

  const ids = await loadSuggestedReactionsIds(api, postId);
  let reactionsIds: Reaction[];

  reactionsIds = getReactionsIdsByPage(ids, size, page);

  await dispatch(
    fetchProfiles({
      api,
      ids: reactionsIds.map((item) => item.created.account.toString()),
      reload: false,
    })
  );

  return reactionsIds.map((item) => ({
    account: item.created.account.toString(),
    kind: item.kind.toString(),
  }));
};

const ModalVotes: FC<ModalVotesProps> = ({ postId }) => {
  const [data, setData] = useState<any[]>([]);
  const [upvotes, downvotes] = partition(data, (x) => isUpvote(x));
  const [downvotesCount, setDownvotesCount] = useState(0);
  const [upvotesCount, setUpvotesCount] = useState(0);
  const [value, setValue] = useState('upvotes');
  const { t } = useTranslation();
  const handleChange = (event: SyntheticEvent, newValue: string) => {
    setValue(newValue);
  };
  const dispatch = useAppDispatch();

  const tabs: Tab[] = [
    { label: t('tabs.upvotes'), tabValue: 'upvotes', count: upvotesCount },
    { label: t('tabs.downvotes'), tabValue: 'downvotes', count: downvotesCount },
  ];
  const { api } = useApi();

  const loadMore = useCallback(
    (page, size) =>
      loadMoreReactionsFn({
        size,
        page,
        api,
        dispatch,
        postId,
      }),
    [api, dispatch, postId]
  );

  useEffect(() => {
    loadSuggestedReactionsIds(api, postId).then((ids) => {
      const [upvotes, downvotes] = partition(
        ids.map((item) => ({
          account: item.created.account.toString(),
          kind: item.kind.toString() as 'Upvote' | 'Downvote',
        })),
        (x) => isUpvote(x)
      );

      setDownvotesCount(downvotes.length);
      setUpvotesCount(upvotes.length);
      loadMore(config.infinityScrollFirstPage, config.infinityScrollOffset).then((ids) => {
        setData(ids);
      });
    });
  }, [api, loadMore, postId]);

  const loadMoreNext = useCallback(
    async (page, size) => {
      const data = await loadMoreReactionsFn({
        size,
        page,
        api,
        dispatch,
        postId,
      });

      return data.map((item) => item.account);
    },
    [api, dispatch, postId]
  );

  return (
    <ModalReactionsLayout
      title={`${upvotesCount + downvotesCount} ${t('modals.likes.reactions')}`}
      valueTabs={value}
      handleTabs={handleChange}
      isTabs={true}
      tabs={tabs}
      dataSource={
        value === 'upvotes'
          ? upvotes.map((item) => item?.account)
          : downvotes.map((item) => item?.account)
      }
      loadMore={loadMoreNext}
      totalCount={value === 'upvotes' ? upvotesCount : downvotesCount}
    />
  );
};

export default ModalVotes;
