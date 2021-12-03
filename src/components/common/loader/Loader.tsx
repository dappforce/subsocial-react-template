import { CircularProgress } from '@mui/material'
import styles from './Loader.module.sass'
import Text from '../text/Text'
import { TextSizes } from 'src/models/common/typography'

const Loader = () => {
    return <div className={styles.loader}>
        <CircularProgress size={20} />
        <Text type={TextSizes.SECONDARY} className={styles.text}>Loading...</Text>
    </div>
}

export default Loader
