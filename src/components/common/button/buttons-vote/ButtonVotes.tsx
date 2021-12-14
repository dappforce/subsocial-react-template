import styles from './ButtonsVote.module.sass'
import { FC, useMemo } from 'react'
import ThumbDownAltOutlinedIcon from '@mui/icons-material/ThumbDownAltOutlined'
import ThumbDownIcon from '@mui/icons-material/ThumbDown'
import Text from '../../text/Text'
import { TextSizes } from 'src/models/common/typography'
import ButtonIcon from '../button-icon/ButtonIcon'
import { ButtonVoteProps, InnerButtonVoteProps } from 'src/models/common/button'
import ThumbUpOutlinedIcon from '@mui/icons-material/ThumbUpOutlined'
import ThumbUpIcon from '@mui/icons-material/ThumbUp'
import { useCreateUpsertMyReaction } from 'src/rtk/features/reactions/myPostReactionsHooks'
import {
    useCreateReloadPost,
    useCreateUpsertPost
} from 'src/rtk/features/posts/postsHooks'
import {
    Reaction,
    ReactionStruct,
    selectMyReactionByPostId
} from 'src/rtk/features/reactions/myPostReactionsSlice'
import { ReactionEnum, ReactionId, ReactionType } from '@subsocial/api/flat-subsocial/dto'
import { ReactionKind } from '@subsocial/types/substrate/classes'
import TxButton from '../TxButton'
import { getNewIdsFromEvent, getPostStructWithUpdatedCounts } from './voting'
import { useMyAddress } from 'src/rtk/features/myAccount/myAccountHooks'
import { useAppSelector } from 'src/rtk/app/store'
import { SubmittableResult } from '@polkadot/api'

const ButtonVotes: FC<ButtonVoteProps> = (props) => {
    const myAddress = useMyAddress()
    const reaction = useAppSelector(state =>
        selectMyReactionByPostId(state, {postId: props.post.id, myAddress})
    )

    return <InnerButtonVotes reaction={reaction} accountId={myAddress} {...props}/>
}

const InnerButtonVotes: FC<InnerButtonVoteProps> = (
    {
        withLabel,
        reactionEnum,
        post,
        reaction: oldReaction = {id: post?.id} as ReactionStruct,
        ...props
    }
) => {
    const {id: postId, upvotesCount, downvotesCount} = post
    const {reactionId, kind: oldKind} = oldReaction

    const upsertMyReaction = useCreateUpsertMyReaction()
    const upsertPost = useCreateUpsertPost()
    const reloadPost = useCreateReloadPost()

    const newKind = reactionEnum.valueOf() as ReactionType
    const isUpvote = newKind === ReactionEnum.Upvote
    const type = isUpvote ? 'upvote' : 'downvote'
    const count = isUpvote ? upvotesCount : downvotesCount

    const args = {id: postId}

    const buildTxParams = () => {
        if (!reactionId) {
            // Case: Add a new reaction
            return [ postId, new ReactionKind(newKind) ]
        } else if (oldKind !== newKind) {
            // Case: Change a kind of the existing reaction
            return [ postId, reactionId, new ReactionKind(newKind) ]
        } else {
            // Case: Delete the existing reaction
            return [ postId, reactionId ]
        }
    }

    const updateOrDeleteReaction = (_newReactionId?: ReactionId) => {
        let newReactionId = _newReactionId || reactionId

        if (!newReactionId && !isActive) {
            newReactionId = `fakeId-${postId}`
        }

        const newReaction: Reaction = {
            reactionId: newReactionId,
            kind: isActive ? undefined : newKind
        }

        upsertMyReaction({id: postId, ...newReaction})
    }

    const isActive = oldKind === newKind

    const changeReactionTx = isActive
        ? 'reactions.deletePostReaction'
        : 'reactions.updatePostReaction'

    const onClick = () => {
        updateOrDeleteReaction()
        upsertPost(getPostStructWithUpdatedCounts({post, oldReaction, newKind}))
    }

    const onFailed = () => {
        upsertMyReaction(oldReaction)
        upsertPost(post)
    }

    const onSuccess = (txResult: SubmittableResult) => {
        reloadPost(args)

        const newReactionId = reactionId || getNewIdsFromEvent(txResult)[1]?.toString()
        updateOrDeleteReaction(newReactionId)
    }

    const content = useMemo(() => ({
        downvote: {
            disable: <ThumbDownAltOutlinedIcon/>,
            active: <ThumbDownIcon className={styles.downvote}/>,
            label: 'Downvote',
            styles: styles.red
        },
        upvote: {
            disable: <ThumbUpOutlinedIcon/>,
            active: <ThumbUpIcon className={styles.upvote}/>,
            label: 'Upvote',
            styles: styles.green
        }
    }), [])

    return (
        <TxButton
            tx={!reactionId
                ? 'reactions.createPostReaction'
                : changeReactionTx
            }
            params={buildTxParams}
            onClick={onClick}
            onSuccess={onSuccess}
            onFailed={onFailed}
            component={ButtonIcon}
            {...props}
        >
            {!isActive ? content[type].disable : content[type].active}
            {!withLabel && count > 0 &&
            <Text
                type={TextSizes.SECONDARY}
                className={`${styles.value} ${isActive ? content[type].styles : ''}`}
            >
                {count}
            </Text>}
            {withLabel &&
            <Text type={TextSizes.SECONDARY} className={styles.label}>
                {content[type].label} {count > 0 && `(${count})`}
            </Text>
            }
        </TxButton>
    )
}

export default ButtonVotes
