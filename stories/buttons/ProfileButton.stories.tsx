import { Meta, Story } from '@storybook/react';
import { ComponentProps } from 'react';
import { MY_ADDRESS } from '../mocked-data';
import ButtonProfile from 'src/components/common/button/button-profile/ButtonProfile';

export default {
  component: ButtonProfile,
  title: 'Buttons/Profile Button/Profile Button',
  argTypes: {
    children: {
      control: {
        disable: true
      }
    },
    classes: {
      control: {
        disable: true
      }
    },
    color: {
      control: {
        disable: true
      }
    },
    disableFocusRipple: {
      control: {
        disable: true
      }
    },
    edge: {
      control: {
        disable: true
      }
    },
    size: {
      control: {
        disable: true
      }
    },
    action: {
      control: {
        disable: true
      }
    },
    LinkComponent: {
      control: {
        disable: true
      }
    },
    onFocusVisible: {
      control: {
        disable: true
      }
    },
    TouchRippleProps: {
      control: {
        disable: true
      }
    },
    focusVisibleClassName: {
      control: {
        disable: true
      }
    },
    className: {
      control: {
        disable: true
      }
    },
    ref: {
      control: {
        disable: true
      }
    },
    href: {
      control: {
        disable: true
      }
    },
    endIcon: {
      control: {
        disable: true
      }
    },
    onClick: {
      control: {
        disabled: true
      }
    },
  },
  args: {
    address: MY_ADDRESS,
    name: 'Subsocial User'
  }
} as Meta;

const Template: Story<ComponentProps<typeof ButtonProfile>> = (args) => {
  return <ButtonProfile {...args} />;
};

export const ProfileButton = Template.bind({});
