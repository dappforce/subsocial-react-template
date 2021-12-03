import { Story, Meta } from '@storybook/react'
import { ComponentProps } from 'react'
import InputComponent from '../src/components/common/inputs/input/Input'

export default {
    component: InputComponent,
    title: 'Inputs/Input',
} as Meta

const Template: Story<ComponentProps<typeof InputComponent>> = (args) => {
    return <InputComponent {...args} />
}

export const Input = Template.bind({})
Input.args = {
    label: 'Input',
    placeholder: 'Add text...',
    isError: false,
    errorText: '',
    value: '',
    onChange: () => {},
    isRequired: false,
    isMultiline: false,
    minRows: 1
}
