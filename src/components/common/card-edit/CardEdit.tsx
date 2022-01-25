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
  SetStateAction,
  useCallback,
  useEffect,
  useState,
} from 'react';
import TagsInput from '../inputs/tags-input/TagsInput';
import { CardEditProps } from 'src/models/common/card-edit';
import { loadImgUrl } from 'src/utils';
import Editor from '../editor/Editor';
import { IpfsCid } from '@subsocial/types';
import TxButton from '../../common/button/TxButton';
import { useMyAddress } from 'src/rtk/features/myAccount/myAccountHooks';
import { getTxParams } from 'src/components/utils/getTxParams';
import { useApi } from 'src/components/api';
import { useRouter } from 'next/router';
import { TxCallback } from 'src/models/common/button';
import { getNewIdsFromEvent } from '../button/buttons-vote/voting';
import { useSelectProfile } from 'src/rtk/features/profiles/profilesHooks';
import Snackbar from '../snackbar/Snackbar';
import { SnackbarType } from 'src/models/common/snackbar';

const CardEdit: FC<CardEditProps> = (props) => {
  const [state, setState] = useState<{
    name: string;
    description: string;
  }>({ name: '', description: '' });

  const address = useMyAddress();
  const profile = useSelectProfile(address);
  const { api } = useApi();
  const router = useRouter();
  const { name, description } = state;

  const [tags, setTags] = useState<string[]>([]);
  const [image, setImage] = useState('');
  const [error, setError] = useState(false);
  const [cidImage, setCidImage] = useState<IpfsCid>();
  const [ipfsCid, setIpfsCid] = useState<IpfsCid>();
  const [existentImage, setExistentImage] = useState<IpfsCid>();
  const [isOwner, setIsOwner] = useState(true);
  const [mbError, setMbError] = useState(false);
  const existentPropsData = props?.spaceData
    ? props?.spaceData
    : props?.profileData;

  const title: string = props.title.split(' ')[1];
  const json =
    title === 'Space'
      ? {
          about: description,
          name,
          image: cidImage ? cidImage : existentImage,
          tags,
        }
      : {
          about: description,
          name,
          avatar: cidImage ? cidImage : existentImage,
        };

  const newTxParams = (cid: IpfsCid) => {
    if (existentPropsData?.id) {
      return title === 'Space'
        ? [existentPropsData.id, { content: { IPFS: cid } }]
        : [{ content: { IPFS: cid } }];
    }
    return title === 'Space'
      ? [null, null, { IPFS: cid }, null]
      : [{ IPFS: cid }];
  };

  useEffect(() => {
    if (title === 'Profile') {
      profile?.id !== router.query.address
        ? setIsOwner(false)
        : setIsOwner(true);
    } else if (title === 'Space') {
      if (props?.spaceData !== undefined) {
        props?.spaceData.struct.createdByAccount !== profile?.id
          ? setIsOwner(false)
          : setIsOwner(true);
      }
    }

    setState({
      name: existentPropsData?.content?.name || '',
      description: existentPropsData?.content?.about || '',
    });
    //@ts-ignore
    setTags(existentPropsData?.content?.tags || []);
    setImage(
      loadImgUrl(
        props?.spaceData
          ? //@ts-ignore
            existentPropsData?.content?.image
          : //@ts-ignore
            existentPropsData?.content?.avatar || ''
      ) || ''
    );
    setExistentImage(
      props?.spaceData
        ? //@ts-ignore
          existentPropsData?.content?.image
        : //@ts-ignore
          existentPropsData?.content?.avatar || ''
    );
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

  const options = {
    placeholder: 'Description',
  };

  const onSuccess: TxCallback = (txResult) => {
    const id =
      existentPropsData?.id || getNewIdsFromEvent(txResult)?.toString();

    title === 'Space'
      ? router.push(`/${id}`)
      : router.push(`/accounts/${address}`);
  };

  return (
    <CardWrapper>
      <Snackbar
        type={SnackbarType.Error}
        open={mbError}
        message={'Image should be less than 2mb'}
      />
      {!isOwner ? (
        <CardContent className={styles.warningText}>
          Only owner can edit his {title}
        </CardContent>
      ) : (
        <>
          <CardContent>
            <Title type={TitleSizes.DETAILS}>{props.title}</Title>
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
              label={`${title} name`}
              value={state.name}
              onChange={handleName}
              errorText={
                error ? `This ${title.toLowerCase()} name is already taken` : ''
              }
              isError={error}
            />

            <Editor
              options={options}
              onChange={handleDescription}
              value={state.description}
              className={styles.editor}
            />

            {title === 'Space' && <TagsInput tags={tags} setTags={setTags} />}

            <CardActions className={styles.actions}>
              <ButtonCancel
                className={styles.button}
                onClick={props.onCancel || reset}
              >
                {props.cancelButton}
              </ButtonCancel>
              <TxButton
                label={props.saveButton}
                accountId={address}
                disabled={false}
                className={styles.button}
                tx={
                  existentPropsData?.id
                    ? `${title.toLowerCase()}s.update${title}`
                    : `${title.toLowerCase()}s.create${title}`
                }
                params={() =>
                  getTxParams({
                    //@ts-ignore
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
        </>
      )}
    </CardWrapper>
  );
};

export default CardEdit;
