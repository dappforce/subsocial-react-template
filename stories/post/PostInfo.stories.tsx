import { Meta, Story } from '@storybook/react';
import { Container } from '@mui/material';
import React, { ComponentProps } from 'react';
import { profile, space, post } from '../mocked-data';
import PostInfoComponent from 'src/components/post/post-item/PostInfo';
import { Box } from '@mui/system';

export default {
  component: PostInfoComponent,
  title: 'Post/Post Info',
  decorators: [
    (Story) => (
      <Container maxWidth={'md'}>
        <Box sx={{ px: 2 }}>
          <Story />
        </Box>
      </Container>
    ),
  ],
  args: {
    post: post,
    space: space,
    profile: profile
  }
} as Meta;

const Template: Story<ComponentProps<typeof PostInfoComponent>> = (arg) => {
  return <PostInfoComponent {...arg} />;
};

export const PostInfo = Template.bind({});
