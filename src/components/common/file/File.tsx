import styles from './File.module.sass';
import { Button, CardContent, InputBase } from '@mui/material';
import { FC, useEffect, useMemo, useRef, useState } from 'react';
import ButtonIcon from '../button/button-icon/ButtonIcon';
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline';
import { FileProps } from 'src/models/common/file';
import { useResponsiveSize } from '../../responsive/ResponsiveContext';
import Image from '../image/Image';
import { useApi } from 'src/components/api';
import { MAX_FILE_SIZE } from 'src/config/ListData.config';
import { useTranslation } from 'react-i18next';

const File: FC<FileProps> = ({
  type,
  image,
  setCidImage,
  setImage,
  setMbError,
}) => {
  const { isMobile } = useResponsiveSize();
  const [file, setFile] = useState('');
  const [isVisibleSettings, setIsVisibleSettings] = useState(isMobile);
  const imageRef = useRef<HTMLInputElement>(null);
  const { t } = useTranslation();
  const imgWarning = useMemo(
    () => <p className={styles.hint}>{t('imageShouldBeLessThan', { limit: MAX_FILE_SIZE / 1000000 })}</p>,
    []
  );
  const { api } = useApi();
  const settingMbError = () => {
    setMbError(true);
    setTimeout(() => setMbError(false), 2000);
  };

  useEffect(() => {
    if (image) setFile(image);
  }, [image]);

  const selectFile = async (e: any) => {
    const addedImage = URL.createObjectURL(e.target.files[0]) || '';

    setFile(addedImage);
    setImage && setImage(addedImage);

    if (e.target.files[0].size < MAX_FILE_SIZE) {
      const ipfsImageCid = await api.subsocial.ipfs.saveFile(e.target.files[0]);
      setCidImage(ipfsImageCid);
    } else {
      image
        ? (setFile(image), settingMbError())
        : (setFile(''), settingMbError());
    }
  };

  const deletedFile = () => {
    setFile('');
  };

  const showOpenFileDialog = () => {
    if (imageRef.current) {
      imageRef.current.click();
    }
  };

  return (
    <CardContent className={`${styles.file} ${styles[type]}`}>
      <div
        className={styles.wrapper}
        onMouseEnter={() => setIsVisibleSettings(true)}
        onMouseLeave={() => {
          if (!isMobile) setIsVisibleSettings(false);
        }}
      >
        {file && type === 'avatar' && (
          <ButtonIcon onClick={deletedFile} className={styles.delete}>
            <DeleteOutlineIcon />
          </ButtonIcon>
        )}

        {file && type === 'image' && isVisibleSettings && (
          <div className={styles.settings} onClick={(e) => e.stopPropagation()}>
            <ButtonIcon
              className={styles.buttonIcon}
              onClick={showOpenFileDialog}
            >
              <Image src={'/photo.svg'} width={20} height={20} alt={'upload'} />
            </ButtonIcon>
            <ButtonIcon className={styles.buttonIcon} onClick={deletedFile}>
              <DeleteOutlineIcon />
            </ButtonIcon>
          </div>
        )}

        <Button
          component={'label'}
          className={`${styles.button} ${file && styles.border}`}
        >
          {file && type === 'avatar' && (
            <div className={styles.hover}>
              <Image
                src={'/photo.svg'}
                width={20}
                height={20}
                className={styles.hover}
                alt={'upload'}
              />
            </div>
          )}
          {/*eslint-disable-next-line @next/next/no-img-element*/}
          {file && <img src={file} alt={'upload'} className={styles.example} />}
          {!file && (
            <>
              <Image src={'/photo.svg'} width={20} height={20} alt={'upload'} />
              <p>{type === 'image' ? 'Upload cover image' : 'Upload'}</p>
              {type === 'image' && imgWarning}
            </>
          )}

          <InputBase
            type={'file'}
            className={styles.input}
            onChange={selectFile}
            ref={imageRef}
          />
        </Button>
      </div>

      {type === 'avatar' && imgWarning}
    </CardContent>
  );
};

export default File;
