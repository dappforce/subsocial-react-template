import { FC, useRef, useState } from 'react'
import MoreVertIcon from '@mui/icons-material/MoreVert'
import IconButton from '@mui/material/IconButton'
import { Menu, MenuItem } from '@mui/material'
import { useModal } from 'src/hooks/useModal'
import Modal from '../../../modal/Modal'
import ModalVotes from '../../../modal/modal-reactions/ModalVotes'
import { ButtonOptionsProps } from 'src/models/common/button'
import styles from './ButtonOptions.module.sass'

const Options: FC<ButtonOptionsProps> = ({ withReactions, withHidden, isHidden, postId, ...props}) => {
    const [ anchorEl, setAnchorEl ] = useState<HTMLButtonElement | null>(null)
    const { isVisible, toggleModal } = useModal()
    const open = Boolean(anchorEl)
    const buttonRef = useRef(null)

    const openModal = () => {
        toggleModal()
        handleClose()
    }

    const handleClick = () => {
        setAnchorEl(buttonRef.current)
    }

    const handleClose = () => {
        setAnchorEl(null)
    }

    return (
        <>
            {postId && <Modal open={isVisible} onClose={toggleModal}>
                <ModalVotes postId={postId}/>
            </Modal>}
            <div className={styles.menu}>
                <IconButton
                    {...props}
                    ref={buttonRef}
                    aria-label="more"
                    id="long-button"
                    aria-controls="long-menu"
                    aria-expanded={open ? 'true' : undefined}
                    aria-haspopup="true"
                    onClick={handleClick}
                >
                    <MoreVertIcon/>
                </IconButton>

                <Menu
                    id="long-menu"
                    MenuListProps={{'aria-labelledby': 'long-button'}}
                    anchorEl={anchorEl}
                    open={open}
                    onClose={handleClose}
                    PaperProps={{style: {width: 120}}}
                    anchorOrigin={{vertical: 'bottom', horizontal: 'right'}}
                    transformOrigin={{vertical: 'top', horizontal: 'right'}}
                >
                    {withReactions && <MenuItem onClick={openModal} className={styles.item}>
                        View reactions
                    </MenuItem>}
                    {withHidden && <MenuItem className={styles.item}>
                        {isHidden ? 'Make visible' : 'Hide'}
                    </MenuItem>}
                    <MenuItem onClick={handleClose} className={styles.item}>
                        View on IPFS
                    </MenuItem>
                </Menu>
            </div>
        </>
    )
}

export default Options
