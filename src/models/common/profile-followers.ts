import { AccountId } from '@subsocial/types/dto';

export interface ProfileFollowersProps {
  following: number;
  followers: number;
  className?: string;
  accountId: AccountId;
}
