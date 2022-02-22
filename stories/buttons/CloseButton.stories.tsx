import { Meta, Story } from '@storybook/react';
import React from 'react';
import ButtonCloseComponent from 'src/components/common/button/button-close/ButtonClose';

export default {
  component: ButtonCloseComponent,
  title: 'Buttons/Close Button',
  decorators: [
    (Story) => (
      <div style={{ position: 'relative', width: '50px' }}>
        <Story />
      </div>
    ),
  ],
} as Meta;

export const CloseButton = () => <ButtonCloseComponent />;
