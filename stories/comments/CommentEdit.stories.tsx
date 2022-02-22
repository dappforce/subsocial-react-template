import { Meta, Story } from '@storybook/react';
import { Box } from '@mui/system';
import React, { ComponentProps } from 'react';
import { comment } from '../mocked-data';
import EditComment from 'src/components/common/comments/EditComment';
import { PostData } from '@subsocial/types/dto';

export default {
  component: EditComment,
  title: 'Comments/Comment Item',
  decorators: [
    (Story) => (
      <Box sx={{ p: 2 }}>
        <Story />
      </Box>
    ),
  ],
  argTypes: {
    className: {
      control: false
    },
    onClickCancel: {
      control: false,
    }
  },
  args: {
    comment: comment as unknown as PostData,
    autofocus: true,
  }
} as Meta;

const TemplateCommentEdit: Story<ComponentProps<typeof EditComment>> = (args) => (
  <EditComment {...args} />
);

export const Edit = TemplateCommentEdit.bind({});
