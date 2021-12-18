import { CircularProgress } from '@mui/material'
import styles from './Loader.module.sass'
import Text from '../text/Text'
import { TextSizes } from 'src/models/common/typography'
import { FC } from 'react'

const Loader: FC<{label?: string}> = ({label}) => {
    return <div className={styles.loader}>
        <CircularProgress size={20} />
        {label && <Text type={TextSizes.SECONDARY} className={styles.text}>{label}</Text>}
    </div>
}

export default Loader
