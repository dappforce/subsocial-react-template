import { Story, Meta } from '@storybook/react'
import { ComponentProps } from 'react'
import AddressComponent from '../src/components/common/address/Address'

export default {
    component: AddressComponent,
    title: 'Shared/Address',
} as Meta

const Template: Story<ComponentProps<typeof AddressComponent>> = (args) => {
    return <AddressComponent {...args} />
}

export const Address = Template.bind({})
Address.args = {
    lengthOfAddress: 12,
    isCopy: true,
    isIcon: false,
    size: 'sm',
    isQr: false,
    label: '3qis9Gqjw9jiXHDCWfCYApsQ5TNNYkHhAdzhEzLgNXVPjkK9',
}
Address.argTypes = {
    className: {control: {disable: true}}
}
