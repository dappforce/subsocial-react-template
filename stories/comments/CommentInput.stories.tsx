import { Meta, Story } from '@storybook/react';
import NewComment from 'src/components/common/comments/NewComment';
import { Box } from '@mui/system';
import React, { ComponentProps } from 'react';
import { post } from '../mocked-data';

export default {
  component: NewComment,
  title: 'Comments/Comment Input',
  decorators: [
    (Story) => (
      <Box sx={{ p: 2 }}>
        <Story />
      </Box>
    ),
  ],
  argTypes: {
    addNewComment: {
      control: false
    },
    className: {
      control: false
    },
    onClickCancel: {
      control: false
    }
  },
  args: {
    placeholder: 'Add a comment',
    autofocus: true,
    parentStruct: post.struct
  }
} as Meta;

const TemplateNewComment: Story<ComponentProps<typeof NewComment>> = (args) => (
  <NewComment {...args} />
);

export const CommentInput = TemplateNewComment.bind({});
