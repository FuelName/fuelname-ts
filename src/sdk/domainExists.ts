import {getAssetId, getRegistryReadOnlyContract} from "../utils/fuel_utils";
import {ReadonlyCallResult} from "../utils/types";

const domainExists = async (domain: string): Promise<ReadonlyCallResult<boolean>> => {
  try {
    const assetIdResult = await getAssetId(domain);
    if (!assetIdResult.isSuccess || !assetIdResult.value) {
      return assetIdResult.asFailure();
    }
    const assetId = assetIdResult.value!;
    const contractInstance = await getRegistryReadOnlyContract();
    const result = await contractInstance
      .functions
      .domain_exists({bits: assetId})
      .get();

    return ReadonlyCallResult.fromInvocationResult(result);
  } catch (e) {
    return new ReadonlyCallResult<boolean>(false, [], undefined);
  }
};

export default domainExists;
