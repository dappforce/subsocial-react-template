import type { NextPage } from 'next'
import Layout from '../../layout/Layout'
import SpaceView from '../../space/space-item/Space'
import Comments from '../../common/comments/Comments'
import PostFull from '../post-full/PostFull'
import { getSpaceUrl, getTitleUrl } from 'src/utils'
import { fetchPost, fetchPosts, selectPost } from 'src/rtk/features/posts/postsSlice'
import { getInitialPropsWithRedux, NextContextWithRedux } from 'src/rtk/app'
import { bnsToIds, idToBn } from '@subsocial/utils'
import { asCommentStruct, PostStruct } from '@subsocial/api/flat-subsocial/flatteners'
import { PostWithAllDetails } from '@subsocial/api/flat-subsocial/dto'
import { PostWithSomeDetails } from '@subsocial/types'
import { PostDetailsProps } from 'src/models/post'

const PostPage: NextPage<PostDetailsProps> = (props) => {
    const {postData} = props
    const {post, space} = postData
    const { isComment } = post.struct

    if (!post.content) return null

    return (
        <Layout>
            <PostFull {...postData}/>

            <SpaceView spaceData={space} />
            <Comments countOfComments={post.struct.visibleRepliesCount}
                      //@ts-ignore
                      postUrl={`${getSpaceUrl(space?.content?.handle, space?.struct.id, isComment)}/${getTitleUrl(post?.content?.title, post.struct.id)}`}
                      parentId={post.struct.id.toString()} />
        </Layout>
    )
}

export default PostPage


export async function loadPostOnNextReq (
    { context, dispatch, subsocial, reduxStore }: NextContextWithRedux
): Promise<PostWithSomeDetails> {
    const { query } = context

    if (!query.post || typeof query.post !== 'string') return {} as PostWithSomeDetails

    const url = query.post?.split('-')

    const postId = url[url.length - 1]
    const replyIds = await subsocial.subsocial.substrate.getReplyIdsByPostId(idToBn(postId))

    const ids = bnsToIds(replyIds).concat(postId)

    await dispatch(fetchPosts({ api: subsocial, ids, reload: true }))

    const postData = selectPost(reduxStore.getState(), { id: postId })

    if (!postData) return {} as PostWithSomeDetails

    return postData as unknown as PostWithSomeDetails
}

getInitialPropsWithRedux(PostPage, async (props) => {
    const { subsocial, dispatch, reduxStore } = props

    const postData = await loadPostOnNextReq(props)
    const postStruct = postData?.post?.struct as unknown as PostStruct

    if (postStruct?.isComment) {
        const { rootPostId } = asCommentStruct(postStruct as unknown as PostStruct)
        await dispatch(fetchPost({ api: subsocial, id: rootPostId, reload: true }))
    }

    return {
        postData: postData as unknown as PostWithAllDetails,
    }
})
