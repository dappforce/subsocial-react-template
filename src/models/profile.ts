import { AnyAccountId } from '@subsocial/types/substrate/interfaces/utils'
import { AccountId, ProfileData, SpaceData, SpaceId } from '@subsocial/api/flat-subsocial/dto'

export interface SpaceIds {
    ids: SpaceId[]
}

export interface ProfilePageProps {
    address: AnyAccountId,
    owner?: ProfileData,
    followers?: AccountId[],
    mySpaceIds?: SpaceId[],
    spacesData?: SpaceData[],
    size?: number
}

export type ProfileTabValues = 'userPosts' | 'userSpaces'

export interface ProfileContentProps {
    ids: SpaceId[],
    activeTab: ProfileTabValues,
    address?: AnyAccountId
}

export interface ProfileAccountProps extends Partial<ProfileData> {
    activeTab: ProfileTabValues
    changeTab: (T: any) => void
}
