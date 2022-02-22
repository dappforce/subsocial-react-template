import { FC, useEffect } from 'react';
import { upsertManyProfiles } from 'src/store/features/profiles/profilesSlice';
import { upsertManyContent } from 'src/store/features/contents/contentsSlice';
import { Content } from 'src/store/app/helpers';
import { useAppDispatch } from 'src/store/app/store';
import { upsertManyPost } from 'src/store/features/posts/postsSlice';
import { upsertReplyIdsByPostId } from 'src/store/features/replies/repliesSlice';
import { upsertManySpace } from 'src/store/features/spaces/spacesSlice';
import { hiddenSpace, space, spaces } from './space';
import { comment, comments, reply } from './comment';
import { post, sharedPost, hiddenPost, sharedHiddenPost } from './posts';
import { profile } from './profile';
import { setMyAddress } from 'src/store/features/myAccount/myAccountSlice';
import { MY_ADDRESS } from './consts';
import { upsertMyReaction } from 'src/store/features/reactions/myPostReactionsSlice';
import { upsertFollowedSpaceIdsByAccount } from 'src/store/features/spaceIds/followedSpaceIdsSlice';

export const MockedData: FC = ({ children }) => {
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(upsertMyReaction({ id: `${MY_ADDRESS}-${post.id}`, reactionId: '138', kind: 'Downvote' }));
    dispatch(upsertMyReaction({ id: `${MY_ADDRESS}-${comment.id}`, reactionId: '139', kind: 'Upvote' }));
    dispatch(upsertFollowedSpaceIdsByAccount({ id: `${MY_ADDRESS}`, followedSpaceIds: [ space.id ] }));

    dispatch(setMyAddress(MY_ADDRESS));
    dispatch(upsertManyProfiles([ profile.struct ]));
    dispatch(upsertManyPost([
      ...comments.map(comment => comment.struct),
      reply.struct,
      post.struct,
      sharedPost.struct,
      hiddenPost.struct,
      sharedHiddenPost.struct
    ]));
    dispatch(upsertManySpace([ ...spaces.map(space => space.struct), hiddenSpace.struct ]));
    dispatch(upsertManyContent([
      profile.content,
      ...comments.map(comment => comment.content),
      reply.content,
      ...spaces.map(space => space.content),
      post.content,
      sharedPost.content,
      hiddenPost.content,
      sharedHiddenPost.content,
      hiddenSpace.content
    ] as Content[]));
    dispatch(upsertReplyIdsByPostId({ id: post.id, replyIds: [ ...comments.map(comment => comment.id) ] }));
    dispatch(upsertReplyIdsByPostId({ id: comment.id, replyIds: [ reply.id ] }));
  }, []);

  return (
    <div>{children}</div>
  );
};
