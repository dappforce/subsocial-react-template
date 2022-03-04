import { Story, Meta } from '@storybook/react';
import SharePost from 'src/components/modal/modal-create-shared-post/ModalCreateSharedPost';
import { ComponentProps } from 'react';
import { post } from '../mocked-data/posts';

export default {
  component: SharePost,
  title: 'Modal/Modal Share Post',
  argTypes: {
    children: {
      control: {
        disable: true,
      },
    },
  },
} as Meta;

const Template: Story<ComponentProps<typeof SharePost>> = (args) => {
  return <SharePost {...args} />;
};

export const ModalSharePost = Template.bind({});
ModalSharePost.args = {
  open: true,
  postId: post.id,
};
