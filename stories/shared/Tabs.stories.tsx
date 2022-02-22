import { Meta, Story } from '@storybook/react';
import TabsComponent from '../../src/components/common/tabs/Tabs';
import { ComponentProps } from 'react';

export default {
  component: TabsComponent,
  title: 'Shared/Tabs',
} as Meta;

const Template: Story<ComponentProps<typeof TabsComponent>> = (args) => {
  return <TabsComponent {...args} />;
};

export const Tabs = Template.bind({});
Tabs.args = {
  value: 'posts',
  tabs: [
    { label: 'My feed', tabValue: 'feeds' },
    { label: 'Posts', tabValue: 'posts' },
    { label: 'Spaces', tabValue: 'spaces' },
  ],
  setValue: () => {},
};
