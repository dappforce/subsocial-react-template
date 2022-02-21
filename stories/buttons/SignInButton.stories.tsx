import { Meta, Story } from '@storybook/react';
import { ComponentProps } from 'react';
import ButtonSignIn from 'src/components/common/button/button-sign-in/ButtonSignIn';

export default {
  component: ButtonSignIn,
  title: 'Buttons/Profile Button/Sign In Button',
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

const Template: Story<ComponentProps<typeof ButtonSignIn>> = (args) => {
  return <ButtonSignIn {...args} />;
};

export const SignInButton = Template.bind({});
