import { SpaceData, ProfileData } from '@subsocial/api/flat-subsocial/dto';

export enum CardEditType {
  Space = 'Space',
  Profile = 'Profile',
  Post = 'Post',
}

export interface CardEditProps {
  spaceData?: SpaceData;
  profileData?: ProfileData;
  title: string;
  cancelButton: string;
  saveButton: string;
  onCancel?: () => void;
  type: CardEditType;
}
