import { Story, Meta } from '@storybook/react';
import React, { ComponentProps } from 'react';
import AddressComponent from 'src/components/common/address/Address';
import { MY_ADDRESS } from '../mocked-data';
import { Box } from '@mui/system';

export default {
  component: AddressComponent,
  title: 'Shared/Address',
  decorators: [
    (Story) => (
      <Box sx={{ p: 2 }}>
        <Story />
      </Box>
    ),
  ],
  argTypes: {
    className: {
      control: {
        disable: true
      }
    },
    size: {
      options: [ 'sm', 'lg' ]
    }
  },
  args: {
    lengthOfAddress: 12,
    isCopy: true,
    isIcon: false,
    size: 'sm',
    isQr: false,
    label: MY_ADDRESS,
    isShort: true,
  }
} as Meta;

const Template: Story<ComponentProps<typeof AddressComponent>> = (args) => {
  return <AddressComponent {...args} />;
};

export const Address = Template.bind({});
