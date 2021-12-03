import AvatarElement from '../avatar/AvatarElement'
import styles from './Comments.module.sass'
import { AvatarSizes } from 'src/models/common/avatar'
import { Box } from '@mui/system'
import Title from '../title/Title'
import { TextSizes, TitleSizes } from 'src/models/common/typography'
import { FC, useEffect, useState } from 'react'
import NewComment from './NewComment'
import ButtonOptions from '../button/button-options/ButtonOptions'
import Link from 'src/components/common/links/link/Link'
import SmallLink from '../links/small-link/SmallLink'
import { CommentContent } from '@subsocial/api/flat-subsocial/dto'
import { useSelectPost } from 'src/rtk/features/posts/postsHooks'
import { asCommentStruct } from '@subsocial/api/flat-subsocial/flatteners'
import { useSelectProfile } from 'src/rtk/features/profiles/profilesHooks'
import { getTime } from 'src/utils'
import Text from '../text/Text'
import { CommentProps } from 'src/models/comments'
import { fetchPostReplyIds, selectReplyIds } from 'src/rtk/features/replies/repliesSlice'
import { useApi } from '../../api'
import { shallowEqual } from 'react-redux'
import { useAppDispatch, useAppSelector } from 'src/rtk/app/store'
import { pluralize } from '@subsocial/utils'
import KeyboardArrowDownRoundedIcon from '@mui/icons-material/KeyboardArrowDownRounded'
import KeyboardArrowUpRounded from '@mui/icons-material/KeyboardArrowUpRounded'
import { toShortAddress } from '../../utils/address'
import useLoader from '../../../hooks/useLoader'
import Loader from '../loader/Loader'
import CommentAction from './CommentAction'
import HiddenComponent from '../hidden-component/HiddenComponent'
import { useMyAddress } from '../../../rtk/features/myAccount/myAccountHooks'

const Comment: FC<Omit<CommentProps, 'commentDetails'>> = ({commentId, postUrl}) => {
    const commentDetails = useSelectPost(commentId)

    if (!commentDetails || !commentDetails.post) return null

    return <CommentView commentId={commentId} postUrl={postUrl} commentDetails={commentDetails}/>
}

const CommentView: FC<CommentProps> = ({ postUrl, commentDetails}) => {
    const [ isShowReply, setIsShowReply ] = useState(false)
    const [isShowAllReplies, setIsShowAllReplies] = useState(false)
    const dispatch = useAppDispatch()
    const {isLoader, toggleLoader} = useLoader()
    const address = useMyAddress()
    const {api} = useApi()
    const {post: comment} = commentDetails
    const hasReplies = comment?.struct.visibleRepliesCount > 0
    const profile = useSelectProfile(comment.struct.ownerId.toString())

    useEffect(() => {
        toggleLoader()
        if (hasReplies) dispatch(fetchPostReplyIds({api: api, id: comment.id, myAddress: address})).then(() => toggleLoader())
    }, [])

    const {replyIds = []} = useAppSelector(state => selectReplyIds(state, comment.id), shallowEqual) || {}

    const commentStruct = asCommentStruct(comment.struct)

    const commentContent = comment.content as CommentContent
    if (!comment) return null

    const toggleReplies = () => setIsShowAllReplies(current => !current)

    const onReply = () => setIsShowReply(current => !current)

    return isLoader && isShowAllReplies ? <Loader/> :
        <Box sx={{display: 'flex', gap: 1, background: 'none', width: '100%', mt: 0.75}}>
            <Link href={`/accounts/${profile?.id || comment.struct.ownerId}`} image>
                <AvatarElement
                    src={profile?.content?.avatar}
                    size={AvatarSizes.SMALLER}
                    id={comment.struct.ownerId}
                />
            </Link>

            <div style={{width: '100%'}}>
                {commentStruct.hidden && <HiddenComponent />}
                <Box className={styles.comment}>
                    <div className={styles.details}>
                        <Link href={`/accounts/${comment.struct.ownerId}`}>
                            <Title type={TitleSizes.PROFILE}>{profile?.content?.name || toShortAddress(comment.struct.ownerId)}</Title>
                        </Link>
                        <span>&nbsp;·&nbsp;</span>
                        <SmallLink href={postUrl} className={styles.time}>
                            <Text type={TextSizes.NORMAL} >{getTime(commentStruct.createdAtTime)}</Text>
                        </SmallLink>
                        <ButtonOptions
                            className={styles.options}
                            postId={comment.id}
                            withReactions withHidden
                            isHidden={commentStruct.hidden}
                        />
                    </div>
                    <Text type={TextSizes.NORMAL}>{commentContent.body}</Text>
                </Box>

                <CommentAction
                    onReply={onReply}
                    upvotes={commentStruct.upvotesCount}
                    downvotes={commentStruct.downvotesCount}
                    id={comment.id}
                />
                {isShowReply && <NewComment placeholder={'Add a reply...'} className={styles.new} autoFocus/>}
                {hasReplies &&
                <Box>
                    <Text type={TextSizes.SECONDARY} className={styles.replies} onClick={toggleReplies} component={'button'}>
                        {isShowAllReplies ? 'Hide ' : 'View '}
                        {pluralize(comment?.struct.visibleRepliesCount, 'reply', 'replies')}
                        {isShowAllReplies ? <KeyboardArrowUpRounded/> : <KeyboardArrowDownRoundedIcon/>}
                    </Text>

                    {isShowAllReplies && replyIds.map(id => <Comment commentId={id} postUrl={postUrl} key={id}/>)}
                </Box>}
            </div>
        </Box>
}

export default Comment
