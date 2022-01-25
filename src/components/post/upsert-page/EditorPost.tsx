import { Box, CardActions, CardContent } from '@mui/material';
import { ChangeEvent, FC, useEffect, useState } from 'react';
import CardWrapper from 'src/components/common/card-wrapper/CardWrapper';
import Tabs from 'src/components/common/tabs/Tabs';
import { TabProps } from 'src/models/common/tabs';
import Title from 'src/components/common/title/Title';
import Layout from 'src/components/layout/Layout';
import { TitleSizes } from 'src/models/common/typography';
import styles from './UpsertPost.module.sass';
import { IpfsCid, PostContent } from '@subsocial/types';
import File from 'src/components/common/file/File';
import Input from 'src/components/common/inputs/input/Input';
import Embed from 'src/components/common/Embed';
import TagsInput from 'src/components/common/inputs/tags-input/TagsInput';
import ButtonCancel from 'src/components/common/button/button-cancel/ButtonCancel';
import TxButton from 'src/components/common/button/TxButton';
import { useMyAddress } from 'src/rtk/features/myAccount/myAccountHooks';
import { TxCallback } from 'src/models/common/button';
import { getNewIdsFromEvent } from 'src/components/common/button/buttons-vote/voting';
import { useRouter } from 'next/router';
import { getTxParams } from 'src/components/utils/getTxParams';
import { useApi } from 'src/components/api';
import { useSelectPost } from 'src/rtk/app/hooks';
import { loadImgUrl } from 'src/utils';
import Editor from 'src/components/common/editor/Editor';
import { EditorPostProps } from 'src/models/post';
import SelectSpaces from 'src/components/common/select-spaces/SelectSpaces';
import { useLocalStorage } from 'src/hooks/useLocalStorage';
import Snackbar from 'src/components/common/snackbar/Snackbar';
import { SnackbarType } from 'src/models/common/snackbar';

export const enum TypePostTabs {
  Article = 'article',
  Video = 'video',
}

interface dataPost {
  title: string;
  body: string;
  tags: string[];
  image?: string | IpfsCid;
  link?: string;
}

export const getInitialPostValue = (
  post: PostContent | undefined
): {
  title?: string;
  body?: string;
  image?: string;
  link?: string;
  tags?: string[];
} => {
  if (post) {
    return { ...post };
  }
  return {};
};

export const EditorPost: FC<EditorPostProps> = (props) => {
  const { postId, isWithLink } = props;
  const address = useMyAddress();
  const router = useRouter();
  const { api } = useApi();
  const { spaceId: currentSpaceId } = router.query;
  const postData = useSelectPost(postId);
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
      label: 'Article',
      tabValue: TypePostTabs.Article,
    },
    {
      label: 'Video',
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
    placeholder: 'Post body',
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

  const onSuccess: TxCallback = (txResult) => {
    const id = postId || getNewIdsFromEvent(txResult)?.toString();

    router.push(`/${currentSpaceId || spaceId}/${id}`);
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
          message={'Image should be less than 2mb'}
        />
        <CardContent>
          <Title type={TitleSizes.DETAILS}>
            {postId ? 'Update post' : 'New post'}
          </Title>

          <Tabs
            value={activeTab}
            tabs={tabs}
            setValue={setActiveTab}
            className={styles.tabs}
          />

          {!postId && (
            <SelectSpaces
              spaceIds={mySpaceIds}
              initialId={spaceId}
              className={styles.select}
              onChange={setSpaceId}
            />
          )}

          {activeTab === TypePostTabs.Article && (
            <File
              type={'image'}
              image={loadImgUrl(initialPostValue.image || '') || image}
              setCidImage={setCidImage}
              setImage={setImage}
              setMbError={setMbError}
            />
          )}

          <Box component={'form'} className={styles.form}>
            {activeTab === TypePostTabs.Video && (
              <>
                <Input label={'Video URL'} value={link} onChange={handleLink} />

                <Embed link={link} />
              </>
            )}

            <Input label={'Post Title'} value={title} onChange={handleTitle} />

            <Editor options={options} value={body} onChange={handleBody} />

            <TagsInput tags={tags} setTags={setTags} />

            <CardActions className={styles.buttons}>
              <ButtonCancel className={styles.buttonCancel} onClick={reset}>
                {'Reset form'}
              </ButtonCancel>
              <TxButton
                label={postId ? 'Update post' : 'Create post'}
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
                variant={'contained'}
                withLoader
              />
            </CardActions>
          </Box>
        </CardContent>
      </CardWrapper>
    </Layout>
  );
};
