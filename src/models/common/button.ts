import { IconButtonProps } from '@mui/material/IconButton/IconButton'
import { EntityId, PostId, ReactionEnum } from '@subsocial/api/flat-subsocial/dto'
import { SubmittableResult } from '@polkadot/api'
import { AnyAccountId } from '@subsocial/types/substrate/interfaces/utils'
import { ButtonProps } from '@mui/material/Button/Button'
import { PostStruct, SpaceStruct } from '@subsocial/api/flat-subsocial/flatteners'
import { ReactionStruct } from 'src/rtk/features/reactions/myPostReactionsSlice'
import { FunctionComponent } from 'react'

export type GetTxParamsFn = () => any[]
export type GetTxParamsAsyncFn = () => Promise<any[]>

export type TxCallback = (status: SubmittableResult) => void
export type TxFailedCallback = (status: SubmittableResult | null) => void

export interface ButtonCancelProps {
    onClick?: () => void
    disabled?: boolean
    className?: string
}

export interface ButtonCommentProps extends IconButtonProps {
    value?: number
}

export interface ButtonComponentProps extends ButtonProps {
    onClick?: () => void
    disabled?: boolean
    className?: string
}

export interface ButtonShareProps {
    onClick?: () => void
    isShowLabel?: boolean
}

export interface ButtonVoteProps {
    isActive?: boolean
    value?: number
    withLabel?: boolean
    onClick?: () => void
    post: PostStruct
    reactionEnum: ReactionEnum
}

export interface InnerButtonVoteProps extends ButtonVoteProps {
    accountId?: string
    reaction?: ReactionStruct
}


export interface TxButtonProps extends ButtonProps {
    onClick?: () => void
    className?: string
    accountId?: AnyAccountId
    label?: string
    tx?: string
    params?: any[] | GetTxParamsFn | GetTxParamsAsyncFn
    onSuccess?: TxCallback
    onFailed?: TxFailedCallback
    onValidate?: () => boolean | Promise<boolean>
    unsigned?: boolean
    isFreeTx?: boolean
    loading?: boolean
    filedMessage?: string
    component?: FunctionComponent<{}>,
    withLoader?: boolean
}

export interface ButtonFollowSpaceProps extends Omit<TxButtonProps, 'variant'> {
    space: SpaceStruct
}

export interface ButtonFollowAccountProps extends Omit<TxButtonProps, 'variant'> {
    address: EntityId
}

export interface ButtonReplyProps {
    onClick?: () => void
}

export interface ButtonOptionsProps extends IconButtonProps {
    postId?: PostId,
    withReactions?: boolean
    withHidden?: boolean
    isHidden?: boolean
}
