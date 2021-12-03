import { FC } from 'react'
import styles from './Icons.module.sass'
import ThumbDownAltOutlinedIcon from '@mui/icons-material/ThumbDownAltOutlined'
import ThumbDownIcon from '@mui/icons-material/ThumbDown'
import { IconVoteProps } from 'src/models/common/icon'

const IconDislike: FC<IconVoteProps> = ({type}) => {
    switch (type) {
        case 'outline':
            return <ThumbDownAltOutlinedIcon />
        case 'contained':
            return <ThumbDownIcon className={styles.dislike}/>
        default:
            return <ThumbDownAltOutlinedIcon />
    }
}

export default IconDislike
