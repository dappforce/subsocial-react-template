import { Story, Meta } from '@storybook/react';
import { ComponentProps } from 'react';
import BalanceComponent from 'src/components/common/balance/Balance';


export default {
  component: BalanceComponent,
  title: 'Shared/Tokens',
  argTypes: {
    className: {
      control: {
        disable: true
      }
    },
  },
  args: {
    isIcon: false,
    address: '3qis9Gqjw9jiXHDCWfCYApsQ5TNNYkHhAdzhEzLgNXVPjkK9',
  }
} as Meta;

const Template: Story<ComponentProps<typeof BalanceComponent>> = (args) => {
  return <BalanceComponent {...args} />;
};

export const Tokens = Template.bind({});
