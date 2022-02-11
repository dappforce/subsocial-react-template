import { Meta } from '@storybook/react'
import Comments from '../src/components/common/comments/Comments'
import Comment from '../src/components/common/comments/Comment'
import NewComment from '../src/components/common/comments/NewComment'
import { Box } from '@mui/system'
import { Provider } from 'react-redux'
import React from 'react'
import { initializeStore } from '../src/rtk/app/store'

const store = initializeStore()

export default {
    component: Comments,
    title: 'Comments/Comments',
    decorators: [
        Story => (
            <Provider store={store}>
                <Story />
            </Provider>
        )
    ],
} as Meta

const parentStruct = {
  contentId: "bafyreif7bvy4zzhbiex2aw2iszg24gaxjee6bj7zmsc5u7sdma7hjgwjzm",
  createdAtBlock: 18586,
  createdAtTime: 1640083680000,
  createdByAccount: "3tDL8jNCZHyDesB3kjBAQB1wAwimrG5zNh7HJHARCgh54gFS",
  downvotesCount: 1,
  hidden: false,
  hiddenRepliesCount: 2,
  id: "1",
  isComment: false,
  isRegularPost: true,
  isSharedPost: false,
  isUpdated: true,
  ownerId: "3tDL8jNCZHyDesB3kjBAQB1wAwimrG5zNh7HJHARCgh54gFS",
  repliesCount: 8,
  score: 0,
  sharesCount: 0,
  spaceId: "1003",
  updatedAtBlock: 221836,
  updatedAtTime: 1641303180000,
  updatedByAccount: "3tDL8jNCZHyDesB3kjBAQB1wAwimrG5zNh7HJHARCgh54gFS",
  upvotesCount: 0,
  visibleRepliesCount: 6,
}
const commentId = '22941';

const addNewComment = (id: string) => {
  console.log(id)
}

export const CommentsList = () => <Comments
    parentStruct={parentStruct}/>

export const CommentItem = () =>
    <Box sx={{p: 2}}>
        <Comment
            commentId={commentId}
        />
    </Box>


export const CommentInput = () =>
  <Box sx={{p: 2}}>
    <NewComment
      placeholder={'Add a comment'}
      parentStruct={parentStruct}
      addNewComment={addNewComment}
    />
  </Box>

