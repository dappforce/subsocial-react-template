import { SyntheticEvent, FC } from 'react'
import styles from './Tabs.module.sass'
import { Tab } from '@mui/material'
import MaterialTabs from '@mui/material/Tabs'
import { Box } from '@mui/system'
import { TabsProps } from 'src/models/common/tabs'

const Tabs: FC<TabsProps> = ({className, tabs, setValue, value}) => {
    const classnames = className ? `${className} ${styles.tabs}` : className
    const handleChange = (event: SyntheticEvent, newValue: number) => {
        setValue(newValue);
    };

    return (
        <>
            <Box sx={{width: '100%'}} className={classnames}>
                <MaterialTabs
                    value={value}
                    onChange={handleChange}
                    textColor="primary"
                    indicatorColor="primary"
                    variant="fullWidth"
                    centered
                >
                    {tabs.map(({label, tabValue}) => {
                        return (
                            <Tab sx={{width: '100%'}} value={tabValue} label={label} key={tabValue}/>
                        )
                    })}
                </MaterialTabs>
            </Box>
        </>
    )
}

export default Tabs
