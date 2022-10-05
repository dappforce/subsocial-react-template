import { newLogger } from '@subsocial/utils';
import { IpfsCommonContent } from '@subsocial/api/types';
import { IpfsCid } from '@subsocial/api/types/substrate';
import { SubsocialIpfsApi } from '@subsocial/api';

const log = newLogger('BuildTxParams');

type Params<C extends IpfsCommonContent> = {
  ipfs: SubsocialIpfsApi;
  json: C;
  buildTxParamsCallback: (cid: string) => any[];
};

export const getTxParams = async <C extends IpfsCommonContent>({
  ipfs,
  json,
  buildTxParamsCallback,
}: Params<C>) => {
  try {
    const cid = await ipfs.saveContent(json);

    if (cid) {
      return buildTxParamsCallback(cid.toString());
    } else {
      log.error('Save to IPFS returned an undefined CID');
    }
  } catch (err) {
    log.error(`Failed to build tx params. ${err}`);
  }
  return [];
};
