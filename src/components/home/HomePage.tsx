import type { NextPage } from 'next'
import { useAppSelector } from 'src/rtk/app/store'
import SpaceList from '../space/space-list/space-list'
import PostList from '../post/post-list/post-list'
import styles from './HomePage.module.sass'
import Layout from '../layout/Layout'
import { recommendedSpaceIds } from '../../config'

const Content = () => {
    const {value} = useAppSelector(state => state.main)

    switch (value) {
        case 'posts':
            return <PostList ids={recommendedSpaceIds} visibility={'onlyVisible'}/>
        case 'spaces':
            return <SpaceList ids={recommendedSpaceIds}/>
        default:
            return null
    }
}

const HomePage: NextPage = () => {
    return <Layout className={styles.main}><Content/></Layout>
}

export default HomePage
