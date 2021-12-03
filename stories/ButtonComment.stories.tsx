import { Story, Meta } from '@storybook/react'
import ButtonCommentComponent from '../src/components/common/button/button-comment/ButtonComment'
import { ComponentProps } from 'react'

export default {
    component: ButtonCommentComponent,
    title: 'Buttons/Button Comment',
} as Meta

const Template: Story<ComponentProps<typeof ButtonCommentComponent>> = (args) => {
    return <ButtonCommentComponent disabled={args.disabled}/>
}

export const ButtonComment = Template.bind({})
ButtonComment.args = {
}
