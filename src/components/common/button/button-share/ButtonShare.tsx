import { FC } from 'react'
import IosShareIcon from '@mui/icons-material/IosShare';
import Text from '../../text/Text'
import { TextSizes } from 'src/models/common/typography'
import styles from './ButtonsShare.module.sass'
import ButtonIcon from '../button-icon/ButtonIcon'
import { ButtonShareProps } from 'src/models/common/button'

const ButtonShare: FC<ButtonShareProps> = ({onClick, isShowLabel}) => {
    return (
        <ButtonIcon onClick={onClick}>
            <IosShareIcon/>
            {isShowLabel && <Text type={TextSizes.SECONDARY} className={styles.label}>Share</Text>}
        </ButtonIcon>
    )
}

export default ButtonShare
