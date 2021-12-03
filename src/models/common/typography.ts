import { TypographyProps } from '@mui/material/Typography/Typography'
import { ElementType } from 'react'

export enum TitleSizes {
    DETAILS = 'details',
    PREVIEW = 'preview',
    PROFILE = 'profile'
}

export interface TitleProps extends TypographyProps {
    type: TitleSizes
    component?: ElementType
}

export enum TextSizes {
    NORMAL = 'normal',
    SECONDARY = 'secondary'
}

export interface TextProps extends TypographyProps {
    type: TextSizes
    component?: ElementType
}
