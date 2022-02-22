import { Meta } from '@storybook/react';
import React from 'react';
import ButtonQr from 'src/components/common/button/button-qr/ButtonQr';

export default {
  component: ButtonQr,
  title: 'Buttons/Qr Button',
} as Meta;

export const QrButton = () => <ButtonQr />;
