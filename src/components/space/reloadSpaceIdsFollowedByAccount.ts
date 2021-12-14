import { Vec } from '@polkadot/types'
import { SubsocialSubstrateApi } from '@subsocial/api'
import { SpaceId as SubstrateSpaceId } from '@subsocial/types/substrate/interfaces'
import { AppDispatch } from 'src/rtk/app/store'
import { upsertFollowedSpaceIdsByAccount } from 'src/rtk/features/spaceIds/followedSpaceIdsSlice'
import { AccountId } from '@subsocial/api/flat-subsocial/dto'
import { bnsToIds } from '@subsocial/utils'

type ReloadSpaceIds = {
  substrate: SubsocialSubstrateApi
  dispatch: AppDispatch
  account: AccountId
}

export const reloadSpaceIdsFollowedByAccount = async (props: ReloadSpaceIds) => {
  const { substrate, dispatch, account } = props

  const readyApi = await substrate.api
  const res = await readyApi.query.spaceFollows.spacesFollowedByAccount(account) as Vec<SubstrateSpaceId>
  const followedSpaceIds = bnsToIds(res)

  dispatch(upsertFollowedSpaceIdsByAccount({
    id: account,
    followedSpaceIds
  }))
}
