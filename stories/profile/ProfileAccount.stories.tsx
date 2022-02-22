import { Meta, Story } from '@storybook/react';
import ProfileAccountComponent from 'src/components/profile/profile-account/ProfileAccount';
import React, { ComponentProps } from 'react';
import { profile } from '../mocked-data';

export default {
  component: ProfileAccountComponent,
  title: 'Profile/Profile Account',
  decorators: [
    (Story) => (
      <Story />
    ),
  ],
  args: {
    ...profile,
    activeTab: 'userPosts'
  }
} as Meta;

const Template: Story<ComponentProps<typeof ProfileAccountComponent>> = (args) => {
  return <ProfileAccountComponent {...args} />;
};

export const ProfileAccount = Template.bind({});
