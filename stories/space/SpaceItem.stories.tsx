import { Meta } from '@storybook/react';
import { Space as SpaceComponent } from 'src/components/space/space-item/Space';
import React from 'react';
import { space } from '../mocked-data';
import { Container } from '@mui/material';


export default {
  component: SpaceComponent,
  title: 'Space/Space Item',
  decorators: [
    (Story) => (
      <Container maxWidth={'md'}>
        <Story />
      </Container>
    ),
  ],
} as Meta;

export const SpaceItem = () => <SpaceComponent id={space.id} />;
