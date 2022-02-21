import { Meta, Story } from '@storybook/react'
import TagComponent from '../../src/components/common/tag/Tag'
import { ComponentProps } from "react";

export default {
  component: TagComponent,
  title: 'Inputs/Tag',
  argTypes: {
    label: {
      type: 'string'
    },
    avatar: {
      control: false,
    },
    children: {
      control: false,
    },
    classes: {
      control: false,
    },
    color: {
      control: false,
    },
    deleteIcon: {
      control: false,
    },
    clickable: {
      control: false,
    },
    disabled: {
      control: false,
    },
    icon: {
      control: false,
    },
    onDelete: {
      control: false,
    },
    sx: {
      control: false,
    },
    variant: {
      control: false,
    },
    ref: {
      control: false,
    },
  },
  args: {
    label: 'subsocial',
    size: 'medium',
  }
} as Meta

const Template: Story<ComponentProps<typeof TagComponent>> = (arg) => {
  return <TagComponent {...arg} />;
};

export const Tag = Template.bind({});
