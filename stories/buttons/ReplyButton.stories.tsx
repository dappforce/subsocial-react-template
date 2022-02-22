import { Meta, Story } from '@storybook/react';
import ButtonReply from 'src/components/common/button/ButtonReply';
import { ComponentProps } from 'react';

export default {
  component: ButtonReply,
  title: 'Buttons/Reply Button',
  args: {
    withLabel: true
  }
} as Meta;

const Template: Story<ComponentProps<typeof ButtonReply>> = (args) => {
  return <ButtonReply {...args} />;
};

export const ReplyButton = Template.bind({});
