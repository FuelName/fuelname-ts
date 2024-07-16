import {getRegistryReadOnlyContract} from "../utils/fuel_utils";
import {ReadonlyCallResult} from "../utils/types";

const getDomainName = async (assetId: string): Promise<ReadonlyCallResult<string>> => {
  const contractInstance = await getRegistryReadOnlyContract();
  try {
    const result = await contractInstance
      .functions
      .get_domain_name({bits: assetId})
      .get();
    return ReadonlyCallResult.fromInvocationResult(result);
  } catch (e) {
    return new ReadonlyCallResult<string>(false, [], undefined);
  }
};

export default getDomainName;
