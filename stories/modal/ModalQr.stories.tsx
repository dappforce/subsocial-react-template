import { Story, Meta } from '@storybook/react';
import Qr from 'src/components/modal/modal-qr/ModalQr';
import { ComponentProps } from 'react';

export default {
  component: Qr,
  title: 'Modal/Modal Qr',
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
  },
} as Meta;

const Template: Story<ComponentProps<typeof Qr>> = (args) => {
  return <Qr {...args} />;
};

export const ModalQr = Template.bind({});
ModalQr.args = {
  open: true,
};
