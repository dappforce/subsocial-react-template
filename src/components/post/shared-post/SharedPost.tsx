import { FC, useEffect, useState } from 'react'
import { AvatarSizes } from 'src/models/common/avatar'
import { useApi } from 'src/components/api'
import { CardContent, CardHeader, CardMedia } from '@mui/material'
import AvatarElement from 'src/components/common/avatar/AvatarElement'
import Options from 'src/components/common/button/button-options/ButtonOptions'
import Link from 'src/components/common/links/link/Link'
import SmallLink from 'src/components/common/links/small-link/SmallLink'
import Title from 'src/components/common/title/Title'
import { TitleSizes } from 'src/models/common/typography'
import { getSpaceUrl, getTime, getTitleUrl, loadImgUrl } from 'src/utils'
import Post from 'src/components/post/post-item/Post'
import { fetchPosts } from 'src/rtk/features/posts/postsSlice'
import { useAppDispatch } from 'src/rtk/app/store'
import { useResponsiveSize } from '../../responsive/ResponsiveContext'

const SharedPost: FC<any> = (props) => {
    const {isMobile} = useResponsiveSize()
    const {post, space, profile} = props
    const [fetched, setFetched] = useState(false)

    const { sharedPostId } = post.struct
    const dispatch = useAppDispatch()
    const {api} = useApi()

    useEffect(() => {
      dispatch(fetchPosts({ids: [sharedPostId], api}))
        .then(() => setFetched(true))
    }, [])

    return (
        <CardContent sx={{py: 0, display: 'flex', width: '100%'}}>
            <CardContent sx={{p: 0, flexGrow: 1}}>
                <CardHeader
                    avatar={<Link href={`/accounts/${profile.id}`} image>
                        <AvatarElement
                            src={profile.content?.avatar}
                            size={AvatarSizes.SMALL}
                            id={profile.id}/>
                    </Link>}
                    action={<Options
                        sx={{mt: 0.5, ml: 0, mr: 0, mb: 0}}
                        postId={post.id}
                        withReactions withHidden
                        isHidden={post.struct.hidden}
                    />}
                    title={<Link href={`/accounts/${profile.id}`}>
                        <Title type={TitleSizes.PROFILE}>{profile?.content?.name}</Title>
                    </Link>}
                    sx={{pr: 0, pl: 0}}
                    subheader={
                        <>
                            <SmallLink href={getSpaceUrl(space.content.handle, space.id)}>
                                {space.content.name}
                            </SmallLink>
                            &nbsp;·&nbsp;
                            <SmallLink
                                href={`${getSpaceUrl(space.content.handle, space.id)}/${getTitleUrl(post.content.title, post.struct.id)}`}>
                                {getTime(post.struct.createdAtTime)}
                            </SmallLink>
                        </>
                    }
                />

                {fetched && <Post postId={sharedPostId} isShowActions={false} />}

                {(isMobile && post.content.image && !post.content.summary) &&
                <Link
                    href={`${getSpaceUrl(space.content.handle, space.id)}/${getTitleUrl(post.content.title, post.struct.id)}`}
                    image>
                    <CardMedia
                        component="img"
                        sx={{width: '100%', maxHeight: 242, mt: 2, borderRadius: 1}}
                        image={loadImgUrl(post.content.image)}
                        alt={post.content.title}
                    />
                </Link>}
            </CardContent>
            {(!isMobile && post.content.image && post.content.summary) &&
            <Link
                href={`${getSpaceUrl(space.content.handle, space.id)}/${getTitleUrl(post.content.title, post.struct.id)}`}
                image>
                <CardMedia
                    component="img"
                    sx={{minWidth: 174, minHeight: 174, maxWidth: 174, maxHeight: 174, m: 2, mr: 0, borderRadius: 1}}
                    image={loadImgUrl(post.content.image)}
                    alt={post.content.title}
                />
            </Link>}
        </CardContent>
    )
}

export default SharedPost
