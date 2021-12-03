import { FC, useCallback, useState } from 'react'
import ReactMarkdown from 'react-markdown'
import styles from './Account.module.sass'
import { CardContent } from '@mui/material'
import Text from '../common/text/Text'
import { TextSizes } from '../../models/common/typography'
import { AccountDescriptionProps } from '../../models/account'
import { useRouter } from 'next/router'

export const AccountDescription: FC<AccountDescriptionProps> = (props) => {
    const router = useRouter()
    const [ isShowMore, setIsShowMore ] = useState(!!router?.query.isAutoExpand)

    const toggleText = useCallback(() => setIsShowMore(current => !current), [])

    if (!props.about) return null

    return (
        <CardContent sx={{pt: 0, pb: 2}}>
            <Text type={TextSizes.NORMAL} component={'div'} className={styles.content}>
                {isShowMore || !props.isShowMore
                    ? <ReactMarkdown className={'markdown-body'}>{props.about}</ReactMarkdown>
                    : props.summary} {' '}
                {props.isShowMore &&
                <button onClick={toggleText} className={styles.seemore}>{!isShowMore ? 'See More' : 'See Less'}</button>}
            </Text>
        </CardContent>
    )
}
