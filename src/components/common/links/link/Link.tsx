import { FC } from 'react'
import NextLink from 'next/link'
import styles from './Link.module.sass'
import { LinkProps } from 'src/models/common/link'

const Link: FC<LinkProps> = ({href, ext = false, image, as, className, children, ...props}) => {
    const classname = className ? `${styles.link} ${className}` : styles.link
    return ext ? (
        <a
            className={`${classname} ${image ? styles.image : ''} ${styles.external}`} {...props}
            target={'_blank'}
            rel="noreferrer"
            href={href as string}
        >
            {children}
        </a>
    ) : (
        <NextLink href={href} as={as} replace>
            <a className={`${classname} ${image ? styles.image : ''}`} {...props}>{children}</a>
        </NextLink>
    )
}

export default Link

