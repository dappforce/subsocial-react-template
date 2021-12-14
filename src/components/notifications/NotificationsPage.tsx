import Layout from '../layout/Layout'
import { Divider, List } from '@mui/material'
import styles from './NotificationsPage.module.sass'
import Title from '../common/title/Title'
import { NextPage } from 'next'
import { Box } from '@mui/system'
import NotificationsItem from './NotificationsItem'
import { notifications } from '../../mocked-data/db'
import { Fragment } from 'react'
import { TitleSizes } from '../../models/common/typography'

const NotificationsPage: NextPage = () => {
  return (
      <Layout>
          <Box className={styles.box}>
              <List
                  subheader={
                      <Title className={styles.subheader} type={TitleSizes.DETAILS}>
                          Notifications
                      </Title>
                  }
              >
                  {
                      notifications.map(item => (
                          <Fragment key={item.id}>
                              <NotificationsItem {...item}/>
                              <Divider variant="middle" component="li"/>
                          </Fragment>
                      ))
                  }
              </List>
          </Box>


      </Layout>
  )
}

export default NotificationsPage
