import { AccountId } from '@subsocial/api/flat-subsocial/dto';

export interface ProfileFollowersProps {
  following: number;
  followers: number;
  className?: string;
  accountId: AccountId;
}
