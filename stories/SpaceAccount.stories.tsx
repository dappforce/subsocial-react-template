// @ts-nocheck

import { Meta, Story } from '@storybook/react'
import SpaceAccountComponent from '../src/components/space/space-account/SpaceAccount'
import { ComponentProps } from 'react'

export default {
    component: SpaceAccountComponent,
    title: 'Spaces/Space Account',
} as Meta

const Template: Story<ComponentProps<typeof SpaceAccountComponent>> = (args) => {
    return <SpaceAccountComponent {...args} />
}

export const SpaceAccount = Template.bind({})
SpaceAccount.args = {
    content: {
        about: 'Subsocial is an open protocol for decentralized social networks and marketplaces. It\'s built with Substrate and IPFS. [Learn more](https://subsocial.network/)',
        handle: 'subsocial',
        id: 'bafyreib3mgbou4xln42qqcgj6qlt3cif35x4ribisxgq7unhpun525l54e',
        image: 'Qmasp4JHhQWPkEpXLHFhMAQieAH1wtfVRNHWZ5snhfFeBe',
        isShowMore: false,
        links: ['https://subsocial.network', 'https://twitter.com/SubsocialChain', 'https://medium.com/dappforce', 'https://t.me/Subsocial', 'https://github.com/dappforce', 'https://www.youtube.com/channel/UC1xCFynfwMrjEtFdMf8nXgQ'],
        name: 'Subsocial',
        summary: 'Subsocial is an open protocol for decentralized social networks and marketplaces. It\'s built with Substrate and IPFS. Learn more',
        tags: ['subsocial', 'polkadot', 'substrate', 'sofi']
    },
    id: '1',
    struct: {
        canEveryoneCreatePosts: false,
        canFollowerCreatePosts: false,
        contentId: 'bafyreib3mgbou4xln42qqcgj6qlt3cif35x4ribisxgq7unhpun525l54e',
        createdAtBlock: 0,
        createdAtTime: 0,
        createdByAccount: '3osmnRNnrcScHsgkTJH1xyBF5kGjpbWHsGrqM31BJpy4vwn8',
        followersCount: 1960,
        handle: 'subsocial',
        hidden: false,
        hiddenPostsCount: 6,
        id: '1',
        isUpdated: true,
        ownerId: '3osmnRNnrcScHsgkTJH1xyBF5kGjpbWHsGrqM31BJpy4vwn8',
        postsCount: 74,
        score: 64714,
        updatedAtBlock: 1976464,
        updatedAtTime: 1608780324000,
        updatedByAccount: '3osmnRNnrcScHsgkTJH1xyBF5kGjpbWHsGrqM31BJpy4vwn8',
        visiblePostsCount: 68,
    }
}
