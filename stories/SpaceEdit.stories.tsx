import { Meta } from '@storybook/react'
import CardEdit from '../src/components/common/card-edit/CardEdit'
import { CardEditType } from "../src/models/common/card-edit";

export default {
    component: CardEdit,
    title: 'Spaces/Space Edit '
} as Meta

export const SpaceEdit = () => <CardEdit
    cancelButton={'Cancel'}
    saveButton={'Save'}
    title={'Edit Space'}
    type={CardEditType.Space}
/>
