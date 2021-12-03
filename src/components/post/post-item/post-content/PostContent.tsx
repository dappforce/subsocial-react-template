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
import { getSpaceUrl, getTime, getTitleUrl, loadImgUrl } from 'src/utils'
import Embed from 'src/components/common/Embed'
import SeeMore from 'src/components/common/links/see-more/SeeMore'
import Text from 'src/components/common/text/Text'
import { useResponsiveSize } from '../../../responsive/ResponsiveContext'
import { toShortAddress } from 'src/components/utils/address'

const PostContent: FC<any> = (props) => {
    const {isMobile} = useResponsiveSize()
    const {post, space, profile} = props
    const { isComment } = post.struct

    return (
        <CardContent sx={{pt: 0, display: 'flex', width: '100%'}}>
            <CardContent sx={{p: 0, flexGrow: 1}}>
                <CardHeader
                    avatar={
                        <Link href={`/accounts/${profile?.id || post.struct.ownerId}`} image>
                            <AvatarElement
                                src={profile?.content?.avatar}
                                size={AvatarSizes.SMALL}
                                id={profile?.id || post.struct.ownerId}/>
                        </Link>
                    }
                    action={<Options
                        sx={{mt: 0.5, ml: 0, mr: 0, mb: 0}}
                        postId={post.id}
                        withReactions withHidden
                        isHidden={post.struct.hidden}
                    />}
                    title={<Link href={`/accounts/${profile?.id || post.struct.ownerId}`}>
                        <Title type={TitleSizes.PROFILE}>{profile?.content?.name || toShortAddress(post.struct.ownerId)}</Title>
                    </Link>}
                    sx={{pr: 0, pl: 0}}
                    subheader={
                        <>
                            {space && <SmallLink
                                href={getSpaceUrl(space?.content.handle, space?.id)}
                                as={getSpaceUrl(space?.content.handle, space?.id)}
                            >
                                {space?.content.name}
                            </SmallLink>}
                            {space && ('\xA0 · \xA0')}
                            <SmallLink
                                href={`${getSpaceUrl(space?.content.handle, space?.id, isComment)}/${getTitleUrl(post.content.title, post.struct.id)}`}
                            >
                                {getTime(post.struct.createdAtTime)}
                            </SmallLink>
                        </>
                    }
                />
                {post.content.title &&
                <Link
                    href={`${getSpaceUrl(space?.content.handle, space?.id)}/${getTitleUrl(post.content.title, post.id)}`}><Title
                    type={TitleSizes.PREVIEW} className={styles.title}>{post.content.title}</Title></Link>}

                {post.content.link && <Embed link={post.content.link} className={styles.embed}/>}

                {post.content.summary &&
                <Text type={TextSizes.NORMAL} className={styles.content}>
                    {post.content.summary} {' '}
                    {post.content.isShowMore &&
                    <SeeMore
                        href={`${getSpaceUrl(space?.content.handle, space?.id)}/${getTitleUrl(post.content.title, post.struct.id)}`}/>
                    }
                </Text>
                }

                {(isMobile && post.content.image && !post.content.summary) &&
                <Link
                    href={`${getSpaceUrl(space?.content.handle, space?.id)}/${getTitleUrl(post.content.title, post.struct.id)}`}
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
                href={`${getSpaceUrl(space?.content.handle, space?.id)}/${getTitleUrl(post.content.title, post.struct.id)}`}
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

export default PostContent
