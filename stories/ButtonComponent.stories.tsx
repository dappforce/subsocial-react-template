import { Story, Meta } from '@storybook/react'
import ButtonComponent from '../src/components/common/button/button-component/ButtonComponent'
import { ComponentProps } from 'react'

export default {
    component: ButtonComponent,
    title: 'Buttons/Button',
} as Meta

const Template: Story<ComponentProps<typeof ButtonComponent>> = (args) => {
    return <ButtonComponent {...args}>Button</ButtonComponent>
}

export const Button = Template.bind({})
Button.args = {
    variant: 'outlined',
    disabled: false
}
