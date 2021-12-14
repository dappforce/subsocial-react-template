import { Story, Meta } from '@storybook/react'
import { ComponentProps } from 'react'
import ButtonFollowComponent from '../src/components/common/button/button-follow/ButtonFollowSpace'

/* temporarily commented out */
// export default {
//     component: ButtonFollowComponent,
//     title: 'Buttons/Button Follow ',
// } as Meta

const Template: Story<ComponentProps<typeof ButtonFollowComponent>> = (args) => {
    return <ButtonFollowComponent {...args}/>
}

export const ButtonFollow = Template.bind({})
// ButtonFollow.args = {
//     isFollowing: false
// }
