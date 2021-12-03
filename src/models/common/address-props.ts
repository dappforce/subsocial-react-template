import { TextProps } from './typography'

export type AddressSize = 'sm' | 'lg'

export interface AddressProps {
    label: string
    lengthOfAddress?: number
    size: AddressSize
    isCopy: boolean
    className?: string
    isQr?: boolean
    isIcon?: boolean
    textProps?: Omit<TextProps, 'type'>
}
