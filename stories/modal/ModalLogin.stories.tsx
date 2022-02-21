import { Story, Meta } from '@storybook/react';
import ModalSignIn from 'src/components/modal/modal-sign-in/ModalSignIn';
import { ComponentProps } from 'react';
import { ACCOUNT_STATUS } from 'src/models/auth';

export default {
  component: ModalSignIn,
  title: 'Modal/Modal Login',
  argTypes: {
    children: {
      control: {
        disable: true,
      },
    },
    classes: {
      control: {
        disable: true,
      },
    },
    BackdropComponent: {
      control: {
        disable: true,
      },
    },
    BackdropProps: {
      control: {
        disable: true,
      },
    },
    sx: {
      control: {
        disable: true,
      },
    },
    closeAfterTransition: {
      control: {
        disable: true,
      },
    },
    components: {
      control: {
        disable: true,
      },
    },
    componentsProps: {
      control: {
        disable: true,
      },
    },
    container: {
      control: {
        disable: true,
      },
    },
    disableAutoFocus: {
      control: {
        disable: true,
      },
    },
    disableEnforceFocus: {
      control: {
        disable: true,
      },
    },
    disableEscapeKeyDown: {
      control: {
        disable: true,
      },
    },
    disablePortal: {
      control: {
        disable: true,
      },
    },
    disableRestoreFocus: {
      control: {
        disable: true,
      },
    },
    disableScrollLock: {
      control: {
        disable: true,
      },
    },
    hideBackdrop: {
      control: {
        disable: true,
      },
    },
    keepMounted: {
      control: {
        disable: true,
      },
    },
    onBackdropClick: {
      control: {
        disable: true,
      },
    },
    isAlert: {
      control: {
        disable: true,
      },
    },
    status: {
      control: {
        disable: true,
      },
    },
  },
} as Meta;

const Template: Story<ComponentProps<typeof ModalSignIn>> = (args) => {
  return <ModalSignIn {...args} />;
};

export const ModalLogin = Template.bind({});
ModalLogin.args = {
  open: true,
  status: ACCOUNT_STATUS.EXTENSION_NOT_FOUND,
};
