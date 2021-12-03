import { Story, Meta } from '@storybook/react'
import ButtonCancelComponent from '../src/components/common/button/button-cancel/ButtonCancel'
import { ComponentProps } from 'react'

export default {
    component: ButtonCancelComponent,
    title: 'Buttons/Button Cancel',
} as Meta

const Template: Story<ComponentProps<typeof ButtonCancelComponent>> = (args) => {
    return <ButtonCancelComponent disabled={args.disabled}>Cancel</ButtonCancelComponent>
}

export const ButtonCancel = Template.bind({})
ButtonCancel.args = {
    disabled: false,
}
