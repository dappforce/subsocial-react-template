import ReplyIcon from '@mui/icons-material/Reply';
import ButtonIcon from './button-icon/ButtonIcon';
import { FC } from 'react';
import { ButtonReplyProps } from 'src/models/common/button';
import { useTranslation } from 'react-i18next';
import Text from "../text/Text";
import { TextSizes } from "../../../models/common/typography";

const ButtonReply: FC<ButtonReplyProps> = ({ onClick, withLabel= true }) => {
  const { t } = useTranslation();

  return (
    <ButtonIcon onClick={onClick}>
      <ReplyIcon />
      {withLabel &&  <Text type={TextSizes.NORMAL}>{t('buttons.Reply')}</Text>}
    </ButtonIcon>
  );
};

export default ButtonReply;
