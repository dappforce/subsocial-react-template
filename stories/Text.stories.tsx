import { Meta } from '@storybook/react'
import TextComponent from '../src/components/common/text/Text'
import { TextSizes } from '../src/models/common/typography'

export default {
    component: TextComponent,
    title: 'Shared/Text',
} as Meta

export const TextNormal = () => <TextComponent type={TextSizes.NORMAL}>Normal text</TextComponent>
export const TextSecondary = () => <TextComponent type={TextSizes.SECONDARY}>Secondary Text</TextComponent>

