import AvatarElement from '../avatar/AvatarElement';
import { AvatarSizes } from 'src/models/common/avatar';
import { Box } from '@mui/material';
import styles from './Comments.module.sass';
import { FC, useCallback, useState } from 'react';
import { EditCommentProps } from 'src/models/comments';
import { useSelectProfile } from 'src/rtk/features/profiles/profilesHooks';
import { useMyAddress } from 'src/rtk/features/myAccount/myAccountHooks';
import Editor from '../editor/Editor';
import Router from 'next/router';
import TxButton from '../button/TxButton';
import { OptionIpfsContent } from '@subsocial/types/substrate/classes';
import { IpfsCid } from '@subsocial/types';
import { useApi } from 'src/components/api';
import { getTxParams } from 'src/components/utils/getTxParams';
import ButtonCancel from '../button/button-cancel/ButtonCancel';
import classNames from 'classnames';
import { useTranslation } from 'react-i18next';

const EditComment: FC<EditCommentProps> = (props) => {
  const { comment, className, autofocus, onClickCancel } = props;
  const { id } = comment.struct;
  const [body, setBody] = useState(comment?.content?.body || '');
  const address = useMyAddress();
  const user = useSelectProfile(address);
  const [isDisabledButton, setIsDisabledButton] = useState(false);
  const [isExpandedInput, setIsExpandedInput] = useState(false);
  const { api } = useApi();
  const [ipfsCid, setIpfsCid] = useState<IpfsCid>();
  const { t } = useTranslation();

  const newTxParams = (cid: IpfsCid) => {
    const update = {
      spaceId: null,
      content: OptionIpfsContent(cid),
      hidden: null,
    };

    return [id, update];
  };

  const handleCancel = () => {
    onClickCancel();
  };

  const handleChange = useCallback((value: string) => {
    setBody(value);

    if (value.length) {
      setIsDisabledButton(false);
    } else {
      setIsDisabledButton(true);
    }
  }, []);

  if (!user) return null;

  const options = {
    autofocus,
  };

  const expandForm = () => {
    setIsExpandedInput(true);
  };

  const rollUpForm = () => {
    if (!comment) setIsExpandedInput(false);
  };

  const onTxSuccess = () => {
    Router.reload();
  };

  return (
    <Box
      component={'form'}
      className={classNames(styles.newCommentBox, {
        [className as string]: className,
      })}
      onClick={expandForm}
    >
      <AvatarElement
        src={user?.content?.avatar}
        size={AvatarSizes.MEDIUM}
        id={user?.id}
      />
      <div className={styles.commentContent}>
        <Editor
          options={options}
          onFocus={expandForm}
          onBlur={rollUpForm}
          toolbar={isExpandedInput}
          onChange={handleChange}
          value={body}
          className={styles.editor}
        />
        {isExpandedInput && (
          <TxButton
            {...props}
            label={t('buttons.update')}
            accountId={address}
            tx={'posts.updatePost'}
            onSuccess={onTxSuccess}
            disabled={isDisabledButton}
            params={() =>
              getTxParams({
                json: { body },
                ipfs: api.subsocial.ipfs,
                setIpfsCid,
                buildTxParamsCallback: newTxParams,
              })
            }
            className={classNames({
              [styles.button]: true,
              [styles.buttonWithoutText]: !body,
            })}
            withLoader
            variant={'contained'}
          />
        )}

        <ButtonCancel onClick={handleCancel} className={styles.buttonCancel}>
          {t('buttons.cancel')}
        </ButtonCancel>
      </div>
    </Box>
  );
};

export default EditComment;
