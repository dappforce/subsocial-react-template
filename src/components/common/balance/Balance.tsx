import { FC, useEffect, useState } from 'react'
import styles from './Balance.module.sass'
import MonetizationOnOutlinedIcon from '@mui/icons-material/MonetizationOnOutlined'
import { BalanceProps, BalanceType } from 'src/models/common/balance'
import { useApi } from '../../api'
import { formatBalance } from '@polkadot/util'

const Balance: FC<BalanceProps> = ({address, className: inputClassName, isIcon}) => {
    const className = inputClassName ? `${styles.balance} ${inputClassName}` : styles.balance
    const { api } = useApi()
    const [ balance, setBalance ] = useState<string[]>([ '0', '0000' ])

    useEffect(() => {
        if (!address) return

        const sub = async () => {
            const substrateApi = await api.subsocial.substrate.api

            unsub = await substrateApi.derive.balances.all(address, (data) => {
                isMounted && setBalance(getFormattedBalance(data.freeBalance))
            })
        }

        let isMounted = true
        let unsub: (() => void) | undefined

        isMounted && sub().catch(err => console.error('Failed load balance:', err))

        return () => {
            unsub && unsub()
            isMounted = false
        }
    }, [ address, api ])


    const getFormattedBalance = (balance: BalanceType | undefined) => {
        const [ prefix, postfix ] = balance
            ? formatBalance(balance, {
                forceUnit: '-',
                withSi: false,
                decimals: 11
            }).split('.')
            : [ '0', undefined ]

        return [ prefix, postfix || '0000' ]
    }

    return (
        <div className={className}>
            {isIcon && <MonetizationOnOutlinedIcon/>}
            <p><span>{balance[0]}</span><span className={styles.gray}>.{balance[1].slice(0, 4)}</span> SUB</p>
        </div>
    )
}

export default Balance
