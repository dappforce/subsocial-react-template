import { Story, Meta } from '@storybook/react';
import { ComponentProps } from 'react';
import HeaderComponent from 'src/components/header/Header';

export default {
  component: HeaderComponent,
  title: 'Header/Header',
} as Meta;

const Template: Story<ComponentProps<typeof HeaderComponent>> = (args) => {
  return <HeaderComponent {...args} />;
};

export const Header = Template.bind({});
Header.args = {
  label: 'rSocial',
};
