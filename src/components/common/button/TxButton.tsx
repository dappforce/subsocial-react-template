import { FC, memo, useState } from 'react';
import ButtonComponent from './button-component/ButtonComponent';
import {
  TxButtonProps,
  TxCallback,
  TxFailedCallback,
} from 'src/models/common/button';
import { useAuth } from '../../auth/AuthContext';
import { useAppSelector } from 'src/rtk/app/store';
import { useApi } from '../../api';
import { useTranslation } from 'react-i18next';
import { isFunction } from '@polkadot/util';
import { AddressOrPair, VoidFn } from '@polkadot/api/types';
import { ACCOUNT_STATUS } from 'src/models/auth';
import { SubmittableResult } from '@polkadot/api';
import { isEmptyStr } from '@subsocial/utils';
import Loader from '../loader/Loader';
import Snackbar from '../snackbar/Snackbar';
import { useSnackbar } from 'src/hooks/useSnackbar';
import { SnackbarType } from 'src/models/common/snackbar';

const TxButton: FC<TxButtonProps> = ({
  accountId,
  className,
  onClick,
  label,
  children,
  tx,
  params,
  onSuccess,
  onFailed,
  onValidate,
  filedMessage,
  unsigned,
  disabled,
  isFreeTx = false,
  component,
  withLoader = false,
  ...props
}) => {
  const { api: subsocialApi } = useApi();
  const [isSending, setIsSending] = useState(false);
  const [showSnackbar, setShowSnackbar] = useState(false);
  const { openSingInModal, status, hasToken } = useAuth();
  const { signer } = useAppSelector((state) => state.myAccount);
  const { t } = useTranslation();
  const { type, message, isLoader, setSnackConfig, removeSnackbar } =
    useSnackbar();

  let unsub: VoidFn | undefined;

  const isAuthRequired =
    status !== ACCOUNT_STATUS.AUTHORIZED || !hasToken || !accountId;

  if (!subsocialApi) {
    return (
      <ButtonComponent disabled {...props}>
        {label}
      </ButtonComponent>
    );
  }

  const Component = component || ButtonComponent;

  const getExtrinsic = async (): Promise<any> => {
    const [pallet, method] = (tx || '').split('.');

    const api = await subsocialApi.subsocial.substrate.api;

    if (!api.tx[pallet]) {
      throw new Error(`Unable to find api.tx.${pallet}`);
    } else if (!api.tx[pallet][method]) {
      throw new Error(`Unable to find api.tx.${pallet}.${method}`);
    }

    let resultParams = (params || []) as any[];

    if (isFunction(params)) {
      resultParams = await params();
    }

    return api.tx[pallet][method](...resultParams);
  };

  const doOnSuccess: TxCallback = (result) => {
    isFunction(onSuccess) && onSuccess(result);
  };

  const doOnFailed: TxFailedCallback = (result) => {
    isFunction(onFailed) && onFailed(result);
    if (result) {
      setShowSnackbar(true);
      setSnackConfig({
        message: result as unknown as string,
        type: SnackbarType.Error,
      });
    }
  };

  const onSuccessHandler = async (result: SubmittableResult) => {
    if (!result || !result.status) {
      return;
    }

    const { status } = result;

    if (status.isFinalized || status.isInBlock) {
      setIsSending(false);
      await unsubscribe();

      const blockHash = status.isFinalized
        ? status.asFinalized
        : status.asInBlock;

      console.warn(`✅ Tx finalized. Block hash: ${blockHash.toString()}`);

      result.events
        .filter(({ event: { section } }): boolean => section === 'system')
        .forEach(({ event: { method } }): void => {
          if (method === 'ExtrinsicSuccess') {
            doOnSuccess(result);
          } else if (method === 'ExtrinsicFailed') {
            doOnFailed(result);
          }
        });
    } else if (result.isError) {
      doOnFailed(result);
    } else {
      console.warn(`⏱ Current tx status: ${status.type}`);
    }
  };

  const onFailedHandler = (err: Error) => {
    setIsSending(false);

    if (err) {
      const errMsg = `Tx failed: ${err.toString()}`;
      setShowSnackbar(true);
      setSnackConfig({ message: errMsg, type: SnackbarType.Error });

      console.warn(`❌ ${errMsg}`);
    }

    doOnFailed(null);
  };

  const unsubscribe = () => {
    if (unsub) {
      unsub();
      setShowSnackbar(false);
    }
  };

  const sendTx = async () => {
    unsubscribe();

    if (isFunction(onValidate) && !(await onValidate())) {
      console.warn('Cannot send a tx because onValidate() returned false');
      return;
    }

    isFunction(onClick) && onClick();
    const txType = unsigned ? 'unsigned' : 'signed';
    console.warn(`Sending ${txType} tx...`);

    setIsSending(true);

    if (unsigned) {
      sendUnsignedTx();
    } else {
      sendSignedTx();
    }
  };

  const isDisabled = disabled || isSending || isEmptyStr(tx);

  const sendSignedTx = async () => {
    if (!accountId) {
      throw new Error('No account id provided');
    }

    if (!signer) {
      throw new Error('No signer provided');
    }

    const extrinsic = await getExtrinsic();

    try {
      const tx = await extrinsic.signAsync(accountId as AddressOrPair, {
        signer,
      });

      unsub = await tx.send(onSuccessHandler);
      setShowSnackbar(true);
      setSnackConfig({
        message: t('waitingForTx'),
        isLoader: true,
      });
    } catch (err: any) {
      onFailedHandler(err);
    }
  };

  const sendUnsignedTx = async () => {
    const extrinsic = await getExtrinsic();

    try {
      unsub = await extrinsic.send(onSuccessHandler);
    } catch (err: any) {
      onFailedHandler(err);
    }
  };

  const onClickButton = () => {
    if (isAuthRequired && !isFreeTx) {
      openSingInModal(true);
      return setIsSending(false);
    }

    sendTx();
  };

  return (
    <>
      {showSnackbar && (
        <Snackbar
          type={type}
          open={showSnackbar}
          onClose={() => {
            setShowSnackbar(false);
            removeSnackbar();
          }}
          withAutoHide={false}
          withLoader={isLoader}
          message={message}
        />
      )}
      <Component
        onClick={onClickButton}
        className={className || ''}
        disabled={isDisabled || isSending}
        {...props}
      >
        {isSending && withLoader && <Loader />}
        {label || children}
      </Component>
    </>
  );
};

export default memo(TxButton);
