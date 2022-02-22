import { NextContextWithRedux } from 'src/store/app'
import { fetchSpace, selectSpace } from 'src/store/features/spaces/spacesSlice'
import { SpaceWithSomeDetails } from '@subsocial/types/dto'

export async function loadSpaceOnNextReq(
    props: NextContextWithRedux,
): Promise<SpaceWithSomeDetails> {

    const { context, subsocial, dispatch, reduxStore } = props
    const { query } = context
    const { spaceId } = query
    const idOrHandle = spaceId as string
    if (!idOrHandle) return {} as SpaceWithSomeDetails

    let id

    if (idOrHandle[0] === '@') {
        const handle = idOrHandle.slice(1).toLowerCase()
        id = await subsocial.subsocial.substrate.getSpaceIdByHandle(handle)
    } else {
        id = idOrHandle
    }

    //@ts-ignore
    const idStr = id.toString()

    await dispatch(fetchSpace({ api: subsocial, id: idStr, reload: true }))
    const spaceData = selectSpace(reduxStore.getState(), { id: idStr })

    //@ts-ignore
    return spaceData
}
