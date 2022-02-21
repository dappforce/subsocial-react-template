import { Meta, Story } from '@storybook/react';
import TextComponent from 'src/components/common/text/Text';
import { TextSizes } from 'src/models/common/typography';
import { ComponentProps } from 'react';

export default {
  component: TextComponent,
  title: 'Text/Paragraph',
} as Meta;

const Template: Story<ComponentProps<typeof TextComponent>> = ({ children, ...args }) => {
  return <TextComponent {...args}>{children}</TextComponent>;
};

export const TextNormal = Template.bind({});
TextNormal.args = {
  type: TextSizes.NORMAL,
  children: 'Text normal'
};

export const TextSecondary = Template.bind({});
TextSecondary.args = {
  type: TextSizes.SECONDARY,
  children: 'Text secondary'
};

