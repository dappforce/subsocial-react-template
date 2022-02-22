import { Story, Meta } from '@storybook/react';
import SendTips from 'src/components/modal/modal-send-tips/ModalSendTips';
import { ComponentProps } from 'react';

export default {
  component: SendTips,
  title: 'Modal/Modal Send Tips',
  argTypes: {
    children: {
      control: {
        disable: true,
      },
    },
  },
} as Meta;

const Template: Story<ComponentProps<typeof SendTips>> = (args) => {
  return <SendTips {...args} />;
};

export const ModalSendTips = Template.bind({});
ModalSendTips.args = {
  open: true,
  ownerId: '3oGmzsdeGToQxtNbNrNYVP1mYVza5J2k9foBXav6WdbQTZqF',
};
