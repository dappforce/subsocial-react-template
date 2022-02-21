import { Meta } from '@storybook/react';
import React from 'react';
import { post } from '../mocked-data';
import Comments from 'src/components/common/comments/Comments';

export default {
  component: Comments,
  title: 'Comments/Comment List',
} as Meta;

export const CommentList = () => <Comments parentStruct={post.struct} />;
