import { FC } from 'react'
import styles from '../Post.module.sass'
import { AvatarSizes } from 'src/models/common/avatar'
import { CardContent, CardHeader, CardMedia } from '@mui/material'
import AvatarElement from 'src/components/common/avatar/AvatarElement'
import Options from 'src/components/common/button/button-options/ButtonOptions'
import Link from 'src/components/common/links/link/Link'
import SmallLink from 'src/components/common/links/small-link/SmallLink'
import Title from 'src/components/common/title/Title'
import { TitleSizes, TextSizes } from 'src/models/common/typography'
import { getTime, getUrl, loadImgUrl, TypeUrl } from 'src/utils'
import Embed from 'src/components/common/Embed'
import SeeMore from 'src/components/common/links/see-more/SeeMore'
import Text from 'src/components/common/text/Text'
import { useResponsiveSize } from '../../../responsive/ResponsiveContext'
import { toShortAddress } from 'src/components/utils/address'

const PostContent: FC<any> = (props) => {
    const { isMobile } = useResponsiveSize()
    const { post, space, profile } = props
    const { isComment } = post.struct

    return (
        <CardContent className={styles.mainPostContent}>
            <CardContent className={styles.postContent}>
                <CardHeader
                    avatar={
                        <Link
                            href={getUrl({
                                type: TypeUrl.Account,
                                id: profile?.id || post.struct.ownerId,
                            })}
                            image
                        >
                            <AvatarElement
                                src={profile?.content?.avatar}
                                size={AvatarSizes.SMALL}
                                id={profile?.id || post.struct.ownerId}
                            />
                        </Link>
                    }
                    action={
                        <Options
                            className={styles.action}
                            postId={post.id}
                            withReactions withHidden
                            isHidden={post.struct.hidden}
                        />
                    }
                    title={
                        <Link
                            href={getUrl({
                                type: TypeUrl.Account,
                                id: profile?.id || post.struct.ownerId,
                            })}
                        >
                            <Title type={TitleSizes.PROFILE}>{profile?.content?.name || toShortAddress(post.struct.ownerId)}</Title>
                        </Link>
                    }
                    className={styles.header}
                    subheader={
                        <>
                            {space &&
                                <SmallLink
                                    href={getUrl({
                                      type: TypeUrl.Space,
                                      title: space?.content.handle,
                                      id: space?.id,
                                    })}
                                    as={getUrl({
                                      type: TypeUrl.Space,
                                      title: space?.content.handle,
                                      id: space?.id,
                                    })}
                                >
                                    {space?.content.name}
                                </SmallLink>
                            }
                            {space && ('\xA0 · \xA0')}
                            <SmallLink
                                href={
                                    isComment
                                    ? getUrl({
                                        type: TypeUrl.Comment,
                                        subTitle: post.content.body,
                                        subId: post.struct.id,
                                    })
                                    : getUrl({
                                        type: TypeUrl.Post,
                                        title: space?.content.handle,
                                        id: space?.struct.id,
                                        subTitle: post?.content.title,
                                        subId: post.struct.id,
                                    })
                                }
                            >
                                {getTime(post.struct.createdAtTime)}
                            </SmallLink>
                        </>
                    }
                />
                {post.content.title &&
                    <Link
                        href={getUrl({
                            type: TypeUrl.Post,
                            title: space?.content.handle,
                            id: space?.id,
                            subTitle: post.content.title,
                            subId: post.id,
                        })}
                    >
                        <Title type={TitleSizes.PREVIEW} className={styles.title}>
                            {post.content.title}
                        </Title>
                    </Link>}

                {post.content.link && <Embed link={post.content.link} className={styles.embed}/>}

                {post.content.summary &&
                    <Text type={TextSizes.NORMAL} className={styles.content}>
                        {post.content.summary}
                        {' '}
                        {post.content.isShowMore &&
                            <SeeMore href={getUrl({
                                type: TypeUrl.Post,
                                title: space?.content.handle,
                                id: space?.id,
                                subTitle: post.content.title,
                                subId: post.struct.id,
                            })}/>
                        }
                    </Text>
                }

                {(isMobile && post.content.image && post.content.summary) &&
                    <Link
                        href={getUrl({
                            type: TypeUrl.Post,
                            title: space?.content.handle,
                            id: space?.id,
                            subTitle: post.content.title,
                            subId: post.struct.id,
                        })}
                        image
                    >
                        <CardMedia
                            component="img"
                            className={styles.imgContentMobile}
                            image={loadImgUrl(post.content.image)}
                            alt={post.content.title}
                        />
                    </Link>
                }
            </CardContent>
            {(!isMobile && post.content.image && post.content.summary) &&
                <Link
                    href={getUrl({
                        type: TypeUrl.Post,
                        title: space?.content.handle,
                        id: space?.id,
                        subTitle: post.content.title,
                        subId: post.struct.id,
                    })}
                    image
                >
                    <CardMedia
                        component="img"
                        className={styles.imgContentDesktop}
                        image={loadImgUrl(post.content.image)}
                        alt={post.content.title}
                    />
                </Link>
            }
        </CardContent>
    )
}

export default PostContent
