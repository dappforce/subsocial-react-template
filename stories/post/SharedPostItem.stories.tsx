import { Story, Meta } from '@storybook/react';
import { ComponentProps } from 'react';
import Post from '../../src/components/post/post-item/Post';
import { sharedHiddenPost, sharedPost } from "../mocked-data";

export default {
  component: Post,
  title: 'Post/Shared Post Item',
  argTypes: {
    className: {
      control: false,
    },
  },
  args: {
    isShowActions: true,
    withSpace: true,
  },
} as Meta;

const Template: Story<ComponentProps<typeof Post>> = (arg) => {
  return <Post {...arg} />;
};

export const SharedPostItem = Template.bind({});
SharedPostItem.args = {
  postId: sharedPost.id,
};

export const HiddenSharedPostItem = Template.bind({});
HiddenSharedPostItem.args = {
  postId: sharedHiddenPost.id,
}
