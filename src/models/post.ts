import { PostData, PostWithAllDetails } from '@subsocial/api/flat-subsocial/dto'

export type PostActionsProps = {
    toggleComments: () => void
    post: PostData
    reaction: any
    marginTop?: number
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
