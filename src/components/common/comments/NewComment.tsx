import AvatarElement from '../avatar/AvatarElement';
import { AvatarSizes } from 'src/models/common/avatar';
import { Box } from '@mui/material';
import styles from './Comments.module.sass';
import { FC, useCallback, useState } from 'react';
import { CommentExtension, NewCommentProps } from 'src/models/comments';
import { useSelectProfile } from 'src/store/features/profiles/profilesHooks';
import { useMyAddress } from 'src/store/features/myAccount/myAccountHooks';
import Editor from '../editor/Editor';
import TxButton from '../button/TxButton';
import { IpfsContent } from '@subsocial/types/substrate/classes';
import { asCommentStruct } from '@subsocial/api/subsocial/flatteners/utils';
import { IpfsCid } from '@subsocial/types';
import { useApi } from 'src/components/api';
import { getTxParams } from 'src/components/utils/getTxParams';
import ButtonCancel from '../button/button-cancel/ButtonCancel';
import classNames from 'classnames';
import { useTranslation } from 'react-i18next';
import { TxCallback, TxFailedCallback } from '../../../models/common/button';
import { getNewIdsFromEvent } from '@subsocial/api';
import { upsertContent } from '../../../store/features/contents/contentsSlice';
import { useAppDispatch } from '../../../store/app/store';
import { fetchPosts } from '../../../store/features/posts/postsSlice';
import { unpinIpfsCid } from '../../utils/unpinIpfsCid';

const NewComment: FC<NewCommentProps> = (props) => {
  const {
    parentStruct,
    className,
    placeholder,
    autofocus,
    onClickCancel,
    addNewComment,
  } = props;
  const { id, isComment } = parentStruct;
  const [comment, setComment] = useState('');
  const address = useMyAddress();
  const dispatch = useAppDispatch();
  const user = useSelectProfile(address);
  const [isDisabledButton, setIsDisabledButton] = useState(true);
  const [isExpandedInput, setIsExpandedInput] = useState(false);
  const { api } = useApi();
  const { t } = useTranslation();
  let rootPostId = id;
  let extension: CommentExtension;

  if (isComment) {
    const comment = asCommentStruct(parentStruct);
    rootPostId = comment.rootPostId;

    extension = {
      parentId: id,
      rootPostId,
    };
  } else {
    extension = {
      parentId: null,
      rootPostId,
    };
  }

  const newExtension = { Comment: extension };

  const newTxParams = (cid: IpfsCid) => {
    return [null, newExtension, IpfsContent(cid)];
  };

  const handleChange = useCallback((value: string) => {
    setComment(value);

    if (value.length) {
      setIsDisabledButton(false);
    } else {
      setIsDisabledButton(true);
    }
  }, []);

  const expandForm = () => {
    setIsExpandedInput(true);
  };

  const handelCancel = () => {
    setComment('');
    setIsExpandedInput((current) => !current);
    setIsDisabledButton(true);
    onClickCancel && onClickCancel();
  };

  const onTxSuccess: TxCallback = (txResult, newCid) => {
    dispatch(
      upsertContent({
        id: newCid as string,
        body: comment,
        isShowMore: false,
        summary: comment,
      })
    );
    dispatch(
      fetchPosts({ ids: [getNewIdsFromEvent(txResult).toString()], api })
    );
    addNewComment(getNewIdsFromEvent(txResult).toString());
    handelCancel();
  };

  const onFailed: TxFailedCallback = (txResult, newCid) => {
    newCid && unpinIpfsCid(api.subsocial.ipfs, newCid);
  };

  return (
    <Box
      component={'form'}
      className={classNames(styles.newCommentBox, {
        [className as string]: className,
      })}
    >
      <AvatarElement
        src={user?.content?.avatar}
        size={AvatarSizes.SMALL}
        id={user?.id || ''}
      />
      <div className={styles.commentContent}>
        <Editor
          onFocus={expandForm}
          toolbar={isExpandedInput}
          onChange={handleChange}
          value={comment}
          placeholder={placeholder}
          autofocus={autofocus}
          className={classNames({
            [styles.editor]: true,
            [styles.editorActive]: isExpandedInput,
          })}
        />

        {isExpandedInput && (
          <>
            <TxButton
              {...props}
              label={t('buttons.send')}
              accountId={address}
              tx={'posts.createPost'}
              onSuccess={onTxSuccess}
              onFailed={onFailed}
              disabled={isDisabledButton}
              params={() =>
                getTxParams({
                  json: { body: comment },
                  ipfs: api.subsocial.ipfs,
                  buildTxParamsCallback: newTxParams,
                })
              }
              className={classNames({
                [styles.button]: true,
                [styles.buttonWithoutText]: !comment,
              })}
              withLoader
              variant={'contained'}
            />
            <ButtonCancel
              onClick={handelCancel}
              className={styles.buttonCancel}
            >
              {t('buttons.cancel')}
            </ButtonCancel>
          </>
        )}
      </div>
    </Box>
  );
};

export default NewComment;
