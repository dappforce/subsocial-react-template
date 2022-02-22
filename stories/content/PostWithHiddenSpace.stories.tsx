import { Meta, Story } from '@storybook/react';
import React, { ComponentProps } from 'react';
import { postWithHiddenPost } from '../mocked-data';
import { PostData } from '@subsocial/types/dto';
import SpaceHiddenComponent from 'src/components/common/space-hidden-component/SpaceHiddenComponent';

export default {
  component: SpaceHiddenComponent,
  title: 'Content/Hidden Content',
  args: {
    content: postWithHiddenPost as unknown as PostData
  }
} as Meta;

const Template: Story<ComponentProps<typeof SpaceHiddenComponent>> = (args) => {
  return <SpaceHiddenComponent {...args} />;
};

export const PostWithHiddenSpace = Template.bind({});
