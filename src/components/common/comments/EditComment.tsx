import AvatarElement from '../avatar/AvatarElement';
import { AvatarSizes } from 'src/models/common/avatar';
import { Box } from '@mui/material';
import styles from './Comments.module.sass';
import { FC, useCallback, useState } from 'react';
import { EditCommentProps } from 'src/models/comments';
import { useSelectProfile } from 'src/store/features/profiles/profilesHooks';
import { useMyAddress } from 'src/store/features/myAccount/myAccountHooks';
import Editor from '../editor/Editor';
import TxButton from '../button/TxButton';
import { OptionIpfsContent } from '@subsocial/api/substrate/wrappers';
import { IpfsCid } from '@subsocial/api/types';
import { useApi } from 'src/components/api';
import { getTxParams } from 'src/components/utils/getTxParams';
import ButtonCancel from '../button/button-cancel/ButtonCancel';
import classNames from 'classnames';
import { useTranslation } from 'react-i18next';
import { useAppDispatch } from "../../../store/app/store";
import { upsertPost } from "../../../store/features/posts/postsSlice";
import { TxCallback, TxFailedCallback } from "../../../models/common/button";
import { upsertContent } from "../../../store/features/contents/contentsSlice";
import { unpinIpfsCid } from "../../utils/unpinIpfsCid";

const EditComment: FC<EditCommentProps> = (props) => {
  const { comment, className, autofocus, onClickCancel } = props;
  const { id } = comment.struct;
  const [body, setBody] = useState(comment?.content?.body || '');
  const address = useMyAddress();
  const user = useSelectProfile(address);
  const dispatch = useAppDispatch();
  const [isDisabledButton, setIsDisabledButton] = useState(false);
  const [isExpandedInput, setIsExpandedInput] = useState(false);
  const { api } = useApi();
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

  const expandForm = () => {
    setIsExpandedInput(true);
  };

  const rollUpForm = () => {
    if (!comment) setIsExpandedInput(false);
  };

  const onTxSuccess: TxCallback = (txResult, newCid) => {
    dispatch(upsertContent({id: newCid as string, body, isShowMore: false, summary: body }))
    dispatch(upsertPost({...comment.struct, contentId: newCid as string }))
    onClickCancel()

    newCid &&
    unpinIpfsCid(
      api.ipfs,
      comment.struct.contentId,
      newCid,
    );
  };

  const onFailed: TxFailedCallback = (txResult, newCid) => {
    newCid &&
    unpinIpfsCid(
      api.ipfs,
      newCid,
      comment.struct.contentId,
    );
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
        src={user?.content?.image}
        size={AvatarSizes.SMALL}
        id={user?.id}
      />
      <div className={styles.commentContent}>
        <Editor
          onFocus={expandForm}
          onBlur={rollUpForm}
          toolbar={isExpandedInput}
          onChange={handleChange}
          value={body}
          className={styles.editor}
          autofocus={autofocus}
        />
        {isExpandedInput && (
          <TxButton
            {...props}
            label={t('buttons.update')}
            accountId={address}
            tx={'posts.updatePost'}
            onSuccess={onTxSuccess}
            onFailed={onFailed}
            disabled={isDisabledButton}
            params={() =>
              getTxParams({
                json: { body },
                ipfs: api.ipfs,
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
