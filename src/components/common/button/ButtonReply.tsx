import ReplyIcon from '@mui/icons-material/Reply';
import ButtonIcon from './button-icon/ButtonIcon';
import { FC } from 'react';
import { ButtonReplyProps } from 'src/models/common/button';

const ButtonReply: FC<ButtonReplyProps> = ({ onClick }) => {
  return (
    <ButtonIcon onClick={onClick}>
      <ReplyIcon />
      Reply
    </ButtonIcon>
  );
};

export default ButtonReply;
