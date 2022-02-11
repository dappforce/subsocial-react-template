import { CardContent } from '@mui/material';
import styles from './Comments.module.sass';
import Comment from './Comment';
import CardWrapper from '../card-wrapper/CardWrapper';
import NewComment from './NewComment';
import { FC, useEffect, useState } from 'react';
import { useAppDispatch, useAppSelector } from 'src/rtk/app/store';
import {
  fetchPostReplyIds,
  selectReplyIds,
} from 'src/rtk/features/replies/repliesSlice';
import { shallowEqual } from 'react-redux';
import Title from '../title/Title';
import { TitleSizes } from 'src/models/common/typography';
import { useApi } from '../../api';
import { CommentsProps } from 'src/models/comments';
import { Box } from '@mui/system';
import useLoader from '../../../hooks/useLoader';
import Loader from '../loader/Loader';
import { useMyAddress } from 'src/rtk/features/myAccount/myAccountHooks';
import { useTranslation } from 'react-i18next';
import { transformCount } from "../../../utils";
import { fetchPosts } from "../../../rtk/features/posts/postsSlice";

const Comments: FC<CommentsProps> = ({ parentStruct }) => {
  const { id: parentId, visibleRepliesCount } = parentStruct;
  const dispatch = useAppDispatch();
  const { replyIds = [] } =
    useAppSelector((state) => selectReplyIds(state, parentId), shallowEqual) ||
    {};
  const { api } = useApi();
  const address = useMyAddress();
  const { isLoader, toggleLoader } = useLoader();
  const { t } = useTranslation();
  const [newCommentId, setNewCommentId] = useState('');

  const addNewComment = (id: string) => {
    setNewCommentId(id)
  }

  useEffect(() => {
    toggleLoader();
    dispatch(
      fetchPostReplyIds({ api: api, id: parentId, myAddress: address })
    ).then(() => toggleLoader());
  }, []);

  useEffect(() => {
    dispatch(fetchPosts({ ids: [newCommentId], api }))
  }, [newCommentId]);

  return (
    <CardWrapper className={styles.wrapper}>
      <CardContent>
        <Title type={TitleSizes.PREVIEW} className={styles.title}>
          {transformCount(visibleRepliesCount + (newCommentId ? 1 : 0))}
          {' '}
          {t('plural.comment', { count: visibleRepliesCount + (newCommentId ? 1 : 0) })}
        </Title>
        <NewComment
          parentStruct={parentStruct}
          placeholder={t('forms.placeholder.addComment')}
          addNewComment={addNewComment}
        />
        {isLoader ? (
          <Loader label={t('content.loading')} />
        ) : (
          <>
            {newCommentId && <Comment commentId={newCommentId} key={newCommentId} /> }
            {!!replyIds.length && (
              <Box className={styles.commentsBox}>
                {replyIds.map((id) => (
                  <Comment commentId={id} key={id}/>
                ))}
              </Box>
            )}
          </>
        )}
      </CardContent>
    </CardWrapper>
  );
};

export default Comments;
