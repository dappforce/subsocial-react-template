import { useAppSelector } from 'src/store/app/store';
import { selectProfileContentById } from '../contents/contentsSlice';
import {
  fetchProfiles,
  SelectProfileArgs,
  selectProfileStructById,
} from './profilesSlice';
import { AccountId, SpaceData } from '@subsocial/api/types/dto';
import { useActions } from '../../app/helpers';
import { fetchEntityOfAccountIdsByFollower } from './followedAccountIdsSlice';

export const useSelectProfile = (
  accountId?: AccountId
): SpaceData | undefined => {
  const struct = useAppSelector((state) => {
    return accountId ? selectProfileStructById(state, accountId) : undefined;
  });

  const cid = struct?.contentId;
  const content = useAppSelector((state) =>
    cid ? selectProfileContentById(state, cid) : undefined
  );

  if (!struct || !content) return undefined;

  return {
    id: struct.id,
    struct,
    content,
  };
};

export const useCreateReloadProfile = () => {
  return useActions<SelectProfileArgs>(({ dispatch, api, args: { id } }) =>
    dispatch(fetchProfiles({ api, ids: [id], reload: true }))
  );
};

export const useCreateReloadAccountIdsByFollower = () => {
  return useActions<AccountId>(({ dispatch, args: id, ...props }) => {
    dispatch(fetchEntityOfAccountIdsByFollower({ id, reload: true, ...props }));
  });
};
