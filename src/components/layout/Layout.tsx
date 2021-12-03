import { FC } from 'react'
import styles from './Layout.module.sass'
import { Container, ContainerProps } from '@mui/material'

const Layout: FC<ContainerProps> = ({children, className, sx, ...props}) => {
    const classname = className ? `${styles.layout} ${className}` : styles.layout

    return (
        <>
            <Container maxWidth={'md'} sx={{p: 2, ...sx}} {...props} className={classname}>
                {children}
            </Container>
        </>
    )
}

export default Layout
