import { CardContent } from '@mui/material';
import styles from './Comments.module.sass';
import Comment from './Comment';
import CardWrapper from '../card-wrapper/CardWrapper';
import NewComment from './NewComment';
import { FC, useEffect } from 'react';
import { useAppDispatch, useAppSelector } from 'src/rtk/app/store';
import {
  fetchPostReplyIds,
  selectReplyIds,
} from 'src/rtk/features/replies/repliesSlice';
import { shallowEqual } from 'react-redux';
import Title from '../title/Title';
import { TitleSizes } from 'src/models/common/typography';
import { pluralize } from '@subsocial/utils';
import { useApi } from '../../api';
import { CommentsProps } from 'src/models/comments';
import { Box } from '@mui/system';
import useLoader from '../../../hooks/useLoader';
import Loader from '../loader/Loader';
import { useMyAddress } from 'src/rtk/features/myAccount/myAccountHooks';

const Comments: FC<CommentsProps> = ({ parentStruct }) => {
  const { id: parentId, visibleRepliesCount } = parentStruct;
  const dispatch = useAppDispatch();
  const { replyIds = [] } =
    useAppSelector((state) => selectReplyIds(state, parentId), shallowEqual) ||
    {};
  const { api } = useApi();
  const address = useMyAddress();
  const { isLoader, toggleLoader } = useLoader();

  useEffect(() => {
    toggleLoader();
    dispatch(
      fetchPostReplyIds({ api: api, id: parentId, myAddress: address })
    ).then(() => toggleLoader());
  }, []);

  return (
    <CardWrapper>
      <CardContent>
        <Title type={TitleSizes.PREVIEW} className={styles.title}>
          {pluralize({
            count: visibleRepliesCount,
            singularText: 'comment',
            pluralText: 'comments',
          })}
        </Title>
        <NewComment
          parentStruct={parentStruct}
          placeholder={'Add a comment...'}
        />
        {isLoader ? (
          <Loader label={'Loading...'} />
        ) : (
          !!replyIds.length && (
            <Box className={styles.commentsBox}>
              {replyIds.map((id) => (
                <Comment commentId={id} key={id} />
              ))}
            </Box>
          )
        )}
      </CardContent>
    </CardWrapper>
  );
};

export default Comments;
