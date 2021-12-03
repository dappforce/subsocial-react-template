import { FC, useState } from 'react'
import styles from './Address.module.sass'
import { copyIco, qr, walletIco } from 'src/assets'
import { AddressProps, AddressSize } from 'src/models/common/address-props'
import Snackbar from '../snackbar/Snackbar'
import { toShortAddress } from '../../utils/address'
import { copyText, myLoader } from 'src/utils'
import { Grow, IconButton } from '@mui/material'
import Image from 'next/image'
import ButtonIcon from '../button/button-icon/ButtonIcon'
import Text from '../text/Text'
import { TextSizes } from 'src/models/common/typography'
import { useModal } from 'src/hooks/useModal'
import ModalQr from '../../modal/modal-qr/ModalQr'
import { useResponsiveSize } from '../../responsive/ResponsiveContext'

const Address: FC<AddressProps> = ({
                                       isQr,
                                       isIcon,
                                       label,
                                       textProps,
                                       className,
                                       lengthOfAddress,
                                       size,
                                       isCopy = true
                                   }) => {
    const {isMobile} = useResponsiveSize()
    const [ isCopied, setIsCopied ] = useState(false)
    const {toggleModal, isVisible} = useModal()
    const classname = className ? `${styles.address} ${className}` : styles.address
    const shortedAddress = toShortAddress(label, lengthOfAddress)
    const sizes: Record<AddressSize, any> = {
        sm: {type: TextSizes.SECONDARY, size: 16},
        lg: {type: TextSizes.NORMAL, size: 24}
    }

    return (
        <div className={classname}>
            {isIcon &&
            <Image src={walletIco} width={sizes[size].size} height={sizes[size].size} alt={'wallet'}
                   loader={myLoader}/>
            }
            <Text type={sizes[size].type} paragraph {...textProps}>{shortedAddress}</Text>
            {(isCopy || isMobile) &&
            <>
                <Grow in={true} style={{transformOrigin: '0 0 0'}}>
                    <IconButton onClick={(e) => {
                        e.stopPropagation()
                        copyText(label)
                        setIsCopied(true)
                    }}>
                        <Image src={copyIco} width={sizes[size].size} height={sizes[size].size}
                               alt="copy" loader={myLoader}/>
                    </IconButton>
                </Grow>
                <Snackbar
                    open={isCopied}
                    onClose={() => setIsCopied(false)}
                    message={'Address copied!'}
                />
            </>

            }
            {isQr &&
            <>
                <ModalQr id={label} open={isVisible} onClose={toggleModal}/>
                <ButtonIcon className={styles.qr} onClick={toggleModal}>
                    <Image src={qr} width={sizes[size].size} height={sizes[size].size} alt={'qr'} loader={myLoader}/>
                </ButtonIcon>
            </>
            }
        </div>
    )
}

export default Address
