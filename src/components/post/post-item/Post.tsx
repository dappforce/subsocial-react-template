import { FC, useState } from 'react'
import styles from './Post.module.sass'
import { Divider } from '@mui/material'
import PostContent from './post-content/PostContent'
import Comments from '../../common/comments/Comments'
import PostActions from './post-actions/PostActions'
import CardWrapper from '../../common/card-wrapper/CardWrapper'
import { getSpaceUrl, getTitleUrl } from 'src/utils'
import { useSelectPost } from 'src/rtk/features/posts/postsHooks'
import { PostWithSomeDetails } from '@subsocial/api/flat-subsocial/dto'
import { useSelectProfile } from 'src/rtk/features/profiles/profilesHooks'
import { useAppSelector } from 'src/rtk/app/store'
import { selectMyReactionByPostId } from 'src/rtk/features/reactions/myPostReactionsSlice'
import SharedPost from '../shared-post/SharedPost'
import { useMyAddress } from '../../../rtk/features/myAccount/myAccountHooks'
import { PostId } from '@subsocial/types/substrate/interfaces'
import HiddenComponent from '../../common/hidden-component/HiddenComponent'

type Props = {
    postId: string,
    isShowActions?: boolean,
}

const Post: FC<Props> = ({postId, isShowActions = true}) => {
    const [ isShowComments, setIsShowComments ] = useState(false)
    const postData = useSelectPost(postId) as PostWithSomeDetails
    const profile = useSelectProfile(postData?.post?.struct.ownerId.toString())

    const address = useMyAddress()

    const reaction = useAppSelector(state => {
        return selectMyReactionByPostId(state, {postId: postId as unknown as PostId, myAddress: address})
    })

    if (!postData) return null

    const {isSharedPost} = postData.post?.struct

    const toggleComments = () => {
        setIsShowComments(current => !current)
    }

    return (
        <CardWrapper className={styles.post}>
            {postData.post.struct.hidden && <HiddenComponent/>}
            {isSharedPost
                ? <SharedPost {...postData} profile={profile}/>
                : <PostContent {...postData} profile={profile}/>}
            {isShowActions && !isSharedPost && <Divider variant="middle"/>}
            {isShowActions && <PostActions post={postData.post} toggleComments={toggleComments} reaction={reaction} marginTop={isSharedPost? -1.5 : 0} />}
            {isShowComments && <>
                <Divider variant="middle"/>
                <Comments
                    countOfComments={postData.post.struct.visibleRepliesCount}
                    postUrl={
                        //@ts-ignore
                        `${getSpaceUrl(postData?.space?.content?.handle, postData?.space?.id)}/${getTitleUrl(postData?.post.content?.title || '', postData?.post.struct.id)}`
                    }
                    parentId={postData.post.struct.id}
                />
            </>}
        </CardWrapper>
    )
}

export default Post
