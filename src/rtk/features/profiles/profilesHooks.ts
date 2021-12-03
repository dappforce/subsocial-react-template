import { useAppSelector } from 'src/rtk/app/store'
import { selectProfileContentById } from '../contents/contentsSlice'
import { selectProfileStructById } from './profilesSlice'
import { AccountId, ProfileData } from '@subsocial/api/flat-subsocial/dto'

export const useSelectProfile = (accountId?: AccountId): ProfileData | undefined => {
  const struct = useAppSelector(state => {
    return accountId
            ? selectProfileStructById(state, accountId)
            : undefined
      }
  )

  const cid = struct?.contentId
  const content = useAppSelector(state => cid
    ? selectProfileContentById(state, cid)
    : undefined
  )

  if (!struct || !content) return undefined

  return {
    id: struct.id,
    struct,
    content
  }
}
