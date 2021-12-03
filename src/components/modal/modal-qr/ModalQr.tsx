import { FC, useState } from 'react'
import QRCode from 'qrcode.react'
import Title from '../../common/title/Title'
import styles from './ModalQr.module.sass'
import { TextSizes, TitleSizes } from 'src/models/common/typography'
import ButtonComponent from '../../common/button/button-component/ButtonComponent'
import Text from '../../common/text/Text'
import { copyText } from '../../../utils'
import ContentCopyIcon from '@mui/icons-material/ContentCopy'
import { Box } from '@mui/system'
import ButtonClose from '../../common/button/button-close/ButtonClose'
import MaterialModal from '@mui/material/Modal'
import { ModalQrProps } from 'src/models/modal'
import Snackbar from '../../common/snackbar/Snackbar'

const ModalQrcode: FC<ModalQrProps> = ({id, onClose, open, ...props}) => {
    const [ isCopied, setIsCopied ] = useState(false)

    const handleClick = () => {
        setIsCopied(true)
        copyText(id)
    }

    return (
        <MaterialModal
            open={open}
            onClose={onClose}
            className={styles.modal}
            {...props}
        >
            <Box sx={{
                p: 2,
                pt: 1.25,
                maxWidth: 330,
                width: '100%',
                position: 'relative',
                m: 2,
                borderRadius: 0.5,
                overflow: 'hidden'
            }}>
                <ButtonClose onClick={onClose} className={styles.close}/>
                <Title type={TitleSizes.PREVIEW} sx={{pb: 2}}>Account address</Title>
                <Box className={styles.content}>
                    <Snackbar
                        open={isCopied}
                        onClose={() => setIsCopied(false)}
                        message={'Address copied!'}
                    />
                    <QRCode value={window.location.href} size={170}/>
                    <Text type={TextSizes.SECONDARY} className={styles.address}>{id}</Text>
                    <div className={styles.buttons}>
                        <ButtonComponent variant={'outlined'} onClick={onClose}
                                         className={styles.button}>Close</ButtonComponent>
                        <ButtonComponent variant={'contained'} onClick={handleClick} className={styles.button}>
                            <ContentCopyIcon/>
                            Copy
                        </ButtonComponent>
                    </div>
                </Box>
            </Box>
        </MaterialModal>
    )
}

export default ModalQrcode
