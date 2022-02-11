import MaterialModal from "@mui/material/Modal";
import { Box } from "@mui/material";
import Title from "../../common/title/Title";
import { TextSizes, TitleSizes } from "../../../models/common/typography";
import ButtonClose from "../../common/button/button-close/ButtonClose";
import { ChangeEvent, FC, useCallback, useState } from "react";
import InputMoney from "../../common/inputs/input-money/InputMoney";
import { ModalSendTipsProps } from "../../../models/modal";
import styles from './ModalSendTips.module.sass'
import Balance from "../../common/balance/Balance";
import { useMyAddress } from "../../../rtk/features/myAccount/myAccountHooks";
import AvatarElement from "../../common/avatar/AvatarElement";
import { AvatarSizes } from "../../../models/common/avatar";
import { useSelectProfile } from "../../../rtk/features/profiles/profilesHooks";
import Address from "../../common/address/Address";
import ButtonCancel from "../../common/button/button-cancel/ButtonCancel";
import TxButton from "../../common/button/TxButton";
import Text from "../../common/text/Text";
import { currency } from "../../../config";
import { useTranslation } from 'react-i18next';

const ModalSendTips: FC<ModalSendTipsProps> = ({ open, toggleModal, ownerId }) => {
  const [amount, setAmount] = useState('');
  const myAddress = useMyAddress();
  const profile = useSelectProfile(ownerId);
  const { t } = useTranslation();

  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    setAmount(event.target.value)
  };

  const handleClose = useCallback(
    () => {
      setAmount('')
    },
    [setAmount],
  );

  const buildTxParams = () => {
    const tips = +amount * Math.pow(10, 11);
    return [ownerId, tips]
  }

  const onSuccess = () => {
    toggleModal()
  }

  return (
    <MaterialModal open={open} onClose={toggleModal} className={styles.modal}>
      <Box className={styles.box}>
        <div className={styles.header}>
          <Title type={TitleSizes.PREVIEW} className={styles.title}>
            {t('modals.tips.title')}
          </Title>
          <ButtonClose onClick={toggleModal} className={styles.buttonClose}/>
        </div>

        <div className={styles.recipient}>
          <div className={styles.profile}>
            <AvatarElement
              size={AvatarSizes.LARGE}
              id={ownerId}
              src={profile?.content?.avatar}
            />
            <div className={styles.profileInfo}>
              <Title type={TitleSizes.PROFILE}>
                {profile?.content?.name}
              </Title>
            <Address
              label={ownerId}
              size={'sm'}
              isCopy={false}
              className={styles.address}
            />
            </div>
          </div>
          <Text type={TextSizes.SECONDARY} className={styles.text}>
            {t('modals.tips.recipient')}
          </Text>
        </div>
        <InputMoney
          amount={amount}
          onChange={handleChange}
          placeholder={t('modals.tips.inputPlaceholder')}
          currency={currency}
          onClose={handleClose}
        />
        <div className={styles.balanceInfo}>
          <Text type={TextSizes.SECONDARY} className={styles.balanceText}>
            {t('modals.tips.availableBalance')}
          </Text>
          <Balance
            isIcon={false}
            address={myAddress}
            className={styles.balance}
          />
        </div>
        <div className={styles.buttons}>
          <ButtonCancel onClick={toggleModal} className={styles.buttonCancel}>
            {t('buttons.cancel')}
          </ButtonCancel>
          <TxButton
            label={t('buttons.sendTips')}
            accountId={myAddress}
            tx={'balances.transfer'}
            params={buildTxParams}
            onSuccess={onSuccess}
            variant={'contained'}
            className={styles.button}
            withLoader
          />
        </div>
      </Box>
    </MaterialModal>
  )
}

export default ModalSendTips;
