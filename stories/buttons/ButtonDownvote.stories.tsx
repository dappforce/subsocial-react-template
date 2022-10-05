import { Meta, Story } from '@storybook/react';
import ButtonComponent from 'src/components/common/button/buttons-vote/ButtonVotes';
import { ComponentProps } from 'react';
import { post, sharedPost } from 'stories/mocked-data/posts';
import { ReactionEnum } from '@subsocial/api/types/dto';

export default {
  component: ButtonComponent,
  title: 'Buttons/Vote buttons/Downvote Button',
  argTypes: {
    post: {
      control: {
        disable: true
      }
    },
    reactionEnum: {
      control: {
        disable: true
      }
    },
  },
  args: {
    reactionEnum: ReactionEnum.Downvote,
  }
} as Meta;

const Template: Story<ComponentProps<typeof ButtonComponent>> = (args) => {
  return <ButtonComponent {...args} />;
};

export const Active = Template.bind({});
Active.args = {
  post: post.struct,
};

export const Default = Template.bind({});
Default.args = {
  post: sharedPost.struct,
};

export const Label = Template.bind({});
Label.args = {
  post: sharedPost.struct,
  withLabel: true
};
