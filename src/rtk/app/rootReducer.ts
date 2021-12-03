import { combineReducers } from '@reduxjs/toolkit'
import contents from '../features/contents/contentsSlice'
import profiles from '../features/profiles/profilesSlice'
import spaces from '../features/spaces/spacesSlice'
import posts from '../features/posts/postsSlice'
import replyIds from '../features/replies/repliesSlice'
import myAccount from '../features/myAccount/myAccountSlice'
import reactions from '../features/reactions/myPostReactionsSlice'

import main from '../features/mainSlice'

const rootReducer = combineReducers({
  contents,
  profiles,
  spaces,
  posts,
  replyIds,
  myAccount,
  reactions,
  main
})

export type RootState = ReturnType<typeof rootReducer>

export default rootReducer
