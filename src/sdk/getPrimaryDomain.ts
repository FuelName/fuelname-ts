import type {Address, AssetId} from "fuels";

import {getRegistryReadOnlyContract} from "../utils/fuel_utils";
import getDomainName from "./getDomainName";
import {Option} from "../utils/contracts/common";
import {ReadonlyCallResult} from "../utils/types";

const getPrimaryDomain = async (address: Address): Promise<ReadonlyCallResult<Option<string>>> => {
  try {
    const registryContractInstance = await getRegistryReadOnlyContract();
    const result = await registryContractInstance
      .functions
      .resolve_to_primary_domain({Address: {bits: address.toB256()}})
      .get();
    const readonlyResult = ReadonlyCallResult.fromInvocationResult(result);
    if (!readonlyResult.isSuccess) {
      return readonlyResult.asFailure();
    }
    let assetId = readonlyResult.value;
    if (!assetId) {
      return new ReadonlyCallResult(true, readonlyResult.receipts, undefined);
    }

    return await getDomainName(assetId.bits);
  } catch (e) {
    return new ReadonlyCallResult<Option<string>>(false, [], undefined);
  }
};

export default getPrimaryDomain;
