import { Meta, Story } from '@storybook/react';
import { profile } from '../mocked-data';
import { SwitchAccountsExtensionItem } from 'src/components/switch-account/SwitchAccountsExtension';
import { Container, List } from '@mui/material';
import React, { ComponentProps } from 'react';
import { Box } from '@mui/system';

export default {
  component: SwitchAccountsExtensionItem,
  title: 'Profile/Account List/Account Switch List Item',
  decorators: [
    (Story) => (
      <Container maxWidth={'md'}>
        <Box>
          <List>
            <Story />
          </List>
        </Box>
      </Container>
    ),
  ],
  args: {
    address: profile.id,
    name: 'Subsocial user'
  }
} as Meta;

const Template: Story<ComponentProps<typeof SwitchAccountsExtensionItem>> = (args) => {
  return <SwitchAccountsExtensionItem {...args} />;
};

export const AccountSwitchListItem = Template.bind({});


