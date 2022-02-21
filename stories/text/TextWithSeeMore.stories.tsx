import { Meta, Story } from '@storybook/react';
import { ComponentProps } from 'react';
import { AccountDescription as AccountDescriptionComponent} from 'src/components/account/AccountDescription';

export default {
  component: AccountDescriptionComponent,
  title: 'Text/Account Description',
  args: {
    summary: 'Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has b...',
    about: 'Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry\'s standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.',
    isShowMore: true
  }
} as Meta;

const Template: Story<ComponentProps<typeof AccountDescriptionComponent>> = ({ children, ...args }) => {
  return <AccountDescriptionComponent {...args}>{children}</AccountDescriptionComponent>;
};

export const AccountDescription = Template.bind({});
