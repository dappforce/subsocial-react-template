import { AccountId, SpaceId } from '@subsocial/types/dto';

export interface FollowersBlockProps {
  posts?: number;
  followers?: number;
  following?: number;
  className?: string;
  id: AccountId | SpaceId;
  onClose?: () => void;
}
