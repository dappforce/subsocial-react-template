import { FC, useCallback, useState } from 'react';
import ReactMarkdown from 'react-markdown';
import styles from './Account.module.sass';
import { CardContent } from '@mui/material';
import Text from '../common/text/Text';
import { TextSizes } from '../../models/common/typography';
import { AccountDescriptionProps } from '../../models/account';
import { useRouter } from 'next/router';
import { useTranslation } from 'react-i18next';

export const AccountDescription: FC<AccountDescriptionProps> = (props) => {
  const router = useRouter();
  const [isShowMore, setIsShowMore] = useState(!!router?.query.isAutoExpand);
  const { t } = useTranslation();

  const toggleText = useCallback(
    () => setIsShowMore((current) => !current),
    []
  );

  if (!props.about) return null;

  return (
    <CardContent className={styles.description}>
      <Text
        type={TextSizes.NORMAL}
        component={'div'}
        className={styles.content}
      >
        {isShowMore || !props.isShowMore ? (
          <ReactMarkdown className={'markdown-body'}>
            {props.about}
          </ReactMarkdown>
        ) : (
          props.summary
        )}{' '}
        {props.isShowMore && (
          <button onClick={toggleText} className={styles.seemore}>
            {!isShowMore ? t('general.seeMore') : t('general.seeLess')}
          </button>
        )}
      </Text>
    </CardContent>
  );
};
