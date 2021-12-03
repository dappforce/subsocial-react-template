import React, { FC, useState } from 'react'
import styles from './Comments.module.sass'
import ButtonUpvote from '../button/buttons-vote/ButtonUpvote'
import ButtonDownvote from '../button/buttons-vote/ButtonDownvote'
import ButtonReply from '../button/ButtonReply'
import { useAppSelector } from 'src/rtk/app/store'
import { selectMyReactionByPostId } from 'src/rtk/features/reactions/myPostReactionsSlice'
import { PostId } from '@subsocial/types/substrate/interfaces'
import { CommentActionProps } from 'src/models/comments'
import { useMyAddress } from '../../../rtk/features/myAccount/myAccountHooks'

const CommentAction: FC<CommentActionProps> = ({onReply, id, downvotes = 0, upvotes = 0}) => {
    const address = useMyAddress()
    const reaction = useAppSelector(state => {
        return selectMyReactionByPostId(
            state,
            {postId: id as unknown as PostId, myAddress: address}
        )
    })
    const [ isActiveUp, setIsActiveUp ] = useState(reaction?.kind === 'Upvote')
    const [ isActiveDown, setIsActiveDown ] = useState(reaction?.kind === 'Downvote')
    const [ countOfUpvotes, setCountOfUpvotes ] = useState(upvotes)
    const [ countOfDownvotes, setCountOfDownvotes ] = useState(downvotes)

    const toUpvote = () => {
        isActiveUp
            ? setCountOfUpvotes(current => current - 1)
            : setCountOfUpvotes(current => current + 1)

        setIsActiveUp(current => !current)

        if (isActiveDown) {
            setIsActiveDown(false)
            setCountOfDownvotes(current => current - 1)
        }
    }

    const toDownvote = () => {
        isActiveDown
            ? setCountOfDownvotes(current => current - 1)
            : setCountOfDownvotes(current => current + 1)

        setIsActiveDown(current => !current)

        if (isActiveUp) {
            setIsActiveUp(false)
            setCountOfUpvotes(current => current - 1)
        }
    }
    return (
        <div className={styles.group}>
            <ButtonUpvote
                isActive={isActiveUp}
                value={countOfUpvotes}
                isShowLabel
                onClick={toUpvote}
            />
            <ButtonDownvote
                isActive={isActiveDown}
                value={countOfDownvotes}
                isShowLabel
                onClick={toDownvote}
            />
            <ButtonReply onClick={onReply}/>
        </div>
    )
}

export default CommentAction
