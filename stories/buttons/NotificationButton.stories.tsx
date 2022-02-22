import { Meta, Story } from '@storybook/react';
import ButtonNotification from 'src/components/common/button/button-notification/ButtonNotification';
import { ComponentProps } from 'react';

export default {
  component: ButtonNotification,
  title: 'Buttons/Notification Button',
  args: {
    value: 10
  }
} as Meta;

const Template: Story<ComponentProps<typeof ButtonNotification>> = (args) => {
  return <ButtonNotification {...args} />;
};

export const NotificationButton = Template.bind({});
