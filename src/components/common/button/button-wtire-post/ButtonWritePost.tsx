import React, { FC } from 'react';
import ButtonComponent from '../button-component/ButtonComponent';
import { useTranslation } from 'react-i18next';
import { ButtonComponentProps } from 'src/models/common/button';
import { useRouter } from 'next/router';

const ButtonWritePost: FC<ButtonComponentProps> = ({ onClick, disabled, ...props }) => {
  const { t } = useTranslation();
  const router = useRouter();

  const writePost = () => {
    onClick && onClick();
    router.push('/posts/new');
  }

  return (
    <ButtonComponent
      variant={'contained'}
      onClick={writePost}
      disabled={disabled}
      {...props}
    >
      {t('buttons.writePost')}
    </ButtonComponent>
  );
};

export default ButtonWritePost;
