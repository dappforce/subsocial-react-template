import { Meta, Story } from '@storybook/react';
import { ComponentProps } from 'react';
import ButtonSignOut from 'src/components/common/button/button-sign-out/ButtonSignOut';

export default {
  component: ButtonSignOut,
  title: 'Buttons/Sign Out Button',
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
  }
} as Meta;

const Template: Story<ComponentProps<typeof ButtonSignOut>> = (args) => {
  return <ButtonSignOut {...args} />;
};

export const SignOutButton = Template.bind({});
