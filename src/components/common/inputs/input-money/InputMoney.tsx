import { InputAdornment, OutlinedInput } from "@mui/material";
import { ChangeEvent, FC, useEffect, useState } from 'react'
import { useMyAddress } from "../../../../store/features/myAccount/myAccountHooks";
import { useApi } from "../../../api";
import Text from "../../text/Text";
import { TextSizes } from "../../../../models/common/typography";
import styles from './InputMoney.module.sass'
import { InputMoneyProps } from "../../../../models/common/input";
import { useTranslation } from 'react-i18next';

const InputMoney: FC<InputMoneyProps> = ({
  amount,
  currency,
  placeholder,
  onChange,
  onClose,
  className,
}) => {
  const [balance, setBalance] = useState(0);
  const [error, setError] = useState('')
  const address = useMyAddress();
  const { api } = useApi();
  const { t } = useTranslation();

  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    const { value } = event.target

    if (value.match(/[^0-9.]/)
    || (value.match(/\./g) || []).length > 1) {
      return null
    }
    onChange(event)
    if (value === '') {
      setError(t('forms.validations.required'))
    } else if (+value > balance) {
      setError(t('modals.tips.error'))
    } else {
      setError('')
    }
  }

  useEffect(() => {
    if (!address) return;

    const sub = async () => {
      const substrateApi = await api.subsocial.substrate.api;

      unsub = await substrateApi.derive.balances.all(address, (data) => {
        isMounted && setBalance(Number(data.freeBalance.toString()) / Math.pow(10, 11));
      });
    };

    let isMounted = true;
    let unsub: (() => void) | undefined;

    isMounted &&
    sub().catch((err) => console.error('Failed load balance:', err));

    return () => {
      unsub && unsub();
      isMounted = false;
      onClose();
    };
  }, [address, api, onClose]);

  return (
    <div className={className || ''}>
      <OutlinedInput
        placeholder={placeholder}
        value={amount}
        className={styles.input}
        onChange={handleChange}
        endAdornment={
          <InputAdornment position={'end'}>
            <Text type={TextSizes.NORMAL} className={styles.currency}>
              {currency}
            </Text>
          </InputAdornment>
        }
      />
      {error &&
        <Text
          type={TextSizes.SECONDARY}
          className={styles.error}
        >
          {error}
        </Text>
      }
    </div>
  );
}

export default InputMoney;
