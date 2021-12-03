import { AppBar, IconButton, Toolbar } from '@mui/material'
import MenuIcon from '@mui/icons-material/Menu'
import Link from 'next/link'
import { FC, useContext, useEffect } from 'react'
import styles from './Header.module.sass'
import Tabs from '../common/tabs/Tabs'
import { TabProps } from '../../models/common/tabs'
import { Box } from '@mui/system'
import Title from '../common/title/Title'
import { TextSizes, TitleSizes } from '../../models/common/typography'
import { useRouter } from 'next/router'
import { useAppDispatch, useAppSelector } from 'src/rtk/app/store'
import { changeTab, toggleAccount } from 'src/rtk/features/mainSlice'
import { HeaderProps } from '../../models/header'
import ButtonComponent from '../common/button/button-component/ButtonComponent'
import ButtonIcon from '../common/button/button-icon/ButtonIcon'
import AvatarElement from '../common/avatar/AvatarElement'
import { AvatarSizes } from '../../models/common/avatar'
import NotificationsNoneIcon from '@mui/icons-material/NotificationsNone'
import { useSelectProfile } from '../../rtk/features/profiles/profilesHooks'
import Balance from '../common/balance/Balance'
import Text from '../common/text/Text'
import { AuthContext } from '../auth/AuthContext'

const Header: FC<HeaderProps> = ({label}) => {
    const {value} = useAppSelector(state => state.main)
    const dispatch = useAppDispatch()
    const router = useRouter()
    const {address, accounts} = useAppSelector(state => state.myAccount)
    const profile = useSelectProfile(address)
    const account = accounts?.find(acc => acc.address === address)
    const {openSingInModal} = useContext(AuthContext)

    useEffect(() => {
        if (router) {
            if (router.pathname !== '/') {
                dispatch(changeTab(''))
            }

            if (router.pathname === '/' && !router.query.tab) {
                dispatch(changeTab('posts'))
            }

            if (router?.query.tab && router?.query.tab === 'string') {
                dispatch(changeTab(router.query.tab))
            }
        }
    }, [ router ])

    const handleChange = (newValue: string) => {
        router.push(`/?tab=${newValue}`)
        dispatch(changeTab(newValue))
    }

    const tabs: TabProps[] = [
        // {label: 'My feed', tabValue: 'feeds'},
        {label: 'Posts', tabValue: 'posts'},
        {label: 'Spaces', tabValue: 'spaces'}
    ]

    return (
        <AppBar position="fixed" className={styles.bar}>
            <Toolbar className={styles.header}>
                <div className={styles.menu}>
                    <IconButton
                        className={styles.icon}
                        size="large"
                        edge="start"
                        aria-label="menu"
                        color="default"
                        sx={{mr: 4.125, ml: 0}}
                    >
                        <MenuIcon/>
                    </IconButton>

                    <Title type={TitleSizes.DETAILS} className={styles.label}>
                        <Link href={'/'}>
                            <a>{label}</a>
                        </Link>
                    </Title>
                </div>

                <Tabs
                    className={styles.tabs}
                    tabs={tabs}
                    value={value}
                    setValue={handleChange}
                />

                <Box className={styles.user}>
                    {
                        !address || (!profile && !account) ? (
                            <>
                                {/*<ModalSignIn onClose={toggleModal} open={isVisible}/>*/}
                                <ButtonComponent variant={'outlined'} onClick={openSingInModal}>
                                    Sign in
                                </ButtonComponent>
                            </>
                        ) : (
                            <>
                                <ButtonIcon onClick={() => router.push('/notifications')} className={styles.button}>
                                    <NotificationsNoneIcon/>
                                </ButtonIcon>

                                <button onClick={() => dispatch(toggleAccount())} className={styles.account}>
                                    <AvatarElement src={profile?.content?.avatar} size={AvatarSizes.SMALLEST} id={address}/>

                                    <div>
                                        <Text type={TextSizes.SECONDARY} className={styles.name}>
                                            {profile?.content?.name || account?.name}
                                        </Text>
                                        <Balance isIcon={false} address={address} className={styles.balance}/>
                                    </div>

                                </button>
                            </>
                        )
                    }
                </Box>
            </Toolbar>
        </AppBar>
    )
}

export default Header
