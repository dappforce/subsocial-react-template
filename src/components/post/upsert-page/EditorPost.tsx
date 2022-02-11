import { Box, CardActions, CardContent } from '@mui/material';
import { ChangeEvent, FC, useEffect, useState } from 'react';
import CardWrapper from 'src/components/common/card-wrapper/CardWrapper';
import Tabs from 'src/components/common/tabs/Tabs';
import { TabProps } from 'src/models/common/tabs';
import Title from 'src/components/common/title/Title';
import Layout from 'src/components/layout/Layout';
import { TitleSizes } from 'src/models/common/typography';
import styles from './UpsertPost.module.sass';
import { IpfsCid } from '@subsocial/types';
import File from 'src/components/common/file/File';
import Input from 'src/components/common/inputs/input/Input';
import Embed from 'src/components/common/Embed';
import TagsInput from 'src/components/common/inputs/tags-input/TagsInput';
import ButtonCancel from 'src/components/common/button/button-cancel/ButtonCancel';
import TxButton from 'src/components/common/button/TxButton';
import { useMyAddress } from 'src/rtk/features/myAccount/myAccountHooks';
import { TxCallback, TxFailedCallback } from 'src/models/common/button';
import { getNewIdsFromEvent } from 'src/components/common/button/buttons-vote/voting';
import { useRouter } from 'next/router';
import { getTxParams } from 'src/components/utils/getTxParams';
import { useApi } from 'src/components/api';
import { useSelectPost } from 'src/rtk/app/hooks';
import { loadImgUrl } from 'src/utils';
import Editor from 'src/components/common/editor/Editor';
import { dataPost, EditorPostProps, TypePostTabs } from 'src/models/post';
import SelectSpaces from 'src/components/common/select-spaces/SelectSpaces';
import { useLocalStorage } from 'src/hooks/useLocalStorage';
import Snackbar from 'src/components/common/snackbar/Snackbar';
import { SnackbarType } from 'src/models/common/snackbar';
import { getInitialPostValue } from '../../utils/getInitialPostValue';
import Post from '../post-item/Post';
import { SharedPostStruct } from '@subsocial/api/flat-subsocial/flatteners';
import { useTranslation } from 'react-i18next';
import { MAX_FILE_SIZE } from '../../../config/ListData.config';
import { CardEditType } from 'src/models/common/card-edit';
import { unpinIpfsCid } from 'src/components/utils/unpinIpfsCid';

export const EditorPost: FC<EditorPostProps> = (props) => {
  const { postId, isWithLink } = props;
  const address = useMyAddress();
  const router = useRouter();
  const { api } = useApi();
  const { spaceId: currentSpaceId } = router.query;
  const postData = useSelectPost(postId);
  const { isSharedPost, sharedPostId } =
    (postData?.post.struct as SharedPostStruct) || {};
  const initialPostValue = getInitialPostValue(postData?.post.content);

  const [activeTab, setActiveTab] = useState<TypePostTabs>(
    TypePostTabs.Article
  );
  const [tags, setTags] = useState<string[]>([]);
  const [title, setTitle] = useState('');
  const [body, setBody] = useState('');
  const [image, setImage] = useState('');
  const [link, setLink] = useState('');
  const [mySpaceIds, setMySpaceIds] = useState<string[]>([]);
  const [spaceId, setSpaceId] = useLocalStorage('spaceId', mySpaceIds[0] || '');
  const [mbError, setMbError] = useState(false);
  const { t } = useTranslation();
  const [cidImage, setCidImage] = useState<IpfsCid>();
  const [ipfsCid, setIpfsCid] = useState<IpfsCid>();

  const regularPostExtantion = { RegularPost: null };

  let json: dataPost;

  switch (activeTab) {
    case TypePostTabs.Article:
      json = {
        title,
        body,
        tags,
        image: cidImage ? cidImage : '',
      };
      break;
    case TypePostTabs.Video:
      json = {
        title,
        body,
        tags,
        link,
      };
  }

  const newTxParams = (cid: IpfsCid) => {
    if (postId) {
      //if updating the existing post
      const update = {
        currentSpaceId,
        content: { IPFS: cid },
        hidden: null,
      };
      return [postId, update];
    } else {
      //if creating a new post
      return [spaceId, regularPostExtantion, { IPFS: cid }];
    }
  };

  const tabs: TabProps[] = [
    {
      label: t('tabs.article'),
      tabValue: TypePostTabs.Article,
    },
    {
      label: t('tabs.video'),
      tabValue: TypePostTabs.Video,
    },
  ];

  const handleTitle = (event: ChangeEvent<HTMLTextAreaElement>) => {
    setTitle(event.target.value);
  };

  const handleBody = (value: string) => {
    setBody(value);
  };

  const options = {
    placeholder: t('forms.placeholder.postBody'),
  };

  const handleLink = (event: ChangeEvent<HTMLTextAreaElement>) => {
    setLink(event.target.value);
  };

  const reset = postId
    ? () => {
        setTags(initialPostValue.tags || []);
        setTitle(initialPostValue.title || '');
        setBody(initialPostValue.body || '');
        setCidImage(initialPostValue.image || '');
        setLink(initialPostValue.link || '');
      }
    : () => {
        setTags([]);
        setTitle('');
        setBody('');
        setImage('');
        setLink('');
      };

  const onSuccess: TxCallback = (txResult, newCid) => {
    const id = postId || getNewIdsFromEvent(txResult)?.toString();

    if (postData) {
      newCid &&
        unpinIpfsCid(
          api.subsocial.ipfs,
          //@ts-ignore
          postData?.post?.content?.id,
          newCid
        );

      cidImage &&
        unpinIpfsCid(
          api.subsocial.ipfs,
          postData?.post?.content?.image,
          cidImage
        );
      router.push(`/${currentSpaceId || spaceId}/${id}`);
    } else {
      router.push(`/${currentSpaceId || spaceId}/${id}`);
    }
  };

  const onFailed: TxFailedCallback = (txResult, newCid) => {
    if (postData) {
      newCid &&
        unpinIpfsCid(
          api.subsocial.ipfs,
          newCid,
          //@ts-ignore
          postData?.post?.content?.id
        );

      cidImage &&
        unpinIpfsCid(
          api.subsocial.ipfs,
          cidImage,
          postData?.post?.content?.image
        );
    }
  };

  useEffect(() => {
    if (isWithLink) {
      setActiveTab(TypePostTabs.Video);
    }
    setTags(initialPostValue.tags || []);
    setTitle(initialPostValue.title || '');
    setBody(initialPostValue.body || '');
    setCidImage(initialPostValue.image || '');
    setLink(initialPostValue.link || '');
  }, [props]);

  useEffect(() => {
    (async () => {
      if (!address) return null;
      const mySpaceIds = await api.subsocial.substrate
        .spaceIdsByOwner(address)
        .then((data) => {
          const ids = data.map((id) => id.toString());
          setMySpaceIds(ids);
        });
    })();
  }, [address, api]);

  return (
    <Layout>
      <CardWrapper>
        <Snackbar
          type={SnackbarType.Error}
          open={mbError}
          message={t('imageShouldBeLessThan', {
            limit: MAX_FILE_SIZE / 1000000,
          })}
        />
        <CardContent>
          <Title type={TitleSizes.DETAILS}>
            {postId ? t('buttons.update') : t('buttons.newPost')}
          </Title>

          {!isSharedPost && (
            <Tabs
              value={activeTab}
              tabs={tabs}
              setValue={setActiveTab}
              className={styles.tabs}
            />
          )}

          {!postId && (
            <SelectSpaces
              spaceIds={mySpaceIds}
              initialId={spaceId}
              className={styles.select}
              onChange={setSpaceId}
            />
          )}

          {!isSharedPost && activeTab === TypePostTabs.Article && (
            <File
              type={'image'}
              image={loadImgUrl(initialPostValue.image || '') || image}
              setCidImage={setCidImage}
              setImage={setImage}
              setMbError={setMbError}
            />
          )}

          <Box component={'form'} className={styles.form}>
            {!isSharedPost && activeTab === TypePostTabs.Video && (
              <>
                <Input
                  label={t('forms.placeholder.videoUrl')}
                  value={link}
                  onChange={handleLink}
                />

                <Embed link={link} />
              </>
            )}

            {!isSharedPost && (
              <Input
                label={t('forms.placeholder.postTitle')}
                value={title}
                onChange={handleTitle}
              />
            )}

            <Editor options={options} value={body} onChange={handleBody} />

            {!isSharedPost && <TagsInput tags={tags} setTags={setTags} />}

            {isSharedPost && (
              <Post
                postId={sharedPostId}
                isShowActions={false}
                className={styles.post}
              />
            )}

            <CardActions className={styles.buttons}>
              <ButtonCancel className={styles.buttonCancel} onClick={reset}>
                {t('buttons.resetForm')}
              </ButtonCancel>
              <TxButton
                label={postId ? t('buttons.update') : t('buttons.createPost')}
                accountId={address}
                className={styles.buttonEdit}
                tx={postId ? 'posts.updatePost' : 'posts.createPost'}
                params={() =>
                  getTxParams({
                    json,
                    ipfs: api.subsocial.ipfs,
                    setIpfsCid,
                    buildTxParamsCallback: newTxParams,
                  })
                }
                onSuccess={onSuccess}
                onFailed={onFailed}
                variant={'contained'}
                withLoader
                cardType={CardEditType.Post}
              />
            </CardActions>
          </Box>
        </CardContent>
      </CardWrapper>
    </Layout>
  );
};
