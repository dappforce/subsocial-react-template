import CardWrapper from '../../common/card-wrapper/CardWrapper'
import { CardActions, CardContent, CardHeader, CardMedia, Divider } from '@mui/material'
import AvatarElement from '../../common/avatar/AvatarElement'
import { AvatarSizes } from 'src/models/common/avatar'
import Options from '../../common/button/button-options/ButtonOptions'
import Link from '../../common/links/link/Link'
import Title from '../../common/title/Title'
import styles from './PostFull.module.sass'
import SmallLink from '../../common/links/small-link/SmallLink'
import TagList from '../../common/tag/TagList'
import { FC, useContext, useEffect, useState } from 'react'
import ReactMarkdown from 'react-markdown'
import { TitleSizes } from 'src/models/common/typography'
import Embed from '../../common/Embed'
import ButtonUpvote from '../../common/button/buttons-vote/ButtonUpvote'
import ButtonDownvote from '../../common/button/buttons-vote/ButtonDownvote'
import ButtonShare from '../../common/button/button-share/ButtonShare'
import { useSelectProfile } from '../../../rtk/features/profiles/profilesHooks'
import { getSpaceUrl, getTime, getTitleUrl, loadImgUrl } from '../../../utils'
import { PostWithSomeDetails } from '@subsocial/api/flat-subsocial/dto'
import { toShortAddress } from 'src/components/utils/address'
import { useAppDispatch } from 'src/rtk/app/store'
import { ApiContext } from 'src/components/api'
import { fetchPosts } from 'src/rtk/features/posts/postsSlice'
import { useSelectPost } from 'src/rtk/app/hooks'

const PostFull: FC<PostWithSomeDetails> = (props) => {
    const {post, space} = props
    const { isComment } = post.struct

    const [isActiveUp, setIsActiveUp] = useState(false)
    const [isActiveDown, setIsActiveDown] = useState(false)
    const [countOfUpvotes, setCountOfUpvotes] = useState(post?.struct.upvotesCount || 0)
    const [countOfDownvotes, setCountOfDownvotes] = useState(post?.struct.downvotesCount || 0)

    const toUpvote = () => {
        if (isActiveUp) {
            setCountOfUpvotes(current => current - 1)
        } else {
            setCountOfUpvotes(current => current + 1)
        }

        setIsActiveUp(current => !current)

        if (isActiveDown) {
            setIsActiveDown(false)
            setCountOfDownvotes(current => current - 1)
        }
    }

    const toDownvote = () => {
        if (isActiveDown) {
            setCountOfDownvotes(current => current - 1)
        } else {
            setCountOfDownvotes(current => current + 1)
        }

        setIsActiveDown(current => !current)

        if (isActiveUp) {
            setIsActiveUp(false)
            setCountOfUpvotes(current => current - 1)
        }
    }
    const profile = useSelectProfile(post.struct.ownerId.toString())

    const [fetched, setFetched] = useState(false)

    const dispatch = useAppDispatch()

    const {api} = useContext(ApiContext)

    //@ts-ignore
    const { rootPostId } = post.struct

    const postData = useSelectPost(rootPostId) as PostWithSomeDetails

    useEffect(() => {
      dispatch(fetchPosts({ids: [rootPostId], api}))
      .then(() => setFetched(true))
    }, [])

    if (!post) return null

    return (
        <CardWrapper className={styles.post}>
            <CardContent sx={{pt: 0, pb: 0, display: 'flex', width: '100%'}}>
                <CardContent sx={{p: 0, flexGrow: 1}}>
                    <CardHeader
                        avatar={
                            <Link href={`/accounts/${profile?.id || post.struct.ownerId}`} image>
                                <AvatarElement
                                    src={profile?.content?.avatar}
                                    size={AvatarSizes.SMALL}
                                    id={profile?.id || post.struct.ownerId}
                                />
                            </Link>
                        }
                        action={<Options sx={{mt: 0.5, ml: 0, mr: 0, mb: 0}} withHidden/>}
                        title={<Link href={`/accounts/${profile?.id || post.struct.ownerId}`}>
                            <Title type={TitleSizes.PROFILE}>{profile?.content?.name || toShortAddress(post.struct.ownerId)}</Title>
                        </Link>}
                        sx={{pr: 0, pl: 0}}
                        subheader={
                            <>
                                {/*@ts-ignore*/}
                                <SmallLink href={`${getSpaceUrl(space?.content.handle, space?.struct.id)}`}>
                                    {space?.content?.name}
                                </SmallLink>
                                {space && ('\xA0 · \xA0')}
                                {/*@ts-ignore*/}
                                <SmallLink href={`${getSpaceUrl(space?.content?.handle, space?.struct.id, isComment)}/${getTitleUrl(post?.content.title, post.struct.id)}`}>
                                    {getTime(post.struct.createdAtTime)}
                                </SmallLink>
                            </>
                        }
                    />
                    {fetched && <Title variant={'h1'} type={TitleSizes.DETAILS} className={styles.title}>
                        {post?.content?.title}</Title>}
                    {fetched && postData?.post?.content?.title &&
                        <Title variant={'h1'} type={TitleSizes.DETAILS} className={styles.title}>
                            {`In response to `}
                            {/*@ts-ignore*/}
                            <Link href={`${getSpaceUrl(space?.content?.handle, space?.struct.id, isComment)}/${getTitleUrl(post?.content?.title, post.struct.id)}`}>
                                    {postData?.post?.content?.title}
                            </Link>
                        </Title>
                    }

                    {post.content?.image && <CardMedia
                        component="img"
                        sx={{width: '100%', mt: 2, mb: 2, borderRadius: 1}}
                        image={loadImgUrl(post.content?.image)}
                    />
                    }

                    {post.content?.link && <Embed link={post.content?.link}/>}

                    {post.content?.body && <ReactMarkdown className={'markdown-body'}>
                        {post.content.body}
                    </ReactMarkdown>}
                </CardContent>
            </CardContent>

            <TagList tags={post.content?.tags} className={styles.tags}/>

            <Divider variant="middle"/>
            <CardActions sx={{justifyContent: 'space-evenly'}}>
                <ButtonUpvote isShowLabel isActive={isActiveUp} onClick={toUpvote} value={countOfUpvotes}/>
                <ButtonDownvote isShowLabel isActive={isActiveDown} onClick={toDownvote} value={countOfDownvotes}/>
                <ButtonShare isShowLabel/>
            </CardActions>
        </CardWrapper>
    )
}

export default PostFull
