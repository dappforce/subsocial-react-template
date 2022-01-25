import { FC } from 'react';
import styles from './SpaceAccount.module.sass';
import Options from '../../common/button/button-options/ButtonOptions';
import ButtonFollowSpace from '../../common/button/button-follow/ButtonFollowSpace';
import ButtonComponent from '../../common/button/button-component/ButtonComponent';
import { useRouter } from 'next/router';
import Account from '../../account/Account';
import { SpaceWithSomeDetails } from '@subsocial/api/flat-subsocial/dto';
import { useIsMySpace } from 'src/hooks/useIsMySpace';
import { TypeContent } from 'src/models/common/button';
import { toEdit } from '../toEdit';
import { useLocalStorage } from 'src/hooks/useLocalStorage';

const SpaceAccount: FC<SpaceWithSomeDetails> = (props) => {
  const router = useRouter();
  const { content, struct, id } = props;
  const isMy = useIsMySpace(struct);
  const [spaceId, setSpaceId] = useLocalStorage<string>('spaceId', id);

  if (!content) return null;

  return (
    <Account
      avatar={content.image}
      name={content.name}
      id={id}
      followersCount={struct.followersCount}
      posts={struct.postsCount}
      buttons={
        <>
          {isMy ? (
            <ButtonComponent
              variant={'outlined'}
              className={`${styles.button} ${styles.buttonGrey}`}
              onClick={() => {
                router.push(`/${router.query.spaceId}/edit`);
              }}
            >
              Edit space
            </ButtonComponent>
          ) : (
            <ButtonComponent
              variant={'outlined'}
              className={`${styles.button} ${styles.buttonGrey}`}
            >
              Send tips
            </ButtonComponent>
          )}

          {isMy ? (
            <ButtonComponent
              variant={'contained'}
              className={styles.button}
              onClick={() => {
                setSpaceId(id);
                router.push('/posts/new');
              }}
            >
              Write post
            </ButtonComponent>
          ) : (
            <ButtonFollowSpace className={styles.button} space={struct} />
          )}
        </>
      }
      action={
        <Options
          className={styles.option}
          contentStruct={struct}
          typeContent={TypeContent.Space}
          withHidden
          onClickEdit={() => toEdit(id)}
          withFollowing={isMy}
        />
      }
      about={content.about}
      summary={content.summary}
      isShowMore={content.isShowMore}
      links={content.links}
      tags={content.tags}
    />
  );
};

export default SpaceAccount;
