import { Meta, Story } from '@storybook/react';
import ButtonShareComponent from 'src/components/common/button/button-share/ButtonShare';
import { ComponentProps } from 'react';

export default {
  component: ButtonShareComponent,
  title: 'Buttons/Shared Button',
  argTypes: {
    onClick: {
      control: {
        disable: true
      }
    },
  },
  args: {
    isShowLabel: false,
    value: 0
  }
} as Meta;

const Template: Story<ComponentProps<typeof ButtonShareComponent>> = (args) => {
  return <ButtonShareComponent {...args} />;
};

export const SharedButton = Template.bind({});
