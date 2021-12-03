import { Meta } from '@storybook/react'
import TagComponent from '../src/components/common/tag/Tag'

export default {
    component: TagComponent,
    title: 'Shared/Tag',
} as Meta

export const Tag = () => <TagComponent label={'subsocial'}/>
