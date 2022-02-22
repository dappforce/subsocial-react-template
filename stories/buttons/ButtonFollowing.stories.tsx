import { Story, Meta } from '@storybook/react';
import { ComponentProps } from 'react';
import ButtonFollowComponent from 'src/components/common/button/button-follow/ButtonFollowSpace';
import { space } from '../mocked-data';

export default {
  component: ButtonFollowComponent,
  title: 'Buttons/Follow Button',
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
    space: space.struct,
    disabled: false,
  }
} as Meta;

const Template: Story<ComponentProps<typeof ButtonFollowComponent>> = (args) => {
  return <ButtonFollowComponent {...args} />;
};

export const FollowingButton = Template.bind({});
