import { FC } from 'react';
import styles from './ButtonComment.module.sass';
import ButtonIcon from '../button-icon/ButtonIcon';
import Text from '../../text/Text';
import { TextSizes } from 'src/models/common/typography';
import { ButtonCommentProps } from 'src/models/common/button';
import IconComment from "../../icons/IconComment";

const ButtonComment: FC<ButtonCommentProps> = ({ value, ...props }) => {
  return (
    <ButtonIcon onClick={props.onClick}>
      <IconComment />
      {value ? (
        <Text type={TextSizes.NORMAL} className={styles.value}>
          {value}
        </Text>
      ) : null}
    </ButtonIcon>
  );
};

export default ButtonComment;
