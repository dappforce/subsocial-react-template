import { ReactNode } from 'react';
import { NamedLink } from '@subsocial/types';
import { AccountId } from '@subsocial/types/dto';

export interface AccountProps {
  tabs?: ReactNode;
  avatar?: string;
  name: string | ReactNode;
  id: string;
  followersCount: number;
  followingCount?: number;
  about?: string;
  summary?: string;
  isShowMore?: boolean;
  links?: string[] | NamedLink[];
  buttons: ReactNode;
  tags?: string[];
  isEditable?: boolean;
  action: ReactNode;
  posts?: number;
  withBalance?: boolean;
  hiddenBlock?: ReactNode;
}

export type AccountDescriptionProps = Pick<
  AccountProps,
  'about' | 'summary' | 'isShowMore'
>;

export interface Account {
  address: string;
  name: string;
}

export interface AccountsProps {
  accounts: Account[];
}

export interface AccountsModalProps extends AccountsProps {
  onClose: () => void;
}

export interface SwitchAccountContentProps {
  onClose: () => void;
}

export interface AccountFollowersProps {
  following?: number;
  followers?: number;
  className?: string;
  accountId: AccountId;
}
