import { recommendedSpaceIds } from 'src/config'
import { getPageOfIds } from '../utils/getIds'
import { AnySpaceId } from '@subsocial/types'
import { bnsToIds } from '@subsocial/utils'
import { PostId } from '@subsocial/api/flat-subsocial/dto'
import { FlatSubsocialApi } from '@subsocial/api/flat-subsocial'

let suggestedPostIds: string[] | undefined = undefined

export const loadSuggestedPostIds = async (api: FlatSubsocialApi) => {

    if (!api.subsocial) return []

    const suggestedPostIdsPromises = recommendedSpaceIds.map(spaceId =>
        api.subsocial.substrate.postIdsBySpaceId(spaceId as unknown as AnySpaceId))

    const suggestedPostIdsArray = await Promise.all(suggestedPostIdsPromises)

    suggestedPostIds = bnsToIds(suggestedPostIdsArray.flat().sort((a, b) => b.sub(a).toNumber()))

    return suggestedPostIds
}

export const getSuggestedPostIdsByPage = (ids: PostId[], size: number, page: number) => getPageOfIds(ids, {page, size})
