import { Meta } from '@storybook/react'
import Post from '../src/components/post/post-item/Post'
import Loader from '../src/components/common/loader/Loader'
import { initializeStore, useAppDispatch } from '../src/rtk/app/store'
import { fetchPosts } from '../src/rtk/features/posts/postsSlice'
import React, { useContext, useEffect, useState } from 'react'
import { ApiContext } from '../src/components/api'
import { Provider } from 'react-redux'

const store = initializeStore()

export default {
    component: Post,
    title: 'Post/Post Item',
    decorators: [
        Story => (
            <Provider store={store}>
                <Story />
            </Provider>
        )
    ],

} as Meta

export const PostItem = () => {
    const {api} = useContext(ApiContext)
    const dispatch = useAppDispatch()
    const [isFetching, setIsFetching] = useState(true)

    useEffect( () => {
         dispatch(fetchPosts({ids: ['97'],api, reload: false })).then(() => setIsFetching(false))
    }, [])

    return isFetching ? <Loader/> : <Post postId={'97'}/>
}
