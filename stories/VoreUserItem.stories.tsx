import { Meta, Story } from '@storybook/react'
import VoteUserItemComponent from '../src/components/common/vote-user-item/VoteUserItem'
import { users } from '../src/mocked-data/db'
import { ComponentProps } from 'react'
import { List } from '@mui/material'

// export default {
//     component: VoteUserItemComponent,
//     title: 'Shared/Vote User Item',
// } as Meta

const Template: Story<ComponentProps<typeof VoteUserItemComponent>> = (args) => {
    const props = {...users[0], ...args}
    return <List><VoteUserItemComponent {...props} /></List>
}

export const VoteUserItem = Template.bind({})
VoteUserItem.args = {
}
