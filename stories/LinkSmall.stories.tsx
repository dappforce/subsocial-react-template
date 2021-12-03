import { Meta } from '@storybook/react'
import SmallLinkComponent from '../src/components/common/links/small-link/SmallLink'

export default {
    component: SmallLinkComponent,
    title: 'Shared/Links',
} as Meta

export const SmallLink = () => <SmallLinkComponent href={'/'}>Link</SmallLinkComponent>
