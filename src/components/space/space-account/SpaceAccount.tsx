import { FC } from 'react'
import styles from './SpaceAccount.module.sass'
import Options from '../../common/button/button-options/ButtonOptions'
import ButtonFollowSpace from '../../common/button/button-follow/ButtonFollowSpace'
import ButtonComponent from '../../common/button/button-component/ButtonComponent'
import ButtonEdit from '../../common/button/button-edit/ButtonEdit'
import { useRouter } from 'next/router'
import Account from '../../account/Account'
import { SpaceContent, SpaceWithSomeDetails } from '@subsocial/api/flat-subsocial/dto'
import { useIsMySpace } from 'src/hooks/useIsMySpace'
import { getUrl, TypeUrl } from 'src/utils'

const SpaceAccount: FC<SpaceWithSomeDetails> = (props) => {
    const router = useRouter()
    const { content, struct, id } = props
    const { handle } = content as SpaceContent & { handle: string }
    const isMy = useIsMySpace(struct)

    if (!content) return null

    return (
        <Account
            avatar={content.image}
            name={content.name}
            id={id}
            followersCount={struct.followersCount}
            posts={struct.postsCount}
            buttons={<>
                {isMy
                    ? <ButtonComponent
                        variant={'outlined'}
                        className={styles.button}
                        onClick={() => router.push(`${getUrl({ type: TypeUrl.Space, title: handle, id: struct.id })}/posts/new`)}
                    >
                        Write post
                    </ButtonComponent>
                    : <ButtonComponent variant={'outlined'} className={styles.button} disabled>
                        Send tips
                    </ButtonComponent>
                }
                <ButtonFollowSpace className={styles.button} space={struct}/>
            </>}
            action={
                <>
                    {isMy && <ButtonEdit onClick={() => router.push(`@${handle}/edit`)}/>}
                    <Options className={styles.option} />
                </>
            }
            about={content.about}
            summary={content.summary}
            isShowMore={content.isShowMore}
            links={content.links}
            tags={content.tags}
        />
    )
}

export default SpaceAccount
