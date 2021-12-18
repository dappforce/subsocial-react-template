import { AsyncThunkAction } from '@reduxjs/toolkit'
import { FetchManyArgs, FetchOneArgs, SelectManyArgs, SelectOneArgs, ThunkApiConfig } from 'src/rtk/app/helpers'
import { RootState } from 'src/rtk/app/rootReducer'

type CommonResult = {
  loading?: boolean
  error?: Error
}

export type FetchCommonResult<T> = T & CommonResult

type FetchOneResult<Entity> = FetchCommonResult<{
  entity?: Entity
}>

export type FetchManyResult<Entity> = FetchCommonResult<{
  entities: Entity[]
}>

type SelectFn<Args, Entity> = (state: RootState, args: Args) => Entity

export type SelectManyFn<Args, Entity> = SelectFn<SelectManyArgs<Args>, Entity[]>
export type SelectOneFn<Args, Entity> = (state: RootState, args: SelectOneArgs<Args>) => Entity

type FetchFn<Args, Struct> = (args: Args) =>
  AsyncThunkAction<Struct, Args, ThunkApiConfig>

export type FetchManyFn<Args, Struct> = FetchFn<FetchManyArgs<Args>, Struct[]>
export type FetchOneFn<Args, Struct> = FetchFn<FetchOneArgs<Args>, Struct>

