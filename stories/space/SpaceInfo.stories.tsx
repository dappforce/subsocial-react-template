import { Meta, Story } from '@storybook/react';
import SpaceInfoComponent from 'src/components/space/space-item/SpaceInfo';
import React, { ComponentProps } from 'react';
import { space } from "../mocked-data";
import { SpaceWithSomeDetails } from "@subsocial/types/dto";
import { Container } from "@mui/material";


export default {
  component: SpaceInfoComponent,
  title: 'Space/Space Info',
  decorators: [
    (Story) => (
      <Container maxWidth={'md'}>
        <Story />
      </Container>
    ),
  ],
  args: {
    spaceData: space as unknown as SpaceWithSomeDetails
  }
} as Meta;

const Template: Story<ComponentProps<typeof SpaceInfoComponent>> = (args) => {
  return <SpaceInfoComponent {...args} />;
};

export const SpaceInfo = Template.bind({});
