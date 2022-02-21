import { Meta, Story } from '@storybook/react';
import React, { ComponentProps } from 'react';
import SelectSpaces from "src/components/common/select-spaces/SelectSpaces";
import { Box } from "@mui/system";
import { space, spaces } from "../mocked-data";
import { Container } from "@mui/material";


export default {
  component: SelectSpaces,
  title: 'Space/Space Select',
  decorators: [
    (Story) => (
      <Container maxWidth={'md'}>
        <Box sx={{ p: 2 }}>
          <Story />
        </Box>
      </Container>
    ),
  ],
  argTypes: {
    className: {
      control: {
        disable: true
      }
    }
  },
  args: {
    initialId: space.id,
    spaceIds: spaces.map(space => space.id),
  },
} as Meta;

const Template: Story<ComponentProps<typeof SelectSpaces>> = (args) => {
  return <SelectSpaces {...args} />;
};

export const SpaceSelect = Template.bind({});
