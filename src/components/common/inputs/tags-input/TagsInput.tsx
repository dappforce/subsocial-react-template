import { ChangeEvent, FC } from 'react'
import Input from '../input/Input'
import styles from './TagsInput.module.sass'
import Tag from '../../tag/Tag'
import { TagsInputProps } from 'src/models/common/input'

const INVALID_CHARS = /[^a-zA-Z0-9 ]/g
const KEY = {
    backspace: 8,
    tab: 9,
    enter: 13
}

const TagsInput: FC<TagsInputProps> = (props) => {
    const onKeyDown = (event: any) => {
        const keyPressed = event.which

        if (keyPressed === KEY.enter || (keyPressed === KEY.tab && event.target.value)) {
            event.preventDefault()
            updateChips(event)
        }

        if (keyPressed === KEY.backspace && !event.target.value && props.tags.length) {
            deleteChip(props.tags[props.tags.length - 1])
        }
    }

    const clearInvalidChars = (event: any) => {
        const value = event.target.value

        if (INVALID_CHARS.test(value)) {
            event.target.value = value.replace(INVALID_CHARS, '')
        }
    }

    const updateChips = (event: ChangeEvent<HTMLTextAreaElement>) => {
        const value = event.target.value
        if (!value) return
        const tag = value.trim().toLowerCase()

        if (tag && props.tags.indexOf(tag) < 0) {
            props.setTags((current: any) => [ ...current, tag ])
        }

        event.target.value = ''
    }

    const deleteChip = (tag: string) => {
        const index = props.tags.indexOf(tag)

        if (index >= 0) {
            props.setTags((current: any) => [ ...current.slice(0, index), ...current.slice(index + 1) ])
        }
    }

    return (
        <div className={styles.tags}>
            <Input
                label={'Tags'}
                onKeyDown={onKeyDown}
                onKeyUp={clearInvalidChars}
                isMultiline={true}
                placeholder={'Press \'Enter\' or \'Tab\' key to add tags'}
                InputProps={{
                    startAdornment:
                        <>{props.tags.map((tag, i) => (
                            <Tag label={tag} key={i} onDelete={() => deleteChip(tag)}/>
                        ))}</>,
                }}
            />
        </div>
    )
}

export default TagsInput
