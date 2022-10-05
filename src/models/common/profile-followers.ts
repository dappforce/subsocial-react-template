import { AccountId } from '@subsocial/api/types/dto';

export interface ProfileFollowersProps {
  following: number;
  followers: number;
  className?: string;
  accountId: AccountId;
}
