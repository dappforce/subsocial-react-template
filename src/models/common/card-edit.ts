import { SpaceData, ProfileData } from '@subsocial/api/flat-subsocial/dto';

export interface CardEditProps {
  spaceData?: SpaceData;
  profileData?: ProfileData;
  title: string;
  cancelButton: string;
  saveButton: string;
  onCancel?: () => void;
}
