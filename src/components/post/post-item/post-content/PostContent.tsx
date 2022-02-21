import { FC } from 'react';
import styles from '../Post.module.sass';
import { CardContent, CardMedia } from '@mui/material';
import Link from 'src/components/common/links/link/Link';
import Title from 'src/components/common/title/Title';
import { TitleSizes, TextSizes } from 'src/models/common/typography';
import { getUrl, loadImgUrl, TypeUrl } from 'src/utils';
import Embed from 'src/components/common/Embed';
import SeeMore from 'src/components/common/links/see-more/SeeMore';
import Text from 'src/components/common/text/Text';
import { useResponsiveSize } from 'src/components/responsive/ResponsiveContext';
import PostInfo from '../PostInfo';

const PostContent: FC<any> = (props) => {
  const { isMobile } = useResponsiveSize();
  const { post, space, profile } = props;

  return (
    <CardContent className={styles.mainPostContent}>
      <CardContent className={styles.postContent}>
        <PostInfo profile={profile} post={post} space={space} />
        {post.content.title && (
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
          </Link>
        )}

        {post.content.link && (
          <Embed link={post.content.link} className={styles.embed} />
        )}

        {post.content.summary && (
          <Text type={TextSizes.NORMAL} className={styles.content}>
            {post.content.summary}{' '}
            {post.content.isShowMore && (
              <SeeMore
                href={getUrl({
                  type: TypeUrl.Post,
                  title: space?.content.handle,
                  id: space?.id,
                  subTitle: post.content.title,
                  subId: post.struct.id,
                })}
              />
            )}
          </Text>
        )}

        {isMobile && post.content.image && post.content.summary && (
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
        )}
      </CardContent>
      {!isMobile && post.content.image && post.content.summary && (
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
      )}
    </CardContent>
  );
};

export default PostContent;
