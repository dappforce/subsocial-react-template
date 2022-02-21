import { Story, Meta } from '@storybook/react';
import { ComponentProps } from 'react';
import File from 'src/components/common/file/File';
import { Container } from '@mui/material';
import { Box } from '@mui/system';

export default {
  component: File,
  title: 'Inputs/Image Loader',
  decorators: [
    (Story) => (
      <Container maxWidth={'md'}>
        <Box>
          <Story />
        </Box>
      </Container>
    ),
  ],
  argTypes: {
    className: {
      control: false,
    },
    setMbError: {
      control: false,
    },
    setCidImage: {
      control: false,
    },
    setImage: {
      control: false,
    },
  },
} as Meta;

const Template: Story<ComponentProps<typeof File>> = (args) => {
  return <File {...args} />;
};

export const Avatar = Template.bind({});
Avatar.args = {
  type: 'avatar',
};

export const AvatarWithImage = Template.bind({});
AvatarWithImage.args = {
  type: 'avatar',
  image: 'https://app.subsocial.network/ipfs/ipfs/QmZfJmzeEQfp1WW7AUGkNSW6AL8ibdvoEyhRZubc3sVL6L',
};

export const Image = Template.bind({});
Image.args = {
  type: 'image',
};

export const ImageWithImage = Template.bind({});
ImageWithImage.args = {
  type: 'image',
  image: 'https://app.subsocial.network/ipfs/ipfs/QmZfJmzeEQfp1WW7AUGkNSW6AL8ibdvoEyhRZubc3sVL6L',
};
