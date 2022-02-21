import { Meta, Story } from '@storybook/react';
import React, { ComponentProps } from 'react';
import EmptyComponent from 'src/components/common/empty/EmptyComponent';

export default {
  component: EmptyComponent,
  title: 'Content/No Content',
  args: {
    text: 'Posts not found'
  }
} as Meta;

const Template: Story<ComponentProps<typeof EmptyComponent>> = (args) => {
  return <EmptyComponent {...args} />;
};

export const NoContent = Template.bind({});
