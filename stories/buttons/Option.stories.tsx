import { Meta } from '@storybook/react';
import ButtonOptionsComponent from 'src/components/common/button/button-options/ButtonOptions';

export default {
  component: ButtonOptionsComponent,
  title: 'Buttons/Option Button',
} as Meta;

export const OptionButton = () => <ButtonOptionsComponent />;
