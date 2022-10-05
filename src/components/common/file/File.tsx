import styles from './File.module.sass';
import { Button, CardContent, InputBase } from '@mui/material';
import { FC, useEffect, useRef, useState } from 'react';
import ButtonIcon from '../button/button-icon/ButtonIcon';
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline';
import { FileProps } from 'src/models/common/file';
import { useResponsiveSize } from '../../responsive/ResponsiveContext';
import { useApi } from 'src/components/api';
import FileWarning from "./FileWarning";
import classNames from "classnames";
import PhotoCameraOutlinedIcon from '@mui/icons-material/PhotoCameraOutlined';
import { config } from 'src/config'

const File: FC<FileProps> = ({
  type,
  image = '',
  setCidImage,
  setImage,
  setMbError,
  className,
}) => {
  const { isMobile } = useResponsiveSize();
  const [file, setFile] = useState('');
  const [isVisibleSettings, setIsVisibleSettings] = useState(isMobile);
  const imageRef = useRef<HTMLInputElement>(null);
  const { api } = useApi();

  const settingMbError = () => {
    setMbError(true);
    setTimeout(() => setMbError(false), 2000);
  };

  useEffect(() => {
    setFile(image)
  }, [image]);

  const selectFile = async (e: any) => {
    const addedImage = e.target.files[0];
    const addedImageURL = URL.createObjectURL(addedImage) || '';

    setFile(addedImageURL);
    setImage && setImage(addedImageURL);

    if (addedImage.size < config.loadImageLimitMb) {
      const ipfsImageCid = await api.ipfs.saveFile(addedImage);
      setCidImage(ipfsImageCid);
    } else {
      setFile(image);
      settingMbError();
    }

    e.target.value = ''
  };

  const deletedFile = () => {
    setCidImage('');
    setFile('');
  };

  const showOpenFileDialog = () => {
    if (imageRef.current) {
      imageRef.current.click();
    }
  };

  return (
    <CardContent className={classNames(styles.file, styles[type], { [className || '']: className })}>
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
              <PhotoCameraOutlinedIcon />
            </ButtonIcon>
            <ButtonIcon className={styles.buttonIcon} onClick={deletedFile}>
              <DeleteOutlineIcon />
            </ButtonIcon>
          </div>
        )}

        <Button
          component={'label'}
          className={classNames(styles.button, {[styles.border]: file})}
        >
          {file && type === 'avatar' && <PhotoCameraOutlinedIcon className={styles.hover} />}

          {/*eslint-disable-next-line @next/next/no-img-element*/}
          {file && <img src={file} alt={'upload'} className={styles.example} />}
          {!file && (
            <>
              <PhotoCameraOutlinedIcon />
              <p>{type === 'image' ? 'Upload cover image' : 'Upload'}</p>
              {type === 'image' && <FileWarning />}
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

      {type === 'avatar' && <FileWarning />}
    </CardContent>
  );
};

export default File;
