import { FC } from 'react'
import Image from 'next/image'
import styles from './ButtonComment.module.sass'
import { commentIco } from '../../../../assets'
import { myLoader } from 'src/utils'
import ButtonIcon from '../button-icon/ButtonIcon'
import Text from '../../text/Text'
import { TextSizes } from 'src/models/common/typography'
import { ButtonCommentProps } from 'src/models/common/button'

const ButtonComment: FC<ButtonCommentProps> = ({value, ...props}) => {
    return (
        <ButtonIcon onClick={props.onClick}>
            <Image src={commentIco} width={24} height={24} alt={'Open comments'} loader={myLoader}/>
            {value ? <Text type={TextSizes.SECONDARY} className={styles.value}>{value}</Text> : null}
        </ButtonIcon>
    )
}

export default ButtonComment
