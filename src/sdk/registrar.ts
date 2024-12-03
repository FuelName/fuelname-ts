import {Account, BN, CoinQuantityLike, Provider, ScriptTransactionRequest, type TxParams} from "fuels";
import {Registrar} from "./typegen";
import {DomainPrice, ReadonlyCallResult} from "../utils/types";
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

  private async getResourcesToSpend(quantities: CoinQuantityLike[]) {
    if (this.accountOrProvider instanceof Account) {
      return await this.accountOrProvider.getResourcesToSpend(quantities);
    }

    throw new Error('Account is not available');
  }

  async mintDomain(domain: string, years: number, txParams: TxParams, price: DomainPrice): Promise<ScriptTransactionRequest> {
    try {
      const subdomain = removeFuelDomainSuffix(domain);

      const request = await this.writeRegistrarContract!
        .functions
        .mint_domain(subdomain, years)
        .txParams(txParams)
        .getTransactionRequest();

      // Not sure about what exactly is variable output here, for me it seemed to be 1
      request.addVariableOutputs(1);

      request.addResources(
        await this.getResourcesToSpend([
          { assetId: price.assetId, amount: price.value },
          { assetId: this.provider().getBaseAssetId(), amount: txParams.gasLimit! }
        ])
      );

      // Not sure whether funding should be done here or on the client – both ways didn't work for me anyway
      const txCost = await this.account().getTransactionCost(request);
      return await this.account().fund(request, txCost);
    } catch (e) {
      // Probably returning null or Error is better here
      return new ScriptTransactionRequest();
    }
  }

}
