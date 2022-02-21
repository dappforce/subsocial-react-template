import { Story, Meta } from '@storybook/react';
import { ComponentProps } from 'react';
import TagsInputComponent from '../../src/components/common/inputs/tags-input/TagsInput';
import { Box } from '@mui/system';
import { Container } from '@mui/material';

export default {
  component: TagsInputComponent,
  title: 'Inputs/Tag Input',
  decorators: [
    (Story) => (
      <Container maxWidth={'md'}>
        <Box sx={{ p: 2 }}>
          <Story />
        </Box>
      </Container>
    )
  ],
  argTypes: {
    setTags: {
      control: false,
    },
    className: {
      control: false,
    },
    placeholder: {
      table: {
        disable: true,
      }
    },
  },
  args: {
    tags: ['subsocial', 'polkadot'],
  }
} as Meta;

const Template: Story<ComponentProps<typeof TagsInputComponent>> = (args) => {
  return <TagsInputComponent {...args} />
};

export const TagInput = Template.bind({})

