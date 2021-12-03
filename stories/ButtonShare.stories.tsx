import { Meta, Story } from '@storybook/react'
import ButtonShareComponent from '../src/components/common/button/button-share/ButtonShare'
import { ComponentProps } from 'react'

export default {
    component: ButtonShareComponent,
    title: 'Buttons/Button Share',
} as Meta

const Template: Story<ComponentProps<typeof ButtonShareComponent>> = (args) => {
    return <ButtonShareComponent {...args} />
}

export const ButtonShare = Template.bind({})
ButtonShare.args = {
    isShowLabel: false
}
ButtonShare.argTypes = {
    onClick: {control: {disable: true}}
}
