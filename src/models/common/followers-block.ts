import { AccountId, SpaceId } from '@subsocial/api/flat-subsocial/dto';

export interface FollowersBlockProps {
  posts?: number;
  followers?: number;
  following?: number;
  className?: string;
  id: AccountId | SpaceId;
  onClose?: () => void;
}
