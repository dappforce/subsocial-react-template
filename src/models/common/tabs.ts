import { ReactNode } from 'react'

export interface Tab {
    label: string
    tabValue: string
    count?: number
}

export interface TabProps extends Tab {
    component?: ReactNode | ReactNode[] | JSX.Element[]
}

export interface TabsProps {
    value: string
    tabs: TabProps[]
    className?: string
    setValue: (T: any) => void,
}
