import { Story, Meta } from '@storybook/react'
import ButtonUpvoteComponent from '../src/components/common/button/buttons-vote/ButtonUpvote'
import { ComponentProps } from 'react'

export default {
    component: ButtonUpvoteComponent,
    title: 'Buttons/Buttons Vote/Upvote',
} as Meta

const Template: Story<ComponentProps<typeof ButtonUpvoteComponent>> = (args) => {
    return <ButtonUpvoteComponent {...args} />
}

export const Upvote = Template.bind({})
Upvote.args = {
    isActive: false,
    value: 0,
    isShowLabel: false,
}
