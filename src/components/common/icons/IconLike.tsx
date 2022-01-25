import { FC } from 'react';
import styles from './Icons.module.sass';
import ThumbUpIcon from '@mui/icons-material/ThumbUp';
import ThumbUpOutlinedIcon from '@mui/icons-material/ThumbUpOutlined';
import { IconVoteProps } from 'src/models/common/icon';

const IconLike: FC<IconVoteProps> = ({ type }) => {
  switch (type) {
    case 'outline':
      return <ThumbUpOutlinedIcon />;
    case 'contained':
      return <ThumbUpIcon className={styles.like} />;
    default:
      return <ThumbUpOutlinedIcon />;
  }
};

export default IconLike;
