import { Story, Meta } from '@storybook/react';
import { ComponentProps } from 'react';
import InputComponent from 'src/components/common/inputs/input/Input';
import { Container } from '@mui/material';
import { Box } from '@mui/system';

export default {
  component: InputComponent,
  title: 'Inputs/Text Input',
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
    isError: {
      type: 'boolean',
    },
    value: {
      control: false,
    },
    onChange: {
      control: false,
    },
    isMultiline: {
      control: false,
    },
    onKeyDown: {
      control: false,
    },
    onKeyUp: {
      control: false,
    },
    InputProps: {
      control: false,
    },
    defaultValue: {
      control: false,
    },
    minRows: {
      control: false,
    },
  },
  args: {
    label: 'Text input',
    isRequired: true,
    isError: false,
    errorText: '',
    placeholder: '',
  }
} as Meta;

const Template: Story<ComponentProps<typeof InputComponent>> = (args) => {
  return <InputComponent {...args} />;
};

export const TextInput = Template.bind({});
export const TextInputError = Template.bind({});
TextInputError.args = {
  errorText: 'Field is required',
  isError: true,
};
