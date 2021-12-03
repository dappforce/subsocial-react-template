import { SpaceWithSomeDetails } from '@subsocial/api/flat-subsocial/dto'

export interface CardEditProps extends Partial<SpaceWithSomeDetails> {
    title: string
    cancelButton: string
    saveButton: string
    onCancel?: () => void
}
