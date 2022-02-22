import { Story, Meta } from '@storybook/react';
import ButtonComment from 'src/components/common/button/button-comment/ButtonComment';
import { ComponentProps } from 'react';

export default {
  component: ButtonComment,
  title: 'Buttons/Comment Button',
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
    value: 0
  },
} as Meta;

const Template: Story<ComponentProps<typeof ButtonComment>> = (args) => {
  return <ButtonComment {...args} />;
};

export const CommentButton = Template.bind({});
