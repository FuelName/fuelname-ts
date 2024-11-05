import type {Account, TxParams} from "fuels";
import {addAssetAndCall, getAssetId, getRegistryReadOnlyContract} from "../utils/fuel_utils";
import {CallResult} from "../utils/types";

const setPrimaryDomain = async (wallet: Account, domain: string, txParams: TxParams): Promise<CallResult<void>> => {
  try {
    const assetIdResult = await getAssetId(domain);
    if (!assetIdResult.isSuccess || !assetIdResult.value) {
      return assetIdResult.asCallFailure();
    }
    const assetId = assetIdResult.value!;

    const registryContractInstance = await getRegistryReadOnlyContract();
    const invocationScope = registryContractInstance
      .functions
      .set_primary({bits: assetId})
      .txParams(txParams);
    const scopeCall = await addAssetAndCall(invocationScope, assetId, wallet.address);

    const functionResult = await scopeCall.waitForResult();

    return CallResult.fromFunctionResult(functionResult);
  } catch (e) {
    return new CallResult<void>(false, [], undefined, undefined, undefined);
  }
}

export default setPrimaryDomain;
