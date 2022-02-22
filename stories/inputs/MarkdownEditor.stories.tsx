import { Story, Meta } from '@storybook/react';
import { ComponentProps } from 'react';
import Editor from "../../src/components/common/editor/Editor";
import { Box } from '@mui/system';
import { Container } from '@mui/material';

export default {
  component: Editor,
  title: 'Inputs/Markdown Editor',
  decorators: [
    (Story) => (
      <Container maxWidth={'md'}>
        <Box sx={{ p: 2 }}>
          <Story />
        </Box>
      </Container>
    )
  ],
  argType: {
    onChange: {
      control: false,
    },
  },
  args: {
    toolbar: true,
    placeholder: 'Placeholder',
    autofocus: true,
  }
} as Meta;

const Template: Story<ComponentProps<typeof Editor>> = (arg) => {
  return <Editor {...arg} />;
}

export const MarkdownEditor = Template.bind({});

