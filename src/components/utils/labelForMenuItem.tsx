import { ListItemIcon, ListItemText } from '@mui/material';
import Image from '../common/image/Image';

const labelForMenuItem = (
  label: string,
  image: string,
  width: number,
  height: number
) => (
  <>
    <ListItemIcon>
      <Image src={`/${image}.svg`} width={width} height={height} alt={image} />
    </ListItemIcon>
    <ListItemText>{label}</ListItemText>
  </>
);

export default labelForMenuItem;
