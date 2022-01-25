import { TabProps } from './common/tabs';
import { ReactNode, SyntheticEvent } from 'react';
import { AccountId, PostId, SpaceId } from '@subsocial/api/flat-subsocial/dto';
import { ModalProps as ModalMaterialProps } from '@mui/material/Modal/Modal';
import { Account } from './account';
import { ACCOUNT_STATUS } from './auth';
import { InnerLoadMoreFn } from './infinity-scroll';

export interface ModalProps extends ModalMaterialProps {
  onClose: () => void;
}

export interface ModalReactionsListProps {
  dataSource: string[];
  loadMore: InnerLoadMoreFn;
  totalCount: number;
  isEmpty?: boolean;
  onClose?: () => void;
}

export interface ModalReactionsProps extends ModalReactionsListProps {
  title: string;
  isTabs?: boolean;
  tabs?: TabProps[];
  handleTabs?: (event: SyntheticEvent, newValue: string) => void;
  valueTabs?: string;
  count?: number;
  className?: string;
  onClose?: () => void;
}

export interface ModalLabelTabProps {
  label: string;
  count?: number;
}

export interface ModalQrProps extends Partial<ModalMaterialProps> {
  id: AccountId;
  onClose: () => void;
  open: boolean;
}

export type ModalSignInProps = Omit<ModalProps, 'children'> & {
  status: ACCOUNT_STATUS;
  isAlert?: boolean;
};

export interface ModalAdBlockProps extends Partial<ModalMaterialProps> {
  onClose?: () => void;
  open?: boolean;
}

export interface ModalSignInContent {
  title: string | null;
  body: ReactNode;
  text?: ReactNode;
}

export interface ModalListUserItemProps extends Account {
  onClick: (T: string) => void;
}

export interface ModalConnectionsProps {
  activeTab?: 'followers' | 'following';
  count?: number;
  countFollowing?: number;
  countFollowers?: number;
  accountId: AccountId;
  onClose?: () => void;
}

export enum ModalConnectionsFetchType {
  'following' = 'accountsFollowedByAccount',
  'followers' = 'accountFollowers',
}

export interface ModalFollowProps {
  count?: number;
  id: SpaceId;
}

export interface ModalVotesProps {
  postId: PostId;
}
