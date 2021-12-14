import CardWrapper from '../card-wrapper/CardWrapper'
import { CardActions, CardContent } from '@mui/material'
import Title from '../title/Title'
import { TitleSizes } from '../../../models/common/typography'
import File from '../file/File'
import { Box } from '@mui/system'
import styles from './CardEdit.module.sass'
import Input from '../inputs/input/Input'
import ButtonCancel from '../button/button-cancel/ButtonCancel'
import ButtonComponent from '../button/button-component/ButtonComponent'
import { ChangeEvent, FC, FormEvent, useEffect, useState } from 'react'
import TagsInput from '../inputs/tags-input/TagsInput'
import { CardEditProps } from '../../../models/common/card-edit'
import { loadImgUrl } from '../../../utils'

const CardEdit: FC<CardEditProps> = (props) => {
    const [ state, setState ] = useState<{
        name: string,
        description: string,
    }>({name: '', description: ''})

    const [ tags, setTags ] = useState<string[]>([])
    const [ image, setImage ] = useState('')
    const [ error, setError ] = useState(false)

    useEffect(() => {
        setState({ name: props?.content?.name || '', description: props?.content?.about || '' })
        setTags(props?.content?.tags || [])
        setImage(loadImgUrl(props?.content?.image || '') || '')
    }, [props.content])

    const onSubmit = (event: FormEvent<HTMLFormElement>) => {
        event.preventDefault()
    }

    const reset = () => {
        setState({name: '', description: ''})
        setTags([])
        setError(false)
    }

    const handleName = (event: ChangeEvent<HTMLTextAreaElement>) => {
        setError(false)
        setState(current => ({ ...current, name: event.target.value }))
    }

    const handleDescription = (event: ChangeEvent<HTMLTextAreaElement>) => {
        setState(current => ({ ...current, description: event.target.value }))
    }

    return (
        <CardWrapper>
            <CardContent>
                <Title type={TitleSizes.DETAILS}>{props.title}</Title>
            </CardContent>

            <File type={'avatar'} image={image}/>

            <Box
                component="form"
                className={styles.form}
                onSubmit={onSubmit}
            >
                <Input
                    isRequired={true}
                    label={'Space name'}
                    value={state.name}
                    onChange={handleName}
                    errorText={error ? 'This space name is already taken' : ''}
                    isError={error}
                />

                <Input
                    label={'Description'}
                    value={state.description}
                    isMultiline={true}
                    minRows={4}
                    onChange={handleDescription}
                />

                <TagsInput tags={tags} setTags={setTags}/>

                <CardActions className={styles.actions}>
                    <ButtonCancel
                        className={styles.button}
                        onClick={props.onCancel || reset}
                    >
                        {props.cancelButton}
                    </ButtonCancel>
                    <ButtonComponent
                        variant={'contained'}
                        className={styles.button}
                        type={'submit'}
                    >
                        {props.saveButton}
                    </ButtonComponent>
                </CardActions>
            </Box>

        </CardWrapper>
    )
}

export default CardEdit
