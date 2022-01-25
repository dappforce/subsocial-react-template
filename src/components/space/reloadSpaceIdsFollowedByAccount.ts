import { SubsocialSubstrateApi } from '@subsocial/api'
import { AppDispatch } from 'src/rtk/app/store'
import { upsertFollowedSpaceIdsByAccount } from 'src/rtk/features/spaceIds/followedSpaceIdsSlice'
import { AccountId } from '@subsocial/api/flat-subsocial/dto'
import { bnsToIds } from '@subsocial/utils'
import BN from 'bn.js'

type ReloadSpaceIds = {
  substrate: SubsocialSubstrateApi
  dispatch: AppDispatch
  account: AccountId
}

export const reloadSpaceIdsFollowedByAccount = async (props: ReloadSpaceIds) => {
  const { substrate, dispatch, account } = props

  const readyApi = await substrate.api
  const res = await readyApi.query.spaceFollows.spacesFollowedByAccount(account)
  const followedSpaceIds = bnsToIds(res as unknown as BN[])

  dispatch(upsertFollowedSpaceIdsByAccount({
    id: account,
    followedSpaceIds
  }))
}
