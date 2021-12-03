import { useAppSelector } from 'src/rtk/app/store'
import { selectPostStructById } from './postsSlice'
import { selectPostContentById } from '../contents/contentsSlice'
import { useSelectSpace } from '../spaces/spacesHooks'
import { PostId, PostWithSomeDetails } from '@subsocial/api/flat-subsocial/dto'
import { asCommentStruct } from '@subsocial/api/flat-subsocial/flatteners'

export const useSelectPost = (postId?: PostId): PostWithSomeDetails | undefined => {
    const struct = useAppSelector(state => postId
        ? selectPostStructById(state, postId)
        : undefined
    )

    const cid = struct?.contentId
    const content = useAppSelector(state => cid
        ? selectPostContentById(state, cid)
        : undefined
    )

    const rootPostStruct = useAppSelector(state => struct && struct.isComment
        ? selectPostStructById(state, asCommentStruct(struct).rootPostId)
        : undefined)

    const spaceId = struct?.spaceId || rootPostStruct?.spaceId
    const space = useSelectSpace(spaceId)

    if (!struct || !content) return undefined

    const id = struct.id

    const post = {
        id,
        struct,
        content
    }

    return {
        id,
        post,
        space
    }
}
