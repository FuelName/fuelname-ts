import {BN} from "fuels";

import {getBaseAssetId, getRegistrarReadOnlyContract, removeFuelDomainSuffix} from "../utils/fuel_utils";
import {ReadonlyCallResult} from "../utils/types";

const getDomainPrice = async (domain: string, years: number): Promise<ReadonlyCallResult<Map<string, BN>>> => {
  try {
    const subdomain = removeFuelDomainSuffix(domain);
    const contractInstance = await getRegistrarReadOnlyContract();
    const result = await contractInstance
      .functions
      .domain_price(subdomain, years)
      .get();
    const baseAssetId = await getBaseAssetId();
    return ReadonlyCallResult.fromInvocationResult(result)
      .map(price => new Map<string, BN>([[baseAssetId, price]]));
  } catch (e) {
    return new ReadonlyCallResult<Map<string, BN>>(false, [], undefined);
  }
};

export default getDomainPrice;
