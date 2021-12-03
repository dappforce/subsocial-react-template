import React, { FC } from 'react'
import { Divider, List, ListItem, ListItemIcon, ListItemText } from '@mui/material'
import styles from './SwitchAccount.module.sass'
import PersonOutlineIcon from '@mui/icons-material/PersonOutline'
import ModeEditOutlineOutlinedIcon from '@mui/icons-material/ModeEditOutlineOutlined'
import SettingsOutlinedIcon from '@mui/icons-material/SettingsOutlined'
import { useRouter } from 'next/router'
import { useAppSelector } from 'src/rtk/app/store'
import { SwitchAccountContentProps } from 'src/models/account'
import Snackbar from '../common/snackbar/Snackbar'
import { useModal } from '../../hooks/useModal'

const SwitchAccountMenu: FC<SwitchAccountContentProps> = ({onClose}) => {
    const router = useRouter()
    const {address} = useAppSelector(state => state.myAccount)
    const {toggleModal, isVisible} = useModal()

    const menu = [
        {label: 'My profile', icon: <PersonOutlineIcon/>, href: `/accounts/${address}`},
        {label: 'Edit my profile', icon: <ModeEditOutlineOutlinedIcon/>, href: ``},
        {label: 'Settings', icon: <SettingsOutlinedIcon/>, href: ``}
    ]

    const onClickMenu = (href: string) => {
        if (href) {
            router.push(href)
            onClose()
            return
        }
        toggleModal()
    }

    return (
        <>
            <Snackbar
                open={isVisible}
                message={'Coming soon...'}
                onClose={toggleModal}
            />
            <List sx={{pb: 0}}>
                <Divider variant="middle" sx={{mb: 1}}/>
                {menu.map(item => (
                    <ListItem
                        button
                        key={item.label}
                        className={styles.item}
                        onClick={() => onClickMenu(item.href)}
                    >
                        <ListItemIcon className={styles.icon}>{item.icon}</ListItemIcon>
                        <ListItemText primary={item.label}/>
                    </ListItem>
                ))}
                <Divider variant="middle" sx={{mt: 1}}/>
            </List>
        </>
    )
}

export default SwitchAccountMenu
