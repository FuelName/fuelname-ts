import type {Account, BN, TxParams} from "fuels";
import getDomainPrice from "./getDomainPrice";
import {
  getBaseAssetId,
  getRegistrarContract,
  getRegistryReadOnlyContract,
  removeFuelDomainSuffix
} from "../utils/fuel_utils";
import {CallResult} from "../utils/types";

type Price = {
  assetId: string;
  value: BN;
};

const mintDomain = async (account: Account, domain: string, years: number, txParams: TxParams, price?: Price): Promise<CallResult<string>> => {
  try {
    const subdomain = removeFuelDomainSuffix(domain);
    let paymentAssetId: string, paymentAmount: BN;
    if (price) {
      paymentAssetId = price.assetId;
      paymentAmount = price.value;
    } else {
      const domainPricesResult = await getDomainPrice(subdomain, years);
      if (!domainPricesResult.isSuccess || !domainPricesResult.value) {
        return domainPricesResult.asCallFailure();
      }
      const domainPrices = domainPricesResult.value!;
      paymentAssetId = await getBaseAssetId();
      paymentAmount = domainPrices.get(paymentAssetId)!;
    }
    const registryContractInstance = await getRegistryReadOnlyContract();
    const registrarContractInstance = getRegistrarContract(account);
    const scopeCall = await registrarContractInstance
      .functions
      .mint_domain(subdomain, years)
      .addContracts([registryContractInstance])
      .callParams({forward: {amount: paymentAmount, assetId: paymentAssetId}})
      .txParams(txParams)
      .call();

    const functionResult = await scopeCall.waitForResult();

    return CallResult.fromFunctionResult(functionResult)
      .map(assetId => assetId.bits);
  } catch (e) {
    return new CallResult<string>(false, [], undefined, undefined, undefined);
  }
};

export default mintDomain;
