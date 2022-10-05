import { NextContextWithRedux } from 'src/store/app';
import { fetchSpace, selectSpace } from 'src/store/features/spaces/spacesSlice';
import { SpaceWithSomeDetails } from '@subsocial/api/types/dto';
import { SpaceId } from '@subsocial/api/types/substrate';

export async function loadSpaceOnNextReq(
  props: NextContextWithRedux,
): Promise<SpaceWithSomeDetails | undefined> {

  const { context, subsocial, dispatch, reduxStore } = props;
  const { query } = context;
  const { spaceId } = query;
  const idOrHandle = spaceId as string;
  if (!idOrHandle) return;

  let id: SpaceId | string | undefined;

  if (idOrHandle[0] === '@') {
    const handle = idOrHandle.slice(1).toLowerCase();
    const domain = await subsocial.findDomain(handle);

    id = domain?.innerSpace
  } else {
    id = idOrHandle;
  }

  if (!id) {
    return;
  }

  const idStr = id.toString();

  await dispatch(fetchSpace({ api: subsocial, id: idStr, reload: true, withUnlisted: true }));
  const spaceData = selectSpace(reduxStore.getState(), { id: idStr });

  if (!spaceData) {
    return;
  }

  return spaceData;
}
