import { Story, Meta } from '@storybook/react';
import Connections from 'src/components/modal/modal-reactions/ModalConnections';
import { ComponentProps } from 'react';
import MaterialModal from '@mui/material/Modal';

export default {
  component: Connections,
  title: 'Modal/Modal Connections',
  argTypes: {
    activeTab: {
      control: {
        disable: true,
      },
    },
    count: {
      control: {
        disable: true,
      },
    },
    accountId: {
      control: {
        disable: true,
      },
    },
  },
} as Meta;

const Template: Story<ComponentProps<typeof Connections>> = (args) => {
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
        <Connections {...args} />
      </div>
    </MaterialModal>
  );
};

export const ModalConnections = Template.bind({});
ModalConnections.args = {
  countFollowing: 0,
  countFollowers: 0,
};
