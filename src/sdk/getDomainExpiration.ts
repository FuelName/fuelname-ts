import {BN} from "fuels";

import {getRegistryReadOnlyContract} from "../utils/fuel_utils";
import type {Option} from "../utils/contracts/common";
import {ReadonlyCallResult} from "../utils/types";

const getDomainExpiration = async (domain: string): Promise<ReadonlyCallResult<Option<BN>>> => {
  try {
    const registryContractInstance = await getRegistryReadOnlyContract();
    const result = await registryContractInstance
      .functions
      .get_expiration(domain)
      .get();
    return ReadonlyCallResult.fromInvocationResult(result);
  } catch (e) {
    return new ReadonlyCallResult<Option<BN>>(false, [], undefined);
  }
};

export default getDomainExpiration;
