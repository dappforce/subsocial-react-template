import React from 'react';
import styles from "./File.module.sass";
import { useTranslation } from "react-i18next";
import { config } from 'src/config'

const FileWarning = () => {
  const { t } = useTranslation();

  return (
    <p className={styles.hint}>{t('imageShouldBeLessThan', { limit: config.loadImageLimitMb / (1024 * 1024) })}</p>
  );
};

export default FileWarning;
