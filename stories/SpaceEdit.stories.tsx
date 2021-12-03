import { Meta } from '@storybook/react'
import CardEdit from '../src/components/common/card-edit/CardEdit'

export default {
    component: CardEdit,
    title: 'Spaces/Space Edit '
} as Meta

export const SpaceEdit = () => <CardEdit
    cancelButton={'Cancel'}
    saveButton={'Save'}
    title={'Edit Space'} />
