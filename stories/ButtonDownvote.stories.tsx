import { Story, Meta } from '@storybook/react'
import ButtonDownvoteComponent from '../src/components/common/button/buttons-vote/ButtonDownvote'
import { ComponentProps } from 'react'

export default {
    component: ButtonDownvoteComponent,
    title: 'Buttons/Buttons Vote/Downvote',
} as Meta

const Template: Story<ComponentProps<typeof ButtonDownvoteComponent>> = (args) => {
    return <ButtonDownvoteComponent {...args} />
}

export const Downvote = Template.bind({})
Downvote.args = {
    isActive: false,
    value: 0,
    isShowLabel: false,
}
