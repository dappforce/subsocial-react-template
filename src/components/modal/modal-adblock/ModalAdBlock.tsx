import styles from './ModalAdBlock.module.sass';
import React, { FC } from 'react';
import { useRouter } from 'next/router';
import MaterialModal from '@mui/material/Modal';
import { Box } from '@mui/system';

import { TextSizes } from 'src/models/common/typography';
import { ModalAdBlockProps } from 'src/models/modal';
import ButtonComponent from 'src/components/common/button/button-component/ButtonComponent';
import Text from '../../common/text/Text';
import Image from 'src/components/common/image/Image';

const ModalAdBlock: FC<ModalAdBlockProps> = ({ open, ...props }) => {
  const router = useRouter();
  const onClick = () => router.reload();
  return (
    //@ts-ignore
    <MaterialModal open={open} className={styles.modal} {...props}>
      <Box className={styles.box}>
        <div className={styles.title}>
          <Image
            src={'/favicon.ico'}
            width={38.73}
            height={40}
            alt={'Subsocial'}
          />
          <Image
            src={'/subsocial_text.svg'}
            width={131.97}
            height={27.39}
            alt={'Subsocial'}
          />
        </div>

        <Box className={styles.content}>
          <Text type={TextSizes.NORMAL} className={styles.main_text}>
            Uh oh, it looks like you are using an ad blocker.
          </Text>
          <Text type={TextSizes.SECONDARY} className={styles.secondary_text}>
            This may affect the display of content on our site. We recommend
            turning it off to use the entire functionality of the site.
          </Text>
          <ButtonComponent
            variant={'contained'}
            onClick={onClick}
            className={styles.button}
          >
            Done! Reload page
          </ButtonComponent>
        </Box>
      </Box>
    </MaterialModal>
  );
};

export default ModalAdBlock;
