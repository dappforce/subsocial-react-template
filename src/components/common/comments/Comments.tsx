import { CardContent } from '@mui/material';
import styles from './Comments.module.sass';
import Comment from './Comment';
import CardWrapper from '../card-wrapper/CardWrapper';
import NewComment from './NewComment';
import { FC, useEffect } from 'react';
import { useAppDispatch, useAppSelector } from 'src/store/app/store';
import {
  fetchPostReplyIds,
  selectReplyIds,
  upsertReplyIdsByPostId,
} from 'src/store/features/replies/repliesSlice';
import { shallowEqual } from 'react-redux';
import Title from '../title/Title';
import { TitleSizes } from 'src/models/common/typography';
import { useApi } from '../../api';
import { CommentsProps } from 'src/models/comments';
import { Box } from '@mui/system';
import useLoader from '../../../hooks/useLoader';
import Loader from '../loader/Loader';
import { useMyAddress } from 'src/store/features/myAccount/myAccountHooks';
import { useTranslation } from 'react-i18next';
import { transformCount } from "../../../utils";
import { upsertPost } from "../../../store/features/posts/postsSlice";
import { useSelectPost } from "../../../store/features/posts/postsHooks";

const Comments: FC<CommentsProps> = ({ parentStruct }) => {
  const { id: parentId } = parentStruct;
  const { visibleRepliesCount = 0} = useSelectPost(parentId)?.post.struct || {}
  const dispatch = useAppDispatch();
  const { replyIds = [] } =
    useAppSelector((state) => selectReplyIds(state, parentId), shallowEqual) ||
    {};
  const { api } = useApi();
  const address = useMyAddress();
  const { isLoader, toggleLoader } = useLoader();
  const { t } = useTranslation();

  const addNewComment = (id: string) => {
    dispatch(upsertPost({...parentStruct, repliesCount: visibleRepliesCount + 1 }))
    dispatch(upsertReplyIdsByPostId({id: parentId, replyIds: [id, ...replyIds]}))
  }

  useEffect(() => {
    toggleLoader();
    dispatch(
      fetchPostReplyIds({ api: api, id: parentId, myAddress: address })
    ).then(() => toggleLoader());
  }, []);

  return (
    <CardWrapper className={styles.wrapper}>
      <CardContent>
        <Title type={TitleSizes.PREVIEW} className={styles.title}>
          {transformCount(visibleRepliesCount)}
          {' '}
          {t('plural.comment', { count: visibleRepliesCount })}
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
