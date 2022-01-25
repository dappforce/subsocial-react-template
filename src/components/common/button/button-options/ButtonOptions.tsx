import { FC, useRef, useState } from 'react';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import IconButton from '@mui/material/IconButton';
import { ListItemIcon, ListItemText, Menu, MenuItem } from '@mui/material';
import { useModal } from 'src/hooks/useModal';
import Modal from '../../../modal/Modal';
import ModalVotes from '../../../modal/modal-reactions/ModalVotes';
import { ButtonOptionsProps } from 'src/models/common/button';
import styles from './ButtonOptions.module.sass';
import { ButtonTogglerVisibility } from '../button-toggler-visibility/ButtonTogglerVisibility';
import { useIsMySpace } from 'src/hooks/useIsMySpace';
import { useMyAddress } from 'src/rtk/features/myAccount/myAccountHooks';
import { SpaceStruct } from '@subsocial/api/flat-subsocial/flatteners';
import Image from '../../image/Image';
import { useRouter } from 'next/router';
import ButtonFollowSpace from '../button-follow/ButtonFollowSpace';

const Options: FC<ButtonOptionsProps> = ({
  withReactions,
  withHidden,
  withFollowing,
  contentStruct,
  typeContent,
  onClickEdit,
  ...props
}) => {
  const [anchorEl, setAnchorEl] = useState<HTMLButtonElement | null>(null);
  const { isVisible, toggleModal } = useModal();
  const { id } = contentStruct || {};
  const open = Boolean(anchorEl);
  const buttonRef = useRef(null);
  const isMySpace = useIsMySpace(contentStruct as SpaceStruct);
  const myAddress = useMyAddress();
  const router = useRouter();

  const isShowButtonEdit =
    onClickEdit && (isMySpace || myAddress === contentStruct?.ownerId);

  const isShowButtonVisibility =
    withHidden && (isMySpace || myAddress === contentStruct?.ownerId);

  const openModal = () => {
    toggleModal();
    handleClose();
  };

  const handleClick = () => {
    setAnchorEl(buttonRef.current);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <>
      {id && (
        <Modal open={isVisible} onClose={toggleModal}>
          <ModalVotes postId={id} />
        </Modal>
      )}
      <div className={styles.menu}>
        <IconButton
          {...props}
          ref={buttonRef}
          aria-label="more"
          id="long-button"
          aria-controls="long-menu"
          aria-expanded={open ? 'true' : undefined}
          aria-haspopup="true"
          onClick={handleClick}
        >
          <MoreVertIcon />
        </IconButton>

        <Menu
          id="long-menu"
          MenuListProps={{ 'aria-labelledby': 'long-button' }}
          anchorEl={anchorEl}
          open={open}
          onClose={handleClose}
          PaperProps={{ style: { minWidth: 120 } }}
          anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
          transformOrigin={{ vertical: 'top', horizontal: 'right' }}
        >
          {isShowButtonEdit && (
            <MenuItem onClick={onClickEdit} className={styles.item}>
              <ListItemIcon>
                <Image src={'/edit.svg'} width={18} height={18} alt={'edit'} />
              </ListItemIcon>
              <ListItemText>Edit {typeContent}</ListItemText>
            </MenuItem>
          )}
          {isShowButtonVisibility && (
            <ButtonTogglerVisibility
              contentStruct={contentStruct as SpaceStruct}
              className={styles.item}
              component={MenuItem}
              withLoader={false}
              typeContent={typeContent}
            />
          )}

          {withReactions && (
            <MenuItem onClick={openModal} className={styles.item}>
              <ListItemIcon>
                <Image
                  src={'/reactions.svg'}
                  width={24}
                  height={24}
                  alt={'reactions'}
                />
              </ListItemIcon>
              <ListItemText>View reactions</ListItemText>
            </MenuItem>
          )}
          <MenuItem onClick={handleClose} className={styles.item}>
            <ListItemIcon>
              <Image
                src={'/ipfs.svg'}
                width={23}
                height={25}
                alt={'view on ipfs'}
              />
            </ListItemIcon>
            <ListItemText>View on IPFS</ListItemText>
          </MenuItem>
          {withFollowing && (
            <ButtonFollowSpace
              space={contentStruct as SpaceStruct}
              className={styles.item}
              component={MenuItem}
              withLoader={false}
            />
          )}
        </Menu>
      </div>
    </>
  );
};

export default Options;
