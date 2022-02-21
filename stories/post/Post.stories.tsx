import { Meta, Story } from '@storybook/react';
import Post from 'src/components/post/post-item/Post';
import { ComponentProps } from 'react';
import { post } from "../mocked-data";

export default {
  component: Post,
  title: 'Post/Post Item',
  argTypes: {
    className: {
      control: false,
    }
  },
  args: {
    postId: post.id,
    isShowActions: true,
    withSpace: true,
  },
} as Meta;

const Template: Story<ComponentProps<typeof Post>> = (arg) => {
  return <Post {...arg} />;
}

export const PostItem = Template.bind({});
