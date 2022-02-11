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
import { CommentContent } from '@subsocial/api/flat-subsocial/dto';
import { useSelectPost } from 'src/rtk/features/posts/postsHooks';
import { asCommentStruct } from '@subsocial/api/flat-subsocial/flatteners';
import { useSelectProfile } from 'src/rtk/features/profiles/profilesHooks';
import { getTime, getUrl, transformCount, TypeUrl } from 'src/utils';
import Text from '../text/Text';
import { CommentProps } from 'src/models/comments';
import {
  fetchPostReplyIds,
  selectReplyIds,
} from 'src/rtk/features/replies/repliesSlice';
import { useApi } from '../../api';
import { shallowEqual } from 'react-redux';
import { useAppDispatch, useAppSelector } from 'src/rtk/app/store';
import KeyboardArrowDownRoundedIcon from '@mui/icons-material/KeyboardArrowDownRounded';
import KeyboardArrowUpRounded from '@mui/icons-material/KeyboardArrowUpRounded';
import { toShortAddress } from '../../utils/address';
import useLoader from '../../../hooks/useLoader';
import Loader from '../loader/Loader';
import CommentAction from './CommentAction';
import HiddenComponent from '../hidden-component/HiddenComponent';
import { useMyAddress } from '../../../rtk/features/myAccount/myAccountHooks';
import ReactMarkdown from 'react-markdown';
import { TypeContent } from 'src/models/common/button';
import EditComment from './EditComment';
import { PostData } from '@subsocial/types';
import { useTranslation } from 'react-i18next';
import { fetchPosts } from "../../../rtk/features/posts/postsSlice";

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
  const hasReplies = comment?.struct.visibleRepliesCount > 0;
  const profile = useSelectProfile(comment.struct.ownerId.toString());
  const { t } = useTranslation();
  const [newCommentId, setNewCommentId] = useState('');

  const addNewComment = (id: string) => {
    setNewCommentId(id)
  }

  useEffect(() => {
    toggleLoader();
    if (hasReplies) {
      dispatch(
        fetchPostReplyIds({ api: api, id: comment.id, myAddress: address })
      ).then(() => toggleLoader());
    }
  }, []);

  useEffect(() => {
    dispatch(fetchPosts({ ids: [newCommentId], api }))
  }, [newCommentId]);

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
          src={profile?.content?.avatar}
          size={AvatarSizes.MEDIUM}
          id={comment.struct.ownerId}
        />
      </Link>

      <div className={styles.commentContent}>
        {commentStruct.hidden && (
          <HiddenComponent data={comment} typeContent={TypeContent.Comment} />
        )}
        <Box className={styles.comment}>
          <div className={styles.details}>
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
                {getTime(commentStruct.createdAtTime)}
              </Text>
            </SmallLink>
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
              {isShowAllReplies ? t('buttons.hide') : t('buttons.view')}
              {' '}
              {transformCount(comment?.struct.visibleRepliesCount + (newCommentId ? 1 : 0))}
              {' '}
              {t('plural.reply', { count: comment?.struct.visibleRepliesCount || 0  + (newCommentId ? 1 : 0)})}
              {isShowAllReplies ? (
                <KeyboardArrowUpRounded />
              ) : (
                <KeyboardArrowDownRoundedIcon />
              )}
            </Text>

            {isShowAllReplies && <>
              <Comment commentId={newCommentId} key={newCommentId} />
              {replyIds.map((id) => <Comment commentId={id} key={id}/>)}
            </>}
          </Box>
        )}
      </div>
    </Box>
  );
};

export default Comment;
