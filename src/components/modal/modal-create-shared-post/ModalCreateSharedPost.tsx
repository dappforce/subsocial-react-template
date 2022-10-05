import { Box } from '@mui/system';
import { IpfsCid } from '@subsocial/api/types';
import { useRouter } from 'next/router';
import { FC, useCallback, useEffect, useState } from 'react';
import { useApi } from 'src/components/api';
import ButtonCancel from 'src/components/common/button/button-cancel/ButtonCancel';
import ButtonClose from 'src/components/common/button/button-close/ButtonClose';
import { getNewIdsFromEvent } from '@subsocial/api';
import TxButton from 'src/components/common/button/TxButton';
import Editor from 'src/components/common/editor/Editor';
import SelectSpaces from 'src/components/common/select-spaces/SelectSpaces';
import Title from 'src/components/common/title/Title';
import Post from 'src/components/post/post-item/Post';
import { getTxParams } from 'src/components/utils/getTxParams';
import { useLocalStorage } from 'src/hooks/useLocalStorage';
import { TxCallback, TxFailedCallback } from 'src/models/common/button';
import { TitleSizes } from 'src/models/common/typography';
import { useMyAddress } from 'src/store/features/myAccount/myAccountHooks';
import MaterialModal from '@mui/material/Modal';
import styles from './ModalCreateSharedPost.module.sass';
import { useSelectPost } from '../../../store/features/posts/postsHooks';
import { SharedPostStruct } from '@subsocial/api/types/dto';
import ButtonComponent from '../../common/button/button-component/ButtonComponent';
import { useTranslation } from 'react-i18next';
import { unpinIpfsCid } from '../../utils/unpinIpfsCid';

interface ModalCreateSharedPostProps {
  postId: string;
  open: boolean;
  onClose: () => void;
}

const ModalCreateSharedPost: FC<ModalCreateSharedPostProps> = ({
  postId,
  open,
  onClose,
}) => {
  const [body, setBody] = useState('');
  const [mySpaceIds, setMySpaceIds] = useState<string[]>([]);
  const [spaceId, setSpaceId] = useLocalStorage('spaceId', mySpaceIds[0] || '');
  const address = useMyAddress();
  const { api } = useApi();
  const router = useRouter();
  const postData = useSelectPost(postId);
  const { isSharedPost, originalPostId } =
    (postData?.post.struct as SharedPostStruct) || {};
  const hasSpace = !!mySpaceIds.length;
  const { t } = useTranslation();
  const json = { body };

  const sharedPostExtension = {
    SharedPost: isSharedPost ? originalPostId : postId,
  };

  const newTxParams = (cid: IpfsCid) => {
    return [spaceId, sharedPostExtension, { IPFS: cid }];
  };

  const handleChange = useCallback((value: string) => {
    setBody(value);
  }, []);

  const onSuccess: TxCallback = (txResult) => {
    const id = getNewIdsFromEvent(txResult)?.toString();

    onClose();

    router.push(`/${spaceId}/${id}`);
  };

  const onFailed: TxFailedCallback = (txResult, newCid) => {
    newCid && unpinIpfsCid(api.ipfs, newCid);
  };

  useEffect(() => {
    (async () => {
      if (!address) return null;
      await api.subsocial.substrate.spaceIdsByOwner(address).then((data) => {
        const ids = data.map((id) => id.toString());
        setMySpaceIds(ids);
      });
    })();
  }, [address, api]);

  return (
    <MaterialModal open={open} onClose={onClose} className={styles.modal}>
      <Box className={styles.box}>
        <div className={styles.header}>
          <Title type={TitleSizes.PREVIEW} className={styles.title}>
            {t('post.sharePost')}
          </Title>
          <ButtonClose onClick={onClose} className={styles.buttonClose} />
        </div>
        {hasSpace ? (
          <Box component={'form'} className={styles.form}>
            <SelectSpaces
              spaceIds={mySpaceIds}
              initialId={spaceId}
              onChange={setSpaceId}
              className={styles.select}
            />
            <Editor
              value={body}
              onChange={handleChange}
              placeholder={t('forms.placeholder.addComment')}
              autofocus
            />
            <Post
              postId={isSharedPost ? originalPostId : postId}
              isShowActions={false}
              className={styles.post}
            />
            <div className={styles.buttons}>
              <ButtonCancel onClick={onClose} className={styles.buttonCancel}>
                {t('buttons.cancel')}
              </ButtonCancel>
              <TxButton
                label={t('buttons.createAPost')}
                accountId={address}
                tx={'posts.createPost'}
                params={() =>
                  getTxParams({
                    json,
                    ipfs: api.ipfs,
                    buildTxParamsCallback: newTxParams,
                  })
                }
                onSuccess={onSuccess}
                onFailed={onFailed}
                variant={'contained'}
                className={styles.button}
                withLoader
              />
            </div>
          </Box>
        ) : (
          <ButtonComponent
            variant={'outlined'}
            className={styles.button}
            onClick={() => {
              router.push('/new');
            }}
          >
            {t('buttons.createMyFirstSpace')}
          </ButtonComponent>
        )}
      </Box>
    </MaterialModal>
  );
};

export default ModalCreateSharedPost;
