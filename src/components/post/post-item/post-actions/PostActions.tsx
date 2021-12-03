import { FC, useState } from 'react'
import { CardActions } from '@mui/material'
import ButtonComment from '../../../common/button/button-comment/ButtonComment'
import ButtonUpvote from '../../../common/button/buttons-vote/ButtonUpvote'
import ButtonDownvote from '../../../common/button/buttons-vote/ButtonDownvote'
import ButtonShare from '../../../common/button/button-share/ButtonShare'
import { PostActionsProps } from 'src/models/post'

const PostActions: FC<PostActionsProps> = (props) => {
    const {post, marginTop = 0} = props
    const [isActiveUp, setIsActiveUp] = useState(props.reaction?.kind === 'Upvote')
    const [isActiveDown, setIsActiveDown] = useState(props.reaction?.kind === 'Downvote')

    const [countOfUpvotes, setCountOfUpvotes] = useState(post.struct.upvotesCount || 0)
    const [countOfDownvotes, setCountOfDownvotes] = useState(post.struct.downvotesCount || 0)

    const toUpvote = () => {
        if (isActiveUp) {
            setCountOfUpvotes(current => current - 1)
        } else {
            setCountOfUpvotes(current => current + 1)
        }

        setIsActiveUp(current => !current)

        if (isActiveDown) {
            setIsActiveDown(false)
            setCountOfDownvotes(current => current - 1)
        }
    }

    const toDownvote = () => {
        if (isActiveDown) {
            setCountOfDownvotes(current => current - 1)
        } else {
            setCountOfDownvotes(current => current + 1)
        }

        setIsActiveDown(current => !current)

        if (isActiveUp) {
            setIsActiveUp(false)
            setCountOfUpvotes(current => current - 1)
        }
    }

    return (
        <CardActions sx={{pl: 2, pr: 2, pb: .25, pt: .25, mt: marginTop, justifyContent: 'space-evenly'}}>
            <ButtonUpvote isActive={isActiveUp} value={countOfUpvotes} onClick={toUpvote} />
            <ButtonDownvote isActive={isActiveDown} value={countOfDownvotes} onClick={toDownvote} />
            <ButtonComment onClick={props.toggleComments} value={post.struct.visibleRepliesCount}/>
            <ButtonShare />
        </CardActions>
    )
}

export default PostActions
