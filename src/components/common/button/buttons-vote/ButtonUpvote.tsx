import styles from './ButtonsVote.module.sass'
import { FC } from 'react'
import ThumbUpIcon from '@mui/icons-material/ThumbUp'
import ThumbUpOutlinedIcon from '@mui/icons-material/ThumbUpOutlined'
import Text from '../../text/Text'
import { TextSizes } from 'src/models/common/typography'
import ButtonIcon from '../button-icon/ButtonIcon'
import { ButtonVoteProps } from 'src/models/common/button'

const ButtonUpvote: FC<ButtonVoteProps> = ({
                                               isActive = false,
                                               value = 0,
                                               isShowLabel,
                                               onClick
                                           }) => {
    return (
        <ButtonIcon onClick={onClick}>
            {!isActive ? <ThumbUpOutlinedIcon/> : <ThumbUpIcon className={styles.upvote}/>}
            {isShowLabel &&
            <Text type={TextSizes.SECONDARY} className={styles.label}>Upvote {value > 0 && `(${value})`}</Text>}
            {!isShowLabel && value > 0 && <Text type={TextSizes.SECONDARY}
                                                className={`${styles.value} ${isActive ? styles.green : ''}`}>{value}</Text>}
        </ButtonIcon>
    )
}

export default ButtonUpvote
