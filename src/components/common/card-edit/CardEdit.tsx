import CardWrapper from '../card-wrapper/CardWrapper';
import { CardActions, CardContent } from '@mui/material';
import Title from '../title/Title';
import { TitleSizes } from 'src/models/common/typography';
import File from '../file/File';
import { Box } from '@mui/system';
import styles from './CardEdit.module.sass';
import Input from '../inputs/input/Input';
import ButtonCancel from '../button/button-cancel/ButtonCancel';
import {
  ChangeEvent,
  FC,
  FormEvent,
  useCallback,
  useEffect,
  useState,
} from 'react';
import TagsInput from '../inputs/tags-input/TagsInput';
import { CardEditProps, CardEditType } from 'src/models/common/card-edit';
import { loadImgUrl } from 'src/utils';
import Editor from '../editor/Editor';
import { CommonContent, IpfsCid } from '@subsocial/types';
import TxButton from '../../common/button/TxButton';
import { useMyAddress } from 'src/store/features/myAccount/myAccountHooks';
import { getTxParams } from 'src/components/utils/getTxParams';
import { useApi } from 'src/components/api';
import { useRouter } from 'next/router';
import { TxCallback, TxFailedCallback } from 'src/models/common/button';
import { getNewIdsFromEvent } from '@subsocial/api';
import { useSelectProfile } from 'src/store/features/profiles/profilesHooks';
import Snackbar from '../snackbar/Snackbar';
import { SnackbarType } from 'src/models/common/snackbar';
import { unpinIpfsCid } from 'src/components/utils/unpinIpfsCid';
import { useTranslation } from 'react-i18next';
import { config } from 'src/config';

const CardEdit: FC<CardEditProps> = ({
  type,
  spaceData,
  profileData,
  title,
  onCancel,
  cancelButton,
  saveButton,
}) => {
  const [state, setState] = useState<{
    name: string;
    description: string;
  }>({ name: '', description: '' });

  const address = useMyAddress();
  const profile = useSelectProfile(address);
  const { api } = useApi();
  const router = useRouter();
  const { name, description } = state;
  const { t } = useTranslation();

  const [tags, setTags] = useState<string[]>([]);
  const [image, setImage] = useState('');
  const [error, setError] = useState(false);
  const [cidImage, setCidImage] = useState<IpfsCid>();
  const [isOwner, setIsOwner] = useState(true);
  const [mbError, setMbError] = useState(false);

  const existentPropsData = spaceData ? spaceData : profileData;

  const json =
    type === CardEditType.Space
      ? {
          about: description,
          name,
          image: cidImage,
          tags,
        }
      : {
          about: description,
          name,
          avatar: cidImage,
        };

  const newTxParams = (cid: IpfsCid) => {
    if (existentPropsData?.id) {
      return type === CardEditType.Space
        ? [existentPropsData.id, { content: { IPFS: cid } }]
        : [{ content: { IPFS: cid } }];
    }
    return type === CardEditType.Space
      ? [null, null, { IPFS: cid }, null]
      : [{ IPFS: cid }];
  };

  useEffect(() => {
    if (type === CardEditType.Profile) {
      profile?.id !== router.query.address
        ? setIsOwner(false)
        : setIsOwner(true);
    } else if (type === CardEditType.Space) {
      if (spaceData !== undefined) {
        spaceData.struct.createdByAccount !== profile?.id
          ? setIsOwner(false)
          : setIsOwner(true);
      }
    }

    const imageType = spaceData
      ? //@ts-ignore
        existentPropsData?.content?.image
      : //@ts-ignore
        existentPropsData?.content?.avatar || '';

    setState({
      name: existentPropsData?.content?.name || '',
      description: existentPropsData?.content?.about || '',
    });
    //@ts-ignore
    setTags(existentPropsData?.content?.tags || []);
    setImage(imageType ? loadImgUrl(imageType) : '');
    setCidImage(imageType);
  }, [existentPropsData?.content, profile?.id, router.query.address]);

  const onSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
  };

  const reset = () => {
    setState({ name: '', description: '' });
    setTags([]);
    setError(false);
  };

  const handleName = (event: ChangeEvent<HTMLTextAreaElement>) => {
    setError(false);
    setState((current) => ({ ...current, name: event.target.value }));
  };

  const handleDescription = useCallback((value: string) => {
    setState((current) => ({ ...current, description: value }));
  }, []);

  const onSuccess: TxCallback = (txResult, newCid) => {
    const id =
      existentPropsData?.id || getNewIdsFromEvent(txResult)?.toString();

    if (existentPropsData) {
      if (type === CardEditType.Space) {
        newCid &&
          unpinIpfsCid(
            api.subsocial.ipfs,
            //@ts-ignore
            existentPropsData?.struct?.contentId,
            newCid
          );

        cidImage &&
          unpinIpfsCid(
            api.subsocial.ipfs,
            //@ts-ignore
            existentPropsData?.content?.image,
            cidImage
          );
      } else {
        newCid &&
          unpinIpfsCid(api.subsocial.ipfs, profile?.struct?.contentId, newCid);

        cidImage &&
          unpinIpfsCid(api.subsocial.ipfs, profile?.content?.avatar, cidImage);
      }
      type === CardEditType.Space
        ? router.push(`/${id}`)
        : router.push(`/accounts/${address}`);
    } else {
      type === CardEditType.Space
        ? router.push(`/${id}`)
        : router.push(`/accounts/${address}`);
    }
  };

  const onFailed: TxFailedCallback = (txResult, newCid) => {
    if (existentPropsData) {
      if (type === CardEditType.Space) {
        newCid &&
          unpinIpfsCid(
            api.subsocial.ipfs,
            newCid,
            //@ts-ignore
            existentPropsData?.content?.id
          );

        cidImage &&
          unpinIpfsCid(
            api.subsocial.ipfs,
            cidImage,
            //@ts-ignore
            existentPropsData?.content?.image
          );
      } else {
        newCid &&
          unpinIpfsCid(api.subsocial.ipfs, newCid, profile?.struct.contentId);

        cidImage &&
          unpinIpfsCid(api.subsocial.ipfs, cidImage, profile?.content?.avatar);
      }
    }
  };

  return (
    <CardWrapper>
      <Snackbar
        type={SnackbarType.Error}
        open={mbError}
        message={t('imageShouldBeLessThan', {
          limit: config.loadImageLimitMb / (1024 * 1024),
        })}
      />
      {!isOwner ? (
        <CardContent className={styles.warningText}>
          Only owner can edit his{' '}
          {type === CardEditType.Space ? 'Space' : 'Profile'}
        </CardContent>
      ) : (
        <>
          <CardContent>
            <Title type={TitleSizes.DETAILS}>{title}</Title>
          </CardContent>
          <File
            type={'avatar'}
            image={image}
            setCidImage={setCidImage}
            setMbError={setMbError}
          />
          <Box component="form" className={styles.form} onSubmit={onSubmit}>
            <Input
              isRequired
              label={t(
                type === CardEditType.Space
                  ? 'forms.placeholder.spaceName'
                  : 'forms.placeholder.profileName'
              )}
              value={state.name}
              onChange={handleName}
              errorText={
                error
                  ? `This ${
                      type === CardEditType.Space ? 'space' : 'profile'
                    } name is already taken`
                  : ''
              }
              isError={error}
            />

            <Editor
              onChange={handleDescription}
              value={state.description}
              className={styles.editor}
              placeholder={t('forms.fieldName.description')}
            />

            {type === CardEditType.Space && (
              <TagsInput tags={tags} setTags={setTags} />
            )}

            <CardActions className={styles.actions}>
              <ButtonCancel
                className={styles.button}
                onClick={onCancel || reset}
              >
                {cancelButton}
              </ButtonCancel>
              <TxButton
                label={saveButton}
                accountId={address}
                className={styles.button}
                tx={
                  existentPropsData?.id
                    ? type === CardEditType.Space
                      ? 'spaces.updateSpace'
                      : 'profiles.updateProfile'
                    : type === CardEditType.Space
                    ? 'spaces.createSpace'
                    : 'profiles.createProfile'
                }
                params={() =>
                  getTxParams({
                    json: json as CommonContent,
                    ipfs: api.subsocial.ipfs,
                    buildTxParamsCallback: newTxParams,
                  })
                }
                onSuccess={onSuccess}
                onFailed={onFailed}
                variant={'contained'}
                withLoader
              />
            </CardActions>
          </Box>
        </>
      )}
    </CardWrapper>
  );
};

export default CardEdit;
