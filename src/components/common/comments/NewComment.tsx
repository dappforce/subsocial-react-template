import AvatarElement from '../avatar/AvatarElement';
import { AvatarSizes } from 'src/models/common/avatar';
import { Box } from '@mui/material';
import styles from './Comments.module.sass';
import { FC, useCallback, useState } from 'react';
import { CommentExtension, NewCommentProps } from 'src/models/comments';
import { useSelectProfile } from 'src/rtk/features/profiles/profilesHooks';
import { useMyAddress } from 'src/rtk/features/myAccount/myAccountHooks';
import Editor from '../editor/Editor';
import Router from 'next/router';
import TxButton from '../button/TxButton';
import { IpfsContent } from '@subsocial/types/substrate/classes';
import { asCommentStruct } from '@subsocial/api/flat-subsocial/flatteners';
import { IpfsCid } from '@subsocial/types';
import { useApi } from 'src/components/api';
import { getTxParams } from 'src/components/utils/getTxParams';
import ButtonCancel from '../button/button-cancel/ButtonCancel';
import classNames from 'classnames';

const NewComment: FC<NewCommentProps> = (props) => {
  const { parentStruct, className, placeholder, autofocus, onClickCancel } =
    props;
  const { id, isComment } = parentStruct;
  const [comment, setComment] = useState('');
  const address = useMyAddress();
  const user = useSelectProfile(address);
  const [isDisabledButton, setIsDisabledButton] = useState(true);
  const [isExpandedInput, setIsExpandedInput] = useState(false);
  const { api } = useApi();
  const [ipfsCid, setIpfsCid] = useState<IpfsCid>();
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

  const options = {
    placeholder,
    autofocus,
  };

  const expandForm = () => {
    setIsExpandedInput(true);
  };

  const handelCancel = () => {
    setComment('');
    setIsExpandedInput((current) => !current);
    setIsDisabledButton(true);
    onClickCancel && onClickCancel();
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
    >
      <AvatarElement
        src={user?.content?.avatar}
        size={AvatarSizes.MEDIUM}
        id={user?.id || ''}
      />
      <div className={styles.commentContent}>
        <Editor
          options={options}
          onFocus={expandForm}
          toolbar={isExpandedInput}
          onChange={handleChange}
          value={comment}
          className={classNames({
            [styles.editor]: true,
            [styles.editorActive]: isExpandedInput,
          })}
        />

        {isExpandedInput && (
          <>
            <TxButton
              {...props}
              label={'Send'}
              accountId={address}
              tx={'posts.createPost'}
              onSuccess={onTxSuccess}
              disabled={isDisabledButton}
              params={() =>
                getTxParams({
                  json: { body: comment },
                  ipfs: api.subsocial.ipfs,
                  setIpfsCid,
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
              Cancel
            </ButtonCancel>
          </>
        )}
      </div>
    </Box>
  );
};

export default NewComment;
