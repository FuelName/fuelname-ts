import {getAssetId, getResolverReadOnlyContract} from "../utils/fuel_utils";
import type {Option} from "../utils/contracts/common";
import {ReadonlyCallResult} from "../utils/types";

const resolveDomainToAddress = async (domain: string): Promise<ReadonlyCallResult<Option<string>>> => {
  try {
    const assetIdResult = await getAssetId(domain);
    if (!assetIdResult.isSuccess || !assetIdResult.value) {
      return assetIdResult.asFailure();
    }
    const assetId = assetIdResult.value!;
    const resolverContractInstance = await getResolverReadOnlyContract();
    const result = await resolverContractInstance
      .functions
      .resolve({bits: assetId})
      .get();

    return ReadonlyCallResult.fromInvocationResult(result)
      .map((value) => value?.Address?.bits || value?.ContractId?.bits);
  } catch (e) {
    return new ReadonlyCallResult<Option<string>>(false, [], undefined);
  }
}

export default resolveDomainToAddress;
