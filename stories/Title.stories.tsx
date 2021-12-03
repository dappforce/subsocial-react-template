import { Meta } from '@storybook/react'
import TitleComponent from '../src/components/common/title/Title'
import { TitleSizes } from '../src/models/common/typography'

export default {
    component: TitleComponent,
    title: 'Shared/Text',
} as Meta

export const TitleProfile = () => <TitleComponent type={TitleSizes.PROFILE}>Title</TitleComponent>
export const TitlePreview = () => <TitleComponent type={TitleSizes.PREVIEW}>Title</TitleComponent>
export const TitleDetails = () => <TitleComponent type={TitleSizes.DETAILS}>Title</TitleComponent>
