import { Story, Meta } from '@storybook/react'
import ButtonEditComponent from '../src/components/common/button/button-edit/ButtonEdit'
import { ComponentProps } from 'react'

export default {
    component: ButtonEditComponent,
    title: 'Buttons/Button Edit',
} as Meta

const Template: Story<ComponentProps<typeof ButtonEditComponent>> = (args) => {
    return <ButtonEditComponent {...args} />
}

export const ButtonEdit = Template.bind({})
ButtonEdit.args = {
}
