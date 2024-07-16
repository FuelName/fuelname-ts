import type {Account, Address, TxParams} from "fuels";

import {addAssetAndCall, getAssetId, getResolverContract} from "../utils/fuel_utils";
import {Option} from "../utils/contracts/common";
import {CallResult} from "../utils/types";

const setAddress = async (wallet: Account, domain: string, address: Option<Address>, txParams: TxParams): Promise<CallResult<void>> => {
  try {
    const assetIdResult = await getAssetId(domain);
    if (!assetIdResult.isSuccess || !assetIdResult.value) {
      return assetIdResult.asCallFailure();
    }
    const assetId = assetIdResult.value!;

    const invocationScope = getResolverContract(wallet)
      .functions
      .set({bits: assetId}, address ? {Address: {bits: address.toB256()}} : undefined)
      .txParams(txParams);
    const result = await addAssetAndCall(invocationScope, assetId, wallet.address);
    return CallResult.fromFunctionInvocationResult(result);
  } catch (e) {
    return new CallResult<void>(false, [], undefined, undefined, undefined);
  }
};

export default setAddress;
