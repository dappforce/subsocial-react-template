import AvatarElement from '../avatar/AvatarElement'
import { AvatarSizes } from 'src/models/common/avatar'
import { Box, TextField } from '@mui/material'
import ButtonComponent from '../button/button-component/ButtonComponent'
import styles from './Comments.module.sass'
import { ChangeEvent, FC, useState } from 'react'
import { NewCommentProps } from 'src/models/comments'
import { useSelectProfile } from 'src/rtk/features/profiles/profilesHooks'
import { useMyAddress } from '../../../rtk/features/myAccount/myAccountHooks'

const NewComment: FC<NewCommentProps> = (props) => {
    const { className: inputClassName, placeholder, autoFocus } = props
    const [ comment, setComment ] = useState('')
    const address = useMyAddress()
    const user = useSelectProfile(address)

    const [ isDisabledButton, setIsDisabledButton ] = useState(true)
    const [ isShowButton, setIsShowButton ] = useState(false)
    const className = inputClassName ? `${inputClassName} ${styles.newCommentBox}` : styles.newCommentBox

    if (!user) return null

    const showButton = () => {
        setIsShowButton(true)
    }

    const hideButton = () => {
        if (!comment) setIsShowButton(false)
    }

    const handleChange = (event: ChangeEvent<HTMLTextAreaElement | HTMLInputElement>) => {
        setComment(event.target.value)

        if (event.target.value.length > 0) {
            setIsDisabledButton(false)
        } else {
            setIsDisabledButton(true)
        }
    }

    return (
        <Box component={'form'} className={className}>
            <AvatarElement
                src={user?.content?.avatar}
                size={AvatarSizes.SMALLER}
                id={user?.id}
            />
            <div className={styles.commentContent}>
                <TextField
                    id="outlined-basic"
                    variant="outlined"
                    placeholder={placeholder}
                    multiline
                    onChange={handleChange}
                    onFocus={showButton}
                    onBlur={hideButton}
                    value={comment}
                    autoFocus={autoFocus}
                    fullWidth
                    className={styles.textarea}
                />
                {isShowButton &&
                    <ButtonComponent className={styles.button} variant={'contained'} disabled={isDisabledButton}>
                        Send
                    </ButtonComponent>
                }
            </div>
        </Box>
    )
}

export default NewComment
