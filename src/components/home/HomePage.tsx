import type { NextPage } from 'next'
import { useAppSelector } from 'src/rtk/app/store'
import SpaceList from '../space/infinity-space-list/space-list'
import PostList from '../post/infinity-post-list/post-list'
import styles from './HomePage.module.sass'
import Layout from '../layout/Layout'

const Content = () => {
    const {value} = useAppSelector(state => state.main)

    switch (value) {
        case 'posts':
            return <PostList />
        case 'spaces':
            return <SpaceList />
        default:
            return null
    }
}

const HomePage: NextPage = () => {
    return <Layout className={styles.main}><Content/></Layout>
}

export default HomePage
