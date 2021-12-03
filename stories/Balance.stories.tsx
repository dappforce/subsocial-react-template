import { Story, Meta } from '@storybook/react'
import { ComponentProps } from 'react'
import BalanceComponent from '../src/components/common/balance/Balance'
export default {
    component: BalanceComponent,
    title: 'Shared/Balance',
} as Meta

const Template: Story<ComponentProps<typeof BalanceComponent>> = (args) => {
    return <BalanceComponent {...args} />
}

export const Balance = Template.bind({})
Balance.args = {
    isIcon: false,
    address: '3qis9Gqjw9jiXHDCWfCYApsQ5TNNYkHhAdzhEzLgNXVPjkK9'
}

Balance.argTypes = {
    className: {control: {disable: true}}
}
