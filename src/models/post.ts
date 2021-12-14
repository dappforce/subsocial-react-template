import { PostData, PostWithAllDetails, PostWithSomeDetails } from '@subsocial/api/flat-subsocial/dto'
import { PostStruct } from '@subsocial/api/flat-subsocial/flatteners'

export type PostActionsProps = {
    toggleComments: () => void
    post: PostData
    reaction: any
    isSharedPost?: boolean
}

export interface NewArticleProps {
    title: string
    handleTitle: any
    body: string
    handleBody: any
    reset: any
    tags: string[]
    setTags: any
}

export interface NewVideoProps extends NewArticleProps {
    url: string
    setUrl: any
}

export type PostDetailsProps = {
    postData: PostWithAllDetails,
}

export interface NewArticleProps {
    title: string
    handleTitle: any
    body: string
    handleBody: any
    reset: any
    tags: string[]
    setTags: any
}

export interface NewVideoProps extends NewArticleProps {
    url: string
    setUrl: any
}

interface PostDataWithRootPostId extends PostData {
    struct: PostStruct & {rootPostId?: string}
}
export interface PostFullProps extends PostWithSomeDetails {
    post: PostDataWithRootPostId
}
