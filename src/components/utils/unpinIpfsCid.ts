import { SubsocialIpfsApi } from '@subsocial/api';
import { IpfsCid } from '@subsocial/types';

export const unpinIpfsCid = (
  ipfs: SubsocialIpfsApi,
  newCid?: IpfsCid,
  oldCid?: IpfsCid
) => {
  if (newCid && newCid !== oldCid) {
    return ipfs
      .removeContent(newCid)
      .then((data) => {
        return data;
      })
      .catch((err) => new Error(err));
  }
};
