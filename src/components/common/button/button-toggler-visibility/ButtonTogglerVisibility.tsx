import {
  ButtonTogglerVisibilityProps,
  TypeContent,
} from 'src/models/common/button';
import { useMyAddress } from 'src/store/features/myAccount/myAccountHooks';
import TxButton from '../TxButton';
import styles from './ButtonsTogglerVisibility.module.sass';
import Router from 'next/router';
import { MenuItem } from '@mui/material';
import labelForMenuItem from 'src/components/utils/labelForMenuItem';
import { useTranslation } from 'react-i18next';
import { ReactNode } from 'react';
import classNames from 'classnames';

export const ButtonTogglerVisibility = ({
  contentStruct,
  typeContent,
  className,
  ...props
}: ButtonTogglerVisibilityProps) => {
  const myAddress = useMyAddress();
  const { hidden } = contentStruct;
  const { t } = useTranslation();
  const labelText = hidden ? t('buttons.makeVisible') : t(`buttons.hide${typeContent}`);

  let label: string | ReactNode;

  if (props.component === MenuItem) {
    label = labelForMenuItem(
      labelText,
      'hide',
      22,
      20
    );
  } else {
    label = labelText;
  }

  const tx = typeContent === TypeContent.Space
    ? 'spaces.updateSpace'
    : 'posts.updatePost';

  const buildTxParams = () => {
    const update = {
      hidden: !hidden,
    };

    return [ contentStruct.id, update ];
  };

  const onTxSuccess = () => {
    Router.reload();
  };

  return (
    <TxButton
      {...props}
      variant={'outlined'}
      label={label}
      accountId={myAddress}
      tx={tx}
      onSuccess={onTxSuccess}
      params={buildTxParams}
      className={classNames(styles.button, { [className as string]: className })}
    />
  );
};
