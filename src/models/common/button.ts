import { IconButtonProps } from '@mui/material/IconButton/IconButton';
import { EntityId, ReactionEnum } from '@subsocial/api/flat-subsocial/dto';
import { SubmittableResult } from '@polkadot/api';
import { ButtonProps } from '@mui/material/Button/Button';
import {
  PostStruct,
  SpaceStruct,
} from '@subsocial/api/flat-subsocial/flatteners';
import { ReactionStruct } from 'src/rtk/features/reactions/myPostReactionsSlice';
import React, { FunctionComponent } from 'react';
import { AnyAccountId, IpfsCid } from '@subsocial/types';
import { CardEditType } from './card-edit';

export type GetTxParamsFn = () => any[];
export type GetTxParamsAsyncFn = () => Promise<any[]>;

export type TxCallback = (status: SubmittableResult, newCid: IpfsCid) => void;
export type TxSuccessCallback = (status: SubmittableResult) => void;
export type TxFailedCallback = (
  status: SubmittableResult | null,
  newCid: IpfsCid
) => void;

export interface ButtonCancelProps {
  onClick?: () => void;
  disabled?: boolean;
  className?: string;
}

export interface ButtonCommentProps extends IconButtonProps {
  value?: number;
}

export interface ButtonComponentProps extends ButtonProps {
  onClick?: () => void;
  disabled?: boolean;
  className?: string;
}

export interface ButtonShareProps {
  onClick?: () => void;
  isShowLabel?: boolean;
  value?: number;
}

export interface ButtonVoteProps {
  isActive?: boolean;
  value?: number;
  withLabel?: boolean;
  onClick?: () => void;
  post: PostStruct;
  reactionEnum: ReactionEnum;
}

export interface InnerButtonVoteProps extends ButtonVoteProps {
  accountId?: string;
  reaction?: ReactionStruct;
}

export interface TxButtonProps extends ButtonProps {
  onClick?: () => void;
  className?: string;
  accountId?: AnyAccountId;
  label?: string | React.ReactNode;
  tx?: string;
  params?: any[] | GetTxParamsFn | GetTxParamsAsyncFn;
  onSuccess?: TxCallback;
  onFailed?: TxFailedCallback;
  onValidate?: () => boolean | Promise<boolean>;
  unsigned?: boolean;
  isFreeTx?: boolean;
  loading?: boolean;
  filedMessage?: string;
  component?: FunctionComponent<{}>;
  withLoader?: boolean;
  cardType?: CardEditType;
}

export interface ButtonFollowSpaceProps extends Omit<TxButtonProps, 'variant'> {
  space: SpaceStruct;
}

export interface ButtonFollowAccountProps
  extends Omit<TxButtonProps, 'variant'> {
  address: EntityId;
}

export interface ButtonReplyProps {
  onClick?: () => void;
  withLabel?: boolean;
}

export enum TypeContent {
  Space = 'Space',
  Post = 'Post',
  Comment = 'Comment',
  Profile = 'MyProfile',
}

export interface ButtonOptionsProps extends IconButtonProps {
  withReactions?: boolean;
  withFollowing?: boolean;
  withHidden?: boolean;
  typeContent?: TypeContent;
  contentStruct?: PostStruct | SpaceStruct;
  onClickEdit?: () => void;
}

export interface ButtonTogglerVisibilityProps {
  contentStruct: PostStruct | SpaceStruct;
  typeContent: TypeContent | undefined;
  className?: string;
  component?: FunctionComponent<{}>;
  withLoader: boolean;
  children?: React.ReactNode;
}
