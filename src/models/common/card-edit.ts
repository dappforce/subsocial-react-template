import { SpaceData } from '@subsocial/api/types/dto';

export enum CardEditType {
  Space = 'Space',
  Profile = 'Profile',
  Post = 'Post',
  Comment = 'Comment',
}

export interface CardEditProps {
  spaceData?: SpaceData;
  profileData?: SpaceData;
  title: string;
  cancelButton: string;
  saveButton: string;
  onCancel?: () => void;
  type: CardEditType;
}
