import { Meta, Story } from '@storybook/react';
import Comment from 'src/components/common/comments/Comment';
import { Box } from '@mui/system';
import React from 'react';
import { comment } from '../mocked-data';

export default {
  component: Comment,
  title: 'Comments/Comment Item',
  decorators: [
    (Story) => (
      <Box sx={{ p: 2 }}>
        <Story />
      </Box>
    ),
  ],
} as Meta;

export const Default = () => <Comment commentId={comment.id} />;
