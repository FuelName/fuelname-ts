import type {Account, TxParams} from "fuels";
import {addAssetAndCall, getAssetId, getResolverContract} from "../utils/fuel_utils";
import {CallResult} from "../utils/types";

const setPrimaryDomain = async (wallet: Account, domain: string, txParams: TxParams): Promise<CallResult<void>> => {
  try {
    const assetIdResult = await getAssetId(domain);
    if (!assetIdResult.isSuccess || !assetIdResult.value) {
      return assetIdResult.asCallFailure();
    }
    const assetId = assetIdResult.value!;

    const resolverContractInstance = getResolverContract(wallet);
    const invocationScope = resolverContractInstance
      .functions
      .set_primary({bits: assetId})
      .txParams(txParams);
    const result = await addAssetAndCall(invocationScope, assetId, wallet.address);
    return CallResult.fromFunctionInvocationResult(result);
  } catch (e) {
    return new CallResult<void>(false, [], undefined, undefined, undefined);
  }
}

export default setPrimaryDomain;
