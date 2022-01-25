import {
  FormControl,
  InputLabel,
  ListItemAvatar,
  ListItemText,
  MenuItem,
  Select,
} from '@mui/material';
import { EntityId } from '@subsocial/api/flat-subsocial/dto';
import { FC, useEffect } from 'react';
import { useApi } from 'src/components/api';
import { AvatarSizes } from 'src/models/common/avatar';
import { useSelectSpaces } from 'src/rtk/app/hooks';
import { useAppDispatch } from 'src/rtk/app/store';
import { fetchSpaces } from 'src/rtk/features/spaces/spacesSlice';
import AvatarElement from '../avatar/AvatarElement';
import styles from './SelectSpaces.module.sass';

interface SelectSpacesProps {
  className?: string;
  spaceIds: EntityId[];
  initialId: EntityId;
  onChange: (value: string) => void;
}

const SelectSpaces: FC<SelectSpacesProps> = ({
  className,
  spaceIds,
  initialId,
  onChange,
}) => {
  const spaces = useSelectSpaces(spaceIds);
  const dispatch = useAppDispatch();
  const { api } = useApi();

  useEffect(() => {
    (async () => {
      await dispatch(fetchSpaces({ api, ids: spaceIds }));
    })();
  }, [spaceIds, api, dispatch]);

  return (
    <div className={className}>
      <FormControl className={styles.form}>
        <InputLabel id="select-label">{'Post in a space'}</InputLabel>
        <Select
          value={initialId}
          className={styles.select}
          label="Post in a space"
          labelId="select-label"
          onChange={(e) => onChange(e.target.value)}
        >
          {spaces.map((space) => (
            <MenuItem key={space.id} value={space.id} className={styles.menu}>
              <ListItemAvatar className={styles.item}>
                <AvatarElement
                  src={space.content?.image}
                  size={AvatarSizes.SMALLEST}
                  id={space.id}
                />
              </ListItemAvatar>
              <ListItemText>{space.content?.name}</ListItemText>
            </MenuItem>
          ))}
        </Select>
      </FormControl>
    </div>
  );
};

export default SelectSpaces;
