import { Story, Meta } from '@storybook/react';
import { ComponentProps } from 'react';
import ButtonSendTips from 'src/components/common/button/button-send-tips/ButtonSendTips';

export default {
  component: ButtonSendTips,
  title: 'Buttons/Send Tips Button',
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
    sx: {
      control: {
        disable: true
      }
    },
    tabIndex: {
      control: {
        disable: true
      }
    },
    action: {
      control: {
        disable: true
      }
    },
    centerRipple: {
      control: {
        disable: true
      }
    },
    disableRipple: {
      control: {
        disable: true
      }
    },
    disableTouchRipple: {
      control: {
        disable: true
      }
    },
    focusRipple: {
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
  },
  args: {
    disabled: false,
  }
} as Meta;

const Template: Story<ComponentProps<typeof ButtonSendTips>> = (args) => {
  return <ButtonSendTips {...args} />;
};

export const SendTipsButton = Template.bind({});
