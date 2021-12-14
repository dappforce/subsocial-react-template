import { fetchSpaces, SelectSpaceArgs, selectSpaceStructById } from './spacesSlice'
import { useAppSelector } from '../../app/store'
import { selectSpaceContentById } from '../contents/contentsSlice'
import { SpaceId, SpaceWithSomeDetails } from '@subsocial/api/flat-subsocial/dto'
import { useActions } from '../../app/helpers'

export const useSelectSpace = (spaceId?: SpaceId): SpaceWithSomeDetails | undefined => {
  const struct = useAppSelector(state => spaceId
    ? selectSpaceStructById(state, spaceId)
    : undefined
  )

  const cid = struct?.contentId
  const content = useAppSelector(state => cid
    ? selectSpaceContentById(state, cid)
    : undefined
  )

  if (!struct) return undefined

  return {
    id: struct.id,
    struct,
    content
  }
}

export const useCreateReloadSpace = () => {
  return useActions<SelectSpaceArgs>(({ dispatch, api, args: { id } }) => {
    const args = { api, ids: [ id ], reload: true }
    dispatch(fetchSpaces(args))
  })
}
