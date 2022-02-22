import { Story, Meta } from '@storybook/react';
import ButtonEntity from 'src/components/common/button/button-entity/ButtonEntity';
import { ComponentProps } from 'react';

export default {
  component: ButtonEntity,
  title: 'Buttons/Create Space Button',
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
  },
  args: {
    typeEntity: 'space'
  },
} as Meta;

const Template: Story<ComponentProps<typeof ButtonEntity>> = (args) => {
  return <ButtonEntity {...args} />;
};

export const CreateSpaceButton = Template.bind({});
