import { Meta, Story } from '@storybook/react'
import ProfileAccountComponent from '../src/components/profile/profile-account/ProfileAccount'
import React, { ComponentProps } from 'react'
import { Provider } from 'react-redux'
import { initializeStore } from '../src/rtk/app/store'

const store = initializeStore()

export default {
    component: ProfileAccountComponent,
    title: 'Profile/Profile Account',
    decorators: [
        Story => (
            <Provider store={store}>
                <Story />
            </Provider>
        )
    ],
} as Meta

const Template: Story<ComponentProps<typeof ProfileAccountComponent>> = (args) => {
    return <ProfileAccountComponent {...args}/>
}

export const ProfileAccount = Template.bind({})
ProfileAccount.args = {
    content:
        {
            about: 'I build this Subsocial UI :)\n\nMy social links:\n[Telegram](https://t.me/olehmell)\n[Github](https://github.com/olehmell)',
            avatar: 'QmPx51qGvYpbs87ZS8Jf2CS93USF7x5RVo4ZknnAa4g6Js',
            isShowMore: false,
            name: 'Oleh Mell',
            summary: 'I build this Subsocial UI :)\n\nMy social links:\nTelegram\nGithub',
        },
    id: '3omeLMCdtrojRPf7KyvTg78EvLxyJMo7mb2bqM28EEvxmXFM',
    struct: {
        contentId: 'bafyreienng2ielsvzuqjmys5e7hn3p2fdiggfazuzlfypwmbetenpxxtw4',
        createdAtBlock: 871553,
        createdAtTime: 1602150540000,
        createdByAccount: '3omeLMCdtrojRPf7KyvTg78EvLxyJMo7mb2bqM28EEvxmXFM',
        followersCount: 9,
        followingAccountsCount: 5,
        followingSpacesCount: 34,
        hasProfile: true,
        id: '3omeLMCdtrojRPf7KyvTg78EvLxyJMo7mb2bqM28EEvxmXFM',
        isUpdated: true,
        reputation: 966,
        updatedAtBlock: 3320115,
        updatedAtTime: 1616915958000,
        updatedByAccount: '3omeLMCdtrojRPf7KyvTg78EvLxyJMo7mb2bqM28EEvxmXFM',
    }
}
