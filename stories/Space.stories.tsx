import { Meta } from '@storybook/react'
import { Space as SpaceComponent } from '../src/components/space/space-item/Space'
import React, { useContext, useEffect, useState } from 'react'
import { ApiContext } from '../src/components/api'
import { initializeStore, useAppDispatch } from '../src/rtk/app/store'
import Loader from '../src/components/common/loader/Loader'
import { fetchSpaces } from '../src/rtk/features/spaces/spacesSlice'
import { Provider } from 'react-redux'

const store = initializeStore()

export default {
    component: SpaceComponent,
    title: 'Spaces/Space ',
    decorators: [
        Story => (
            <Provider store={store}>
                <Story />
            </Provider>
        )
    ],
} as Meta

export const Space = () => {
        const {api} = useContext(ApiContext)
        const dispatch = useAppDispatch()
        const [isFetching, setIsFetching] = useState(true)

        useEffect( () => {
            dispatch(fetchSpaces({ids: ['1'],api, reload: false })).then(() => setIsFetching(false))
        }, [])

        return isFetching ? <Loader label={'Loading...'}/> : <SpaceComponent id={'1'} />
}
