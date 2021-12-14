import { CardActions } from '@mui/material'
import styles from './NewPostPage.module.sass'
import File from '../../common/file/File'
import { Box } from '@mui/system'
import Input from '../../common/inputs/input/Input'
import TagsInput from '../../common/inputs/tags-input/TagsInput'
import ButtonCancel from '../../common/button/button-cancel/ButtonCancel'
import ButtonComponent from '../../common/button/button-component/ButtonComponent'
import { FC } from 'react'
import { NewArticleProps } from 'src/models/post'

const NewArticle: FC<NewArticleProps> = ({
    title,
    tags,
    setTags,
    handleBody,
    handleTitle,
    body,
    reset
}) => {
    return (
        <>
            <File type={'image'}/>

            <Box component="form" className={styles.form}>
                <Input
                    label={'Post title'}
                    value={title}
                    onChange={handleTitle}
                />

                <Input
                    label={'Post body'}
                    minRows={4}
                    value={body}
                    isMultiline={true}
                    isRequired={true}
                    onChange={handleBody}
                />

                <TagsInput tags={tags} setTags={setTags}/>

                <CardActions className={styles.buttons}>
                    <ButtonCancel className={styles.button} onClick={reset}>
                        {'Reset form'}
                    </ButtonCancel>
                    <ButtonComponent
                        variant={'contained'}
                        className={styles.button}
                        type={'submit'}
                    >
                        {'Create post'}
                    </ButtonComponent>
                </CardActions>
            </Box>
        </>
    )
}

export default NewArticle
