import { Story, Meta } from '@storybook/react';
import ButtonComponent from 'src/components/common/button/button-component/ButtonComponent';
import { ComponentProps } from 'react';

export default {
  component: ButtonComponent,
  title: 'Buttons/Button',
  argTypes: {
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
    variant: 'outlined',
    disabled: false,
    children: 'Button'
  }
} as Meta;

const Template: Story<ComponentProps<typeof ButtonComponent>> = ({ children, ...args }) => {
  return <ButtonComponent {...args}>{children}</ButtonComponent>;
};

export const Button = Template.bind({});
