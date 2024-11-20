import {Account, BN, Provider, type TxParams} from "fuels";
import {Registrar} from "./typegen";
import {CallResult, DomainPrice, ReadonlyCallResult} from "../utils/types";
import {registrarContractId} from "../utils/constants";
import {removeFuelDomainSuffix} from "../utils/fuel_utils";

export class FuelnameRegistrar {
  private readonly accountOrProvider: Account | Provider;
  private readonly readonlyRegistrarContract: Registrar;
  private readonly writeRegistrarContract?: Registrar;

  constructor(accountOrProvider: Account | Provider, contractIdOpt?: string) {
    const provider = accountOrProvider instanceof Provider ? accountOrProvider : accountOrProvider.provider;
    const contractId = contractIdOpt ?? registrarContractId(provider.url);
    this.accountOrProvider = accountOrProvider;
    this.readonlyRegistrarContract = new Registrar(contractId, provider);
    if (accountOrProvider instanceof Account) {
      this.writeRegistrarContract = new Registrar(contractId, accountOrProvider);
    }
  }

  id(): string {
    return this.readonlyRegistrarContract.id.toB256();
  }

  provider(): Provider {
    return this.accountOrProvider instanceof Provider ? this.accountOrProvider : this.accountOrProvider.provider;
  }

  account(): Account {
    if (this.accountOrProvider instanceof Account) {
      return this.accountOrProvider;
    }
    throw new Error('Account is not available');
  }

  async getDomainPrice(domain: string, years: number, asset: string): Promise<ReadonlyCallResult<BN>> {
    try {
      const subdomain = removeFuelDomainSuffix(domain);
      const result = await this.readonlyRegistrarContract
        .functions
        .domain_price(subdomain, years, {bits: asset})
        .get();
      return ReadonlyCallResult.fromInvocationResult(result);
    } catch (e) {
      return new ReadonlyCallResult<BN>(false, [], undefined);
    }
  }

  async mintDomain(domain: string, years: number, txParams: TxParams, price: DomainPrice): Promise<CallResult<string>> {
    try {
      const subdomain = removeFuelDomainSuffix(domain);

      const scopeCall = await this.writeRegistrarContract!
        .functions
        .mint_domain(subdomain, years)
        .callParams({forward: {amount: price.value, assetId: price.assetId}})
        .txParams(txParams)
        .call();

      const functionResult = await scopeCall.waitForResult();

      return CallResult.fromFunctionResult(functionResult)
        .map(assetId => assetId.bits);
    } catch (e) {
      return new CallResult<string>(false, [], undefined, undefined, undefined);
    }
  }

}
