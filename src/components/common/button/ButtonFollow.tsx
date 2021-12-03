import { FC } from 'react'
import ButtonComponent from './button-component/ButtonComponent'
import { ButtonFollowProps } from 'src/models/common/button'

const ButtonFollow: FC<ButtonFollowProps> = ({isFollowing, className, onClick}) => {
    const variant = isFollowing ? 'outlined' : 'contained'

    return (
        <ButtonComponent variant={variant} onClick={onClick} className={className || ''}>
            {isFollowing ? 'Following' : 'Follow'}
        </ButtonComponent>
    )
}

export default ButtonFollow
