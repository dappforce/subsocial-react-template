import Layout from '../../layout/Layout'
import CardEdit from '../../common/card-edit/CardEdit'
import { useRouter } from 'next/router'
import { useSelectSpace } from 'src/rtk/features/spaces/spacesHooks'
import { useEffect, useState } from 'react'
import { useApi } from '../../api'
import { fetchSpace } from 'src/rtk/features/spaces/spacesSlice'
import { useAppDispatch } from 'src/rtk/app/store'
import { SpaceWithSomeDetails } from '@subsocial/api/flat-subsocial/dto'

const SpaceEditPage = () => {
    const router = useRouter()
    const idOrHandle = router.query.spaceId as string
    const { api } = useApi()
    const dispatch = useAppDispatch()
    const [ id, setId ] = useState('')

    useEffect(() => {
        (async () => await dispatch(fetchSpace({ api, id })))()

        if (idOrHandle.includes('@')) {
            const handle = idOrHandle.slice(1).toLowerCase()
            api.subsocial.substrate.getSpaceIdByHandle(handle)
                .then(id => {
                    if (id) setId(id.toString())
                })
        } else {
            setId(idOrHandle)
        }
    }, [id])

    const spaceData = useSelectSpace(id) as SpaceWithSomeDetails

    const onCancel = () => {
        router.back()
    }

    return (
        <Layout>
            <CardEdit
                { ...spaceData }
                title={'Edit Space'}
                cancelButton={'Cancel'}
                saveButton={'Save'}
                onCancel={onCancel}
            />
        </Layout>
    )
}

export default SpaceEditPage
