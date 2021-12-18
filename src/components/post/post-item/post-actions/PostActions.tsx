import { FC } from 'react'
import { CardActions } from '@mui/material'
import ButtonComment from '../../../common/button/button-comment/ButtonComment'
import ButtonShare from '../../../common/button/button-share/ButtonShare'
import { PostActionsProps } from 'src/models/post'
import styles from '../Post.module.sass'
import ButtonVotes from '../../../common/button/buttons-vote/ButtonVotes'
import { ReactionEnum } from '@subsocial/api/flat-subsocial/dto'

const PostActions: FC<PostActionsProps> = (props) => {
    const { post, isSharedPost = 0 } = props

    const className = isSharedPost ? `${styles.sharedPost} ${styles.actions}` : styles.actions

    return (
        <CardActions className={className}>
            <ButtonVotes
                post={post.struct}
                reactionEnum={ReactionEnum.Upvote}
            />
            <ButtonVotes
                post={post.struct}
                reactionEnum={ReactionEnum.Downvote}
            />
            <ButtonComment
                onClick={props.toggleComments}
                value={post.struct.visibleRepliesCount}
            />
            <ButtonShare />
        </CardActions>
    )
}

export default PostActions
