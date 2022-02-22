import { Meta } from '@storybook/react';
import VoteUserItemComponent from 'src/components/common/vote-user-item/VoteUserItem';
import { profile } from '../mocked-data';
import { Container, List } from '@mui/material';
import React from 'react';
import { Box } from '@mui/system';

export default {
  component: VoteUserItemComponent,
  title: 'Profile/Account List/Account List Item',
  decorators: [
    (Story) => (
      <Container maxWidth={'md'}>
        <Box maxWidth={700}>
          <List>
            <Story />
          </List>
        </Box>
      </Container>
    ),
  ],
} as Meta;

export const AccountListItem = () => <VoteUserItemComponent id={profile.id} />;
