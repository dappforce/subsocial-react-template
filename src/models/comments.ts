import { PostId, PostWithSomeDetails } from '@subsocial/api/flat-subsocial/dto'
import { PostStruct } from '@subsocial/api/flat-subsocial/flatteners'

export interface CommentsProps {
    countOfComments: number
    parentId: string
}

export interface CommentProps {
    commentId: PostId,
    commentDetails: PostWithSomeDetails
}

export interface NewCommentProps {
    placeholder: string
    className?: string
    autoFocus?: boolean
}

export interface CommentActionProps {
    onReply: () => void
    comment: PostStruct
}
