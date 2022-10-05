import React, { FC } from 'react';
import styles from './Space.module.sass';
import { CardContent, Typography } from '@mui/material';
import CardWrapper from '../../common/card-wrapper/CardWrapper';
import TagList from '../../common/tag/TagList';
import { getUrl, TypeUrl } from 'src/utils';
import { SpaceId } from '@subsocial/api/types/substrate';
import { useSelectSpace } from 'src/store/features/spaces/spacesHooks';
import { SpaceWithSomeDetails } from '@subsocial/api/types/dto';
import SeeMore from '../../common/links/see-more/SeeMore';
import { TypeContent } from 'src/models/common/button';
import HiddenComponent from 'src/components/common/hidden-component/HiddenComponent';
import SpaceInfo from './SpaceInfo';
import { useIsMySpace } from '../../../hooks/useIsMySpace';

export const Space: FC<{ id: SpaceId | string, withUnlisted?: boolean }> = (props) => {
  const { id, withUnlisted } = props;
  const spaceData = useSelectSpace(id as string);
  if (!spaceData) return null;

  return <SpaceView spaceData={spaceData} withUnlisted={withUnlisted} />;
};

const SpaceView: FC<{ spaceData: SpaceWithSomeDetails, withUnlisted?: boolean }> = (props) => {
  const { spaceData, withUnlisted } = props;
  const isMySpace = useIsMySpace(spaceData.struct);
  const isUnlistedAndNotMySpace = withUnlisted && !isMySpace && spaceData.struct.hidden;
  const isVisibleAndHiddenSpace = !withUnlisted && spaceData.struct.hidden

  if (!spaceData?.content || isVisibleAndHiddenSpace || isUnlistedAndNotMySpace) {
    return null;
  }

  return (
    <CardWrapper>
      {spaceData.struct.hidden && <HiddenComponent data={spaceData} typeContent={TypeContent.Space} />}
      <SpaceInfo spaceData={spaceData} />
      {spaceData.content.summary &&
      <CardContent className={styles.content}>
        <Typography variant="body2" className={styles.content}>
          {spaceData.content.summary}
          {' '}
          {spaceData.content.isShowMore &&
          <SeeMore href={`${getUrl({
            type: TypeUrl.Space,
            //@ts-ignore
            title: spaceData.content.handle,
            id: spaceData.id
          })}?isAutoExpand=true`} />}
        </Typography>
      </CardContent>
      }

      <TagList tags={spaceData.content.tags} className={styles.tags} />

    </CardWrapper>
  );
};

export default SpaceView;
