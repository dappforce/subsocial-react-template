import { SubsocialApi, SubsocialIpfsApi, SubsocialSubstrateApi } from '@subsocial/api'
import { FlatSubsocialApi, useSubstrateContext } from '../../components/activity/feed/flatApi'
import { BalanceOf } from '@polkadot/types/interfaces'

export type SubsocialConsts = {
  handleDeposit: BalanceOf
}

export type SubsocialApiState = {
  flatApi: FlatSubsocialApi
  subsocial: SubsocialApi
  substrate: SubsocialSubstrateApi,
  consts: SubsocialConsts,
  ipfs: SubsocialIpfsApi
  isApiReady: boolean
}

export function useSubsocialApi (): SubsocialApiState {
  return useSubstrateContext().subsocialApis
}
