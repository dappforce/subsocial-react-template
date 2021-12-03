import { FC } from 'react'
import NextLink from 'next/link'
import styles from './SmallLink.module.sass'
import { SmallLinkProps } from '../../../../models/common/link'

const SmallLink: FC<SmallLinkProps> = ({href, as, children, className, ...props}) => {
    const classname = className ? `${styles.link} ${className}` : styles.link

    return (
        <NextLink href={href} as={as}>
            <a className={classname} {...props}>{children}</a>
        </NextLink>
    )
}

export default SmallLink
