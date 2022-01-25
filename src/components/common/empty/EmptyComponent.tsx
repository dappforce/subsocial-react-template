import React, { FC } from 'react';
import CardWrapper from '../card-wrapper/CardWrapper';
import Text from '../text/Text';
import { TextSizes } from 'src/models/common/typography';
import { EmptyProps } from 'src/models/common/empty';
import styles from './EmptyComponent.module.sass';

const EmptyComponent: FC<EmptyProps> = ({ text }) => {
  return (
    <CardWrapper className={styles.empty}>
      <Text type={TextSizes.NORMAL}>{text}</Text>
    </CardWrapper>
  );
};

export default EmptyComponent;
