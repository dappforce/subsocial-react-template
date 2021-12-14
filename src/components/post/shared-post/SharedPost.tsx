import { FC, useEffect, useState } from 'react'
import { AvatarSizes } from 'src/models/common/avatar'
import { useApi } from 'src/components/api'
import { CardContent, CardHeader } from '@mui/material'
import AvatarElement from 'src/components/common/avatar/AvatarElement'
import Options from 'src/components/common/button/button-options/ButtonOptions'
import Link from 'src/components/common/links/link/Link'
import SmallLink from 'src/components/common/links/small-link/SmallLink'
import Title from 'src/components/common/title/Title'
import { TitleSizes } from 'src/models/common/typography'
import { getTime, getUrl, TypeUrl } from 'src/utils'
import Post from 'src/components/post/post-item/Post'
import { fetchPosts } from 'src/rtk/features/posts/postsSlice'
import { useAppDispatch } from 'src/rtk/app/store'
import { useResponsiveSize } from '../../responsive/ResponsiveContext'
import styles from '../post-item/Post.module.sass'

const SharedPost: FC<any> = (props) => {
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
        <CardContent className={`${styles.mainPostContent} ${styles.mainPostContent_shared}`}>
            <CardContent className={styles.postContent}>
                <CardHeader
                    avatar={
                        <Link
                            href={getUrl({
                                type: TypeUrl.Account,
                                id: profile.id,
                            })}
                            image
                        >
                            <AvatarElement
                                src={profile.content?.avatar}
                                size={AvatarSizes.SMALL}
                                id={profile.id}
                            />
                        </Link>
                    }
                    action={<Options
                        className={styles.action}
                        postId={post.id}
                        withReactions withHidden
                        isHidden={post.struct.hidden}
                    />}

                    title={
                        <Link
                            href={getUrl({
                                type: TypeUrl.Account,
                                id: profile.id,
                            })}
                        >
                            <Title type={TitleSizes.PROFILE}>{profile?.content?.name}</Title>
                        </Link>
                    }
                    className={styles.header}
                    subheader={
                        <>
                            <SmallLink
                                href={getUrl({
                                    type: TypeUrl.Space,
                                    title: space.content.handle,
                                    id: space.id,
                                })}
                            >
                                {space.content.name}
                            </SmallLink>
                            &nbsp;·&nbsp;
                            <SmallLink
                                href={getUrl({
                                    type: TypeUrl.Post,
                                    title: space.content.handle,
                                    id: space.id,
                                    subTitle: post.content.title,
                                    subId: post.struct.id,
                                })}
                            >
                                {getTime(post.struct.createdAtTime)}
                            </SmallLink>
                        </>
                    }
                />

                {fetched && <Post postId={sharedPostId} isShowActions={false} />}
            </CardContent>
        </CardContent>
    )
}

export default SharedPost
