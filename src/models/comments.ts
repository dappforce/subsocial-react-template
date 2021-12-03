import { PostId, PostWithSomeDetails } from '@subsocial/api/flat-subsocial/dto'

export interface CommentsProps {
    postUrl: string
    countOfComments: number
    parentId: string
}

export interface CommentProps {
    commentId: PostId,
    postUrl: string,
    commentDetails: PostWithSomeDetails
}

export interface NewCommentProps {
    placeholder: string
    className?: string
    autoFocus?: boolean
}

export interface CommentActionProps {
    onReply: () => void
    upvotes: number
    downvotes: number
    id: string
}
