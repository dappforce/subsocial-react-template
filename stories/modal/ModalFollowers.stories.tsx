import { Story, Meta } from '@storybook/react';
import ModalFollow from 'src/components/modal/modal-reactions/modal-follow/ModalFollow';
import { ComponentProps } from 'react';
import MaterialModal from '@mui/material/Modal';

export default {
  component: ModalFollow,
  title: 'Modal/Modal Followers',
  argTypes: {
    children: {
      control: {
        disable: true,
      },
    },
    id: {
      control: {
        disable: true,
      },
    },
  },
} as Meta;

const Template: Story<ComponentProps<typeof ModalFollow>> = (args) => {
  return (
    <MaterialModal
      open={true}
      style={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
      }}
    >
      <div
        style={{
          width: '500px',
          backgroundColor: 'white',
          borderRadius: '5px',
        }}
      >
        <ModalFollow {...args} />
      </div>
    </MaterialModal>
  );
};

export const ModalFollowers = Template.bind({});
ModalFollowers.args = {
  count: 1,
  id: '1020',
};
