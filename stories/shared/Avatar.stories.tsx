import { Meta, Story } from '@storybook/react';
import AvatarElement from 'src/components/common/avatar/AvatarElement';
import { AvatarSizes } from 'src/models/common/avatar';
import { ComponentProps } from 'react';

export default {
  component: AvatarElement,
  title: 'Shared/Avatar',
  argTypes: {
    size: {
      options: Object.keys(AvatarSizes).filter(size => !Number(size)),
      mapping: AvatarSizes,
      control: {
        type: 'select',
      },
      defaultValue: AvatarSizes.MEDIUM
    },
  },
  args: {
    size: AvatarSizes.LARGE,
    id: '3oGmzsdeGToQxtNbNrNYVP1mYVza5J2k9foBXav6WdbQTZqF',
  }
} as Meta;

const Template: Story<ComponentProps<typeof AvatarElement>> = (args) => {
  return <AvatarElement {...args} />;
};

export const Avatar = Template.bind({});
Avatar.args = {
  src: 'QmPK7VRmMmTdyq1bKRNvYd3CFfp1xAGi3VuBD1kfdUNZx2'
};

export const AvatarWithoutImage = Template.bind({});
AvatarWithoutImage.argTypes = {
  src: {
    control: {
      disable: true,
    }
  },
};
