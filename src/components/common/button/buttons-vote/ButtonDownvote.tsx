import styles from './ButtonsVote.module.sass'
import { FC } from 'react'
import ThumbDownAltOutlinedIcon from '@mui/icons-material/ThumbDownAltOutlined'
import ThumbDownIcon from '@mui/icons-material/ThumbDown'
import Text from '../../text/Text'
import { TextSizes } from '../../../../models/common/typography'
import ButtonIcon from '../button-icon/ButtonIcon'
import { ButtonVoteProps } from 'src/models/common/button'

const ButtonDownvote: FC<ButtonVoteProps> = ({
                                                 isActive,
                                                 value = 0,
                                                 isShowLabel,
                                                 onClick
                                             }) => {
    return (
        <ButtonIcon onClick={onClick}>
            {!isActive ? <ThumbDownAltOutlinedIcon/> : <ThumbDownIcon className={styles.downvote}/>}
            {isShowLabel &&
            <Text type={TextSizes.SECONDARY} className={styles.label}>Downvote {value > 0 && `(${value})`}</Text>}
            {!isShowLabel && value > 0 &&
            <Text type={TextSizes.SECONDARY} className={`${styles.value} ${isActive ? styles.red : ''}`}>{value}</Text>}
        </ButtonIcon>
    )
}

export default ButtonDownvote
