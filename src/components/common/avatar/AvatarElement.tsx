import { FC } from 'react';
import styles from './AvatarElement.module.sass';
import { AvatarProps } from '../../../models/common/avatar';
import { Avatar } from '@mui/material';
import { loadImgUrl } from 'src/utils';
import { toSvg } from 'jdenticon';

const AvatarElement: FC<AvatarProps> = (props) => {
  return props.src ? (
    <Avatar
      src={loadImgUrl(props.src)}
      alt={props.id}
      sx={{ width: props.size, height: props.size }}
    />
  ) : (
    <Avatar
      alt={props.id}
      sx={{ width: props.size, height: props.size }}
      className={styles.wrapper}
    >
      <div
        dangerouslySetInnerHTML={{ __html: toSvg(props.id, props.size) }}
        className={styles.icon}
      />
    </Avatar>
  );
};

export default AvatarElement;
