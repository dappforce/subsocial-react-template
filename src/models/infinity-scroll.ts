import { ReactNode } from 'react'
import { FlatSubsocialApi } from '@subsocial/api/flat-subsocial'
import { HasHiddenVisibility } from '../rtk/app/helpers'
import { AccountId } from '@subsocial/api/flat-subsocial/dto'

export type RenderItemFn = (item: string) => ReactNode

export type InnerLoadMoreFn<T = string> = (page: number, size: number) => Promise<T[]>

export type loadMoreValuesArgs = {
    size: number,
    page: number,
    api: FlatSubsocialApi,
    dispatch: any,
    visibility?: HasHiddenVisibility,
    myAddress?: AccountId,
    ids: string[]
}
export type DataListItemProps = {
    renderItem: RenderItemFn
}
