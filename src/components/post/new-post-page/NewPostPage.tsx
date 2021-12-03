import Layout from '../../layout/Layout'
import CardWrapper from '../../common/card-wrapper/CardWrapper'
import { CardContent } from '@mui/material'
import Title from '../../common/title/Title'
import { TitleSizes } from '../../../models/common/typography'
import styles from './NewPostPage.module.sass'
import { ChangeEvent, useState } from 'react'
import Tabs from '../../common/tabs/Tabs'
import { TabProps } from '../../../models/common/tabs'
import NewArticle from './NewArticle'
import NewVideo from './NewVideo'

const NewPostPage = () => {
    const [ activeTab, setActiveTab ] = useState('article')
    const [ tags, setTags ] = useState<string[]>([])
    const [ title, setTitle ] = useState('')
    const [ body, setBody ] = useState('')
    const [ url, setUrl ] = useState('')

    const content = () => {
        switch (activeTab) {
            case 'article':
                return <NewArticle title={title} handleTitle={handleTitle} body={body} handleBody={handleBody}
                                   reset={reset} tags={tags} setTags={setTags}/>
            case 'video':
            default:
                return <NewVideo title={title} setUrl={handleUrl} handleTitle={handleTitle} body={body}
                                 handleBody={handleBody}
                                 reset={reset} tags={tags} setTags={setTags} url={url}/>
        }
    }

    const reset = () => {
        setTitle('')
        setBody('')
        setTags([])
        setUrl('')
    }

    const handleTitle = (event: ChangeEvent<HTMLTextAreaElement>) => {
        setTitle(event.target.value)
    }

    const handleUrl = (event: ChangeEvent<HTMLTextAreaElement>) => {
        setUrl(event.target.value)
    }

    const handleBody = (event: ChangeEvent<HTMLTextAreaElement>) => {
        setBody(event.target.value)
    }

    const tabs: TabProps[] = [
        {
            label: 'Article',
            tabValue: 'article',
        }, {
            label: 'Video',
            tabValue: 'video',
        }
    ]

    return (
        <Layout>
            <CardWrapper>
                <CardContent sx={{pb: 0}}>
                    <Title type={TitleSizes.DETAILS}>{'New post'}</Title>
                </CardContent>

                <Tabs value={activeTab} tabs={tabs} setValue={setActiveTab} className={styles.tabs}/>
                {content()}
            </CardWrapper>
        </Layout>
    )
}

export default NewPostPage
