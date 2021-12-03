import { fetchMyReactionsByPostIds} from './myPostReactionsSlice'
import { AccountId, PostId } from '@subsocial/api/flat-subsocial/dto'
import { useApi } from '../../../components/api'
import { useAppDispatch } from '../../app/store'

export const useFetchMyReactionsByPostId = (postId: PostId, myAddress: AccountId) => {
  return useFetchMyReactionsByPostIds([ postId ], myAddress)
}

export const useFetchMyReactionsByPostIds = (postIds: PostId[], myAddress: AccountId) => {
  const dispatch = useAppDispatch()
  const {api} = useApi()

  return dispatch(
    fetchMyReactionsByPostIds({ids: postIds, myAddress, api} )
  )
}
