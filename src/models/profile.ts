import {
  AccountId,
  SpaceData,
  SpaceId,
} from '@subsocial/api/types/dto';
import { AnyAccountId } from '@subsocial/api/types';

export interface SpaceIds {
  ids: SpaceId[];
  withUnlisted?: boolean;
}

export interface ProfilePageProps {
  address: AnyAccountId;
  owner?: SpaceData;
  followers?: AccountId[];
  mySpaceIds?: SpaceId[];
  spacesData?: SpaceData[];
  size?: number;
}

export type ProfileTabValues = 'userPosts' | 'userSpaces';

export interface ProfileContentProps {
  ids: SpaceId[];
  activeTab: ProfileTabValues;
  address?: AnyAccountId;
}

export interface ProfileAccountProps extends Partial<SpaceData> {
  activeTab: ProfileTabValues;
  changeTab: (T: any) => void;
}
