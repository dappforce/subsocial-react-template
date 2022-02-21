import { Meta, Story } from '@storybook/react';
import React, { ComponentProps } from 'react';
import HiddenComponent from 'src/components/common/hidden-component/HiddenComponent';
import { comment, post, space } from '../mocked-data';
import { TypeContent } from 'src/models/common/button';
import { PostData, SpaceData } from '@subsocial/types/dto';

export default {
  component: HiddenComponent,
  title: 'Content/Hidden Content',
} as Meta;

const Template: Story<ComponentProps<typeof HiddenComponent>> = (args) => {
  return <HiddenComponent {...args} />;
};

export const HiddenPost = Template.bind({});
HiddenPost.args = {
  data: post as unknown as PostData,
  typeContent: TypeContent.Post
};

export const HiddenSpace = Template.bind({});
HiddenSpace.args = {
  data: space as unknown as SpaceData,
  typeContent: TypeContent.Space
};

export const HiddenComment = Template.bind({});
HiddenComment.args = {
  data: comment as unknown as SpaceData,
  typeContent: TypeContent.Comment
};
