import { FC } from 'react'
import styles from './SeeMore.module.sass'
import Link from '../link/Link'
import { SeeMoreProps } from 'src/models/common/link'

const SeeMore: FC<SeeMoreProps> = ({href, className, ...props}) => {
    const classname = className ? `${styles.link} ${className}` : styles.link
    return (
        <Link href={href} className={classname} {...props}>See more</Link>
    )
}

export default SeeMore

