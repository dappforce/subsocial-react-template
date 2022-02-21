import { Meta, Story } from '@storybook/react';
import TitleComponent from 'src/components/common/title/Title';
import { TitleSizes } from 'src/models/common/typography';
import { ComponentProps } from 'react';

export default {
  component: TitleComponent,
  title: 'Text/Title',
} as Meta;

const Template: Story<ComponentProps<typeof TitleComponent>> = ({ children, ...args }) => {
  return <TitleComponent {...args}>{children}</TitleComponent>;
};

export const TitleProfile = Template.bind({});
TitleProfile.args = {
  type: TitleSizes.PROFILE,
  children: 'Title profile'
};

export const TitlePreview = Template.bind({});
TitlePreview.args = {
  type: TitleSizes.PREVIEW,
  children: 'Title preview'
};

export const TitleDetails = Template.bind({});
TitleDetails.args = {
  type: TitleSizes.DETAILS,
  children: 'Title details'
};
