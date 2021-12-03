import { IconButtonProps } from '@mui/material/IconButton/IconButton'
import { PostId } from '@subsocial/api/flat-subsocial/dto';

export interface ButtonCancelProps {
    onClick?: () => void
    disabled?: boolean
    className?: string
}

export interface ButtonCommentProps extends IconButtonProps {
    value?: number
}

export interface ButtonComponentProps {
    variant: 'outlined' | 'contained'
    onClick?: () => void
    disabled?: boolean
    className?: string
    type?: 'submit'
}

export interface ButtonShareProps {
    onClick?: () => void
    isShowLabel?: boolean
}

export interface ButtonVoteProps {
    isActive: boolean
    value?: number
    isShowLabel?: boolean
    onClick?: () => void
}

export interface ButtonFollowProps {
    isFollowing: boolean
    onClick?: () => void
    className?: string
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
