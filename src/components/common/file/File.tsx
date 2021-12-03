import styles from './File.module.sass'
import Image from 'next/image'
import { photoIco } from 'src/assets'
import { Button, CardContent, InputBase } from '@mui/material'
import { FC, useEffect, useMemo, useRef, useState } from 'react'
import ButtonIcon from '../button/button-icon/ButtonIcon'
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline'
import { myLoader } from 'src/utils'
import { FileProps } from 'src/models/common/file'
import { useResponsiveSize } from '../../responsive/ResponsiveContext'

const File: FC<FileProps> = ({type, image}) => {
    const {isMobile} = useResponsiveSize()
    const [ file, setFile ] = useState('')
    const [ isVisibleSettings, setIsVisibleSettings ] = useState(isMobile)
    const imageRef = useRef<HTMLInputElement>(null)
    const imgWarning = useMemo(() => <p className={styles.hint}>{'Image should be less than 2 MB'}</p>, [])

    useEffect(() => {
        if (image) setFile(image)
    }, [ image ])

    const selectFile = (e: any) => {
        setFile(URL.createObjectURL(e.target.files[0]))
    }

    const deletedFile = () => {
        setFile('')
    }

    const showOpenFileDialog = () => {
        if (imageRef.current) {
            imageRef.current.click()
        }
    }

    return (
        <CardContent className={`${styles.file} ${styles[type]}`}>
            <div
                className={styles.wrapper}
                onMouseEnter={() => setIsVisibleSettings(true)}
                onMouseLeave={() => {
                    if (!isMobile) setIsVisibleSettings(false)
                }}
            >
                {file && type === 'avatar' && <ButtonIcon onClick={deletedFile} className={styles.delete}>
                    <DeleteOutlineIcon/>
                </ButtonIcon>}

                {file && type === 'image' && isVisibleSettings &&
                <div
                    className={styles.settings}
                    onClick={(e) => e.stopPropagation()}
                >
                    <ButtonIcon className={styles.buttonIcon} onClick={showOpenFileDialog}>
                        <Image src={photoIco} width={20} height={20} alt={'upload'} loader={myLoader}/>
                    </ButtonIcon>
                    <ButtonIcon className={styles.buttonIcon} onClick={deletedFile}>
                        <DeleteOutlineIcon/>
                    </ButtonIcon>
                </div>
                }

                <Button component={'label'} className={`${styles.button} ${file && styles.border}`}>
                    {file && type === 'avatar' &&
                    <div className={styles.hover}>
                        <Image
                            src={photoIco}
                            width={20} height={20}
                            className={styles.hover}
                            alt={'upload'}
                            loader={myLoader}/>
                    </div>}
                    {/*eslint-disable-next-line @next/next/no-img-element*/}
                    {file && <img src={file} alt={'upload'} className={styles.example}/>}
                    {!file && <>
                        <Image src={photoIco} width={20} height={20} alt={'upload'} loader={myLoader}/>
                        <p>{type === 'image' ? 'Upload cover image' : 'Upload'}</p>
                        {type === 'image' && imgWarning}
                    </>}

                    <InputBase type={'file'} className={styles.input} onChange={selectFile} ref={imageRef}/>
                </Button>
            </div>

            {type === 'avatar' && imgWarning}
        </CardContent>
    )
}

export default File
