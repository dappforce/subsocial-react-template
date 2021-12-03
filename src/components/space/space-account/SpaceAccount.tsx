import { FC, useEffect, useState } from 'react'
import styles from './SpaceAccount.module.sass'
import Options from '../../common/button/button-options/ButtonOptions'
import ButtonFollow from '../../common/button/ButtonFollow'
import ButtonComponent from '../../common/button/button-component/ButtonComponent'
import ButtonEdit from '../../common/button/button-edit/ButtonEdit'
import { useRouter } from 'next/router'
import Account from '../../account/Account'
import { SpaceContent, SpaceWithSomeDetails } from '@subsocial/api/flat-subsocial/dto'
import { getSpaceUrl } from '../../../utils'
import { useApi } from '../../api'
import { idToBn } from '@subsocial/utils'
import { AnyAccountId } from '@subsocial/types/substrate/interfaces/utils'
import { useIsMySpace } from '../../../hooks/useIsMySpace'
import { useMyAddress } from '../../../rtk/features/myAccount/myAccountHooks'

const SpaceAccount: FC<SpaceWithSomeDetails> = (props) => {
    console.log(props, 'space account')
    const router = useRouter()
    const {content, struct, id}  = props
    const {handle} = content as SpaceContent & {handle: string}
    const {api} = useApi()
    const address = useMyAddress()
    const [isFollowed, setIsFollowed] = useState(false)
    const isMy = useIsMySpace(struct)

    useEffect(() => {
        (async () => {
            const isFollower = await api.subsocial.substrate.isSpaceFollower(address as AnyAccountId, idToBn(id))
            setIsFollowed(isFollower)
        })()
    }, [])

    if (!content) return null

    return (
        <Account
            avatar={content.image}
            name={content.name}
            id={props.id}
            followersCount={struct.followersCount}
            posts={struct.postsCount}
            buttons={<>
                {isMy
                    ? <ButtonComponent variant={'outlined'} className={styles.button}
                                       onClick={() => router.push(`${getSpaceUrl(handle, struct.id)}/posts/new`)}>
                        Write post
                    </ButtonComponent>
                    : <ButtonComponent variant={'outlined'} className={styles.button} disabled={true}>
                        Send tips
                    </ButtonComponent>
                }
                <ButtonFollow isFollowing={isFollowed} className={styles.button} />
            </>}
            action={
                <>
                    {isMy && <ButtonEdit onClick={() => router.push(`@${handle}/edit`)}/>}
                    <Options sx={{ml: 1}}/>
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
