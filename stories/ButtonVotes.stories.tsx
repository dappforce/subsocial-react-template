import { Story, Meta } from '@storybook/react'
import ButtonComponent from '../src/components/common/button/buttons-vote/ButtonVotes'
import { ComponentProps } from 'react'

/* temporarily commented out */
// export default {
//     component: ButtonDownvoteComponent,
//     title: 'Buttons/Buttons Vote/Downvote',
// } as Meta

const Template: Story<ComponentProps<typeof ButtonComponent>> = (args) => {
    return <ButtonComponent {...args} />
}

export const ButtonVotes = Template.bind({})
ButtonVotes.args = {
}
