import { CardActions } from '@mui/material'
import styles from './NewPostPage.module.sass'
import { Box } from '@mui/system'
import Input from '../../common/inputs/input/Input'
import TagsInput from '../../common/inputs/tags-input/TagsInput'
import ButtonCancel from '../../common/button/button-cancel/ButtonCancel'
import ButtonComponent from '../../common/button/button-component/ButtonComponent'
import { FC } from 'react'
import Embed from '../../common/Embed'
import { NewVideoProps } from 'src/models/post'

const NewVideo: FC<NewVideoProps> = ({
                                           title,
                                           body,
                                           setTags,
                                           tags,
                                           handleTitle,
                                           url,
                                           handleBody,
                                           reset,
                                           setUrl
                                       }) => {
    return (
        <Box component="form" className={styles.form}>
            <Input
                label={'Video URL'}
                value={url}
                onChange={setUrl}
                isRequired={true}
            />

            <Embed link={url}/>

            <Input
                label={'Post title'}
                value={title}
                onChange={handleTitle}
            />

            <Input
                label={'Post body'}
                value={body}
                isMultiline={true}
                minRows={4}
                onChange={handleBody}
            />

            <TagsInput tags={tags} setTags={setTags}/>

            <CardActions sx={{gap: 2, p: 0, justifyContent: 'flex-end'}}>
                <ButtonCancel className={styles.button} onClick={reset}>
                    {'Reset form'}
                </ButtonCancel>
                <ButtonComponent variant={'contained'} className={styles.button} type={'submit'}>
                    {'Create post'}
                </ButtonComponent>
            </CardActions>
        </Box>
    )
}

export default NewVideo
