import AvatarElement from '../avatar/AvatarElement';
import styles from './Comments.module.sass';
import { AvatarSizes } from 'src/models/common/avatar';
import { Box } from '@mui/system';
import Title from '../title/Title';
import { TextSizes, TitleSizes } from 'src/models/common/typography';
import { FC, useEffect, useState } from 'react';
import NewComment from './NewComment';
import ButtonOptions from '../button/button-options/ButtonOptions';
import Link from 'src/components/common/links/link/Link';
import SmallLink from '../links/small-link/SmallLink';
import { CommentContent, PostData } from '@subsocial/api/types/dto';
import { useSelectPost } from 'src/store/features/posts/postsHooks';
import { asCommentStruct } from '@subsocial/api/subsocial/flatteners/utils';
import { useSelectProfile } from 'src/store/features/profiles/profilesHooks';
import { DateService, getUrl, transformCount, TypeUrl } from 'src/utils';
import Text from '../text/Text';
import { CommentProps } from 'src/models/comments';
import {
  fetchPostReplyIds,
  selectReplyIds,
  upsertReplyIdsByPostId,
} from 'src/store/features/replies/repliesSlice';
import { useApi } from '../../api';
import { shallowEqual } from 'react-redux';
import { useAppDispatch, useAppSelector } from 'src/store/app/store';
import KeyboardArrowDownRoundedIcon from '@mui/icons-material/KeyboardArrowDownRounded';
import KeyboardArrowUpRounded from '@mui/icons-material/KeyboardArrowUpRounded';
import { toShortAddress } from '../../utils/address';
import useLoader from '../../../hooks/useLoader';
import Loader from '../loader/Loader';
import CommentAction from './CommentAction';
import HiddenComponent from '../hidden-component/HiddenComponent';
import { useMyAddress } from '../../../store/features/myAccount/myAccountHooks';
import ReactMarkdown from 'react-markdown';
import { TypeContent } from 'src/models/common/button';
import EditComment from './EditComment';
import { useTranslation } from 'react-i18next';
import { upsertPost } from '../../../store/features/posts/postsSlice';

const Comment: FC<Omit<CommentProps, 'commentDetails'>> = ({ commentId }) => {
  const commentDetails = useSelectPost(commentId);

  if (!commentDetails || !commentDetails.post) return null;

  return <CommentView commentId={commentId} commentDetails={commentDetails} />;
};

const CommentView: FC<CommentProps> = ({ commentDetails }) => {
  const [isShowReply, setIsShowReply] = useState(false);
  const [isShowAllReplies, setIsShowAllReplies] = useState(false);
  const [isShowEditComment, setIsShowEditComment] = useState(false);
  const dispatch = useAppDispatch();
  const { isLoader, toggleLoader } = useLoader();
  const address = useMyAddress();
  const { api } = useApi();
  const { post: comment } = commentDetails;
  const profile = useSelectProfile(comment.struct.ownerId.toString());
  const { t } = useTranslation();
  const { visibleRepliesCount = 0 } =
    useSelectPost(comment.id)?.post.struct || {};
  const hasReplies = visibleRepliesCount > 0;

  useEffect(() => {
    toggleLoader();
    if (hasReplies) {
      dispatch(
        fetchPostReplyIds({ api: api, id: comment.id, myAddress: address })
      ).then(() => toggleLoader());
    }
  }, []);

  const { replyIds = [] } =
    useAppSelector(
      (state) => selectReplyIds(state, comment.id),
      shallowEqual
    ) || {};

  const commentStruct = asCommentStruct(comment.struct);

  const commentContent = comment.content as CommentContent;
  if (!comment) return null;

  const toggleReplies = () => setIsShowAllReplies((current) => !current);

  const onReply = () => setIsShowReply((current) => !current);

  const handleCancel = () => {
    setIsShowReply(false);
  };

  const addNewComment = (id: string) => {
    dispatch(
      upsertPost({
        ...comment.struct,
        repliesCount: visibleRepliesCount + 1,
      })
    );
    dispatch(
      upsertReplyIdsByPostId({ id: comment.id, replyIds: [id, ...replyIds] })
    );
    setIsShowAllReplies(true);
    if (isLoader) toggleLoader();
  };

  const toggleEdit = () => setIsShowEditComment((current) => !current);

  return isLoader && isShowAllReplies ? (
    <Loader label={t('content.loading')} />
  ) : isShowEditComment ? (
    <EditComment
      comment={comment as unknown as PostData}
      className={styles.new}
      autofocus
      onClickCancel={toggleEdit}
    />
  ) : (
    <Box className={styles.commentBox}>
      <Link
        href={getUrl({
          type: TypeUrl.Account,
          id: profile?.id || comment.struct.ownerId,
        })}
        image
      >
        <AvatarElement
          src={profile?.content?.image}
          size={AvatarSizes.SMALL}
          id={comment.struct.ownerId}
        />
      </Link>

      <div className={styles.commentContent}>
        {commentStruct.hidden && (
          <HiddenComponent data={comment} typeContent={TypeContent.Comment} />
        )}
        <Box className={styles.comment}>
          <div className={styles.details}>
            <div className={styles.leftPart}>
              <Link
                href={getUrl({
                  type: TypeUrl.Account,
                  id: comment.struct.ownerId,
                })}
              >
                <Title type={TitleSizes.PROFILE}>
                  {profile?.content?.name ||
                    toShortAddress(comment.struct.ownerId)}
                </Title>
              </Link>
              <span>&nbsp;·&nbsp;</span>
              <SmallLink
                href={getUrl({
                  type: TypeUrl.Comment,
                  subTitle: commentContent.body,
                  subId: commentStruct.id,
                })}
                className={styles.time}
              >
                <Text type={TextSizes.NORMAL}>
                  {DateService.getDate(commentStruct.createdAtTime)}
                </Text>
              </SmallLink>
            </div>

            <ButtonOptions
              className={styles.options}
              contentStruct={comment.struct}
              typeContent={TypeContent.Comment}
              withReactions
              withHidden
              onClickEdit={toggleEdit}
            />
          </div>
          <Text type={TextSizes.NORMAL}>
            <ReactMarkdown className={'markdown-body'}>
              {commentContent.body}
            </ReactMarkdown>
          </Text>
        </Box>

        <CommentAction onReply={onReply} comment={comment.struct} />

        {isShowReply && (
          <NewComment
            parentStruct={comment.struct}
            placeholder={t('forms.placeholder.addReply')}
            className={styles.new}
            autofocus
            onClickCancel={handleCancel}
            addNewComment={addNewComment}
          />
        )}
        {hasReplies && (
          <Box>
            <Text
              type={TextSizes.SECONDARY}
              className={styles.replies}
              onClick={toggleReplies}
              component={'button'}
            >
              {isShowAllReplies ? t('buttons.hide') : t('buttons.view')}{' '}
              {transformCount(visibleRepliesCount)}{' '}
              {t('plural.reply', { count: visibleRepliesCount || 0 })}
              {isShowAllReplies ? (
                <KeyboardArrowUpRounded />
              ) : (
                <KeyboardArrowDownRoundedIcon />
              )}
            </Text>

            {isShowAllReplies && (
              <>
                {replyIds.map((id) => (
                  <Comment commentId={id} key={id} />
                ))}
              </>
            )}
          </Box>
        )}
      </div>
    </Box>
  );
};

export default Comment;
