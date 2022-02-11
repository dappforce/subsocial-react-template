import { newLogger } from '@subsocial/utils';
import { CommonContent } from '@subsocial/types';
import { IpfsCid } from '@subsocial/types/substrate/interfaces';
import { SubsocialIpfsApi } from '@subsocial/api';

const log = newLogger('BuildTxParams');

type Params<C extends CommonContent> = {
  ipfs: SubsocialIpfsApi;
  json: C;
  setIpfsCid: (cid: IpfsCid) => void;
  buildTxParamsCallback: (cid: IpfsCid) => any[];
};

export const getTxParams = async <C extends CommonContent>({
  ipfs,
  json,
  setIpfsCid,
  buildTxParamsCallback,
}: Params<C>) => {
  try {
    const cid = await ipfs.saveContent(json);

    if (cid) {
      setIpfsCid(cid);
      return buildTxParamsCallback(cid);
    } else {
      log.error('Save to IPFS returned an undefined CID');
    }
  } catch (err) {
    log.error(`Failed to build tx params. ${err}`);
  }
  return [];
};
