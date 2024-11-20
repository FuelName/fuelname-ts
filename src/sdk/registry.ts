import {Account, type Address, BN, Provider, type TxParams} from "fuels";
import {Registry, Resolver} from "./typegen";
import {CallResult, ReadonlyCallResult} from "../utils/types";
import {addAssetAndCall, parseHexAssetId} from "../utils/fuel_utils";
import {Option} from "./typegen/common";
import {ContractIdInput, IdentityOutput} from "./typegen/Registry";
import {registryContractId} from "../utils/constants";

export class FuelnameRegistry {
  private readonly accountOrProvider: Account | Provider;
  private readonly readonlyRegistryContract: Registry;
  private readonly writeRegistryContract?: Registry;

  constructor(accountOrProvider: Account | Provider, contractIdOpt?: string) {
    const provider = accountOrProvider instanceof Provider ? accountOrProvider : accountOrProvider.provider;
    const contractId = contractIdOpt ?? registryContractId(provider.url);
    this.accountOrProvider = accountOrProvider;
    this.readonlyRegistryContract = new Registry(contractId, provider);
    if (accountOrProvider instanceof Account) {
      this.writeRegistryContract = new Registry(contractId, accountOrProvider);
    }
  }

  id(): string {
    return this.readonlyRegistryContract.id.toB256();
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

  async getDomainAsset(domain: string): Promise<ReadonlyCallResult<string>> {
    return this.getAssetId(domain);
  }

  async domainExists(domain: string): Promise<ReadonlyCallResult<boolean>> {
    try {
      const assetIdResult = await this.getAssetId(domain);
      if (!assetIdResult.isSuccess || !assetIdResult.value) {
        return assetIdResult.asFailure();
      }
      const assetId = assetIdResult.value!;
      const result = await this.readonlyRegistryContract
        .functions
        .domain_exists({bits: assetId})
        .get();

      return ReadonlyCallResult.fromInvocationResult(result);
    } catch (e) {
      return new ReadonlyCallResult<boolean>(false, [], undefined);
    }
  }

  async getDomainExpiration(domain: string): Promise<ReadonlyCallResult<Option<BN>>> {
    try {
      const result = await this.readonlyRegistryContract
        .functions
        .get_expiration(domain)
        .get();
      return ReadonlyCallResult.fromInvocationResult(result);
    } catch (e) {
      return new ReadonlyCallResult<Option<BN>>(false, [], undefined);
    }
  }

  async getDomainName(domain: string): Promise<ReadonlyCallResult<string>> {
    try {
      const [assetIdResult] = await Promise.all([this.getAssetId(domain)]);
      if (!assetIdResult.isSuccess || !assetIdResult.value) {
        return assetIdResult.asFailure();
      }
      const assetId = assetIdResult.value!;
      const result = await this.readonlyRegistryContract
        .functions
        .get_domain_name({bits: assetId})
        .get();
      return ReadonlyCallResult.fromInvocationResult(result);
    } catch (e) {
      return new ReadonlyCallResult<string>(false, [], undefined);
    }
  }

  async getPrimaryDomain(address: Address): Promise<ReadonlyCallResult<Option<string>>> {
    try {
      const result = await this.readonlyRegistryContract
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

      return await this.getDomainName(assetId.bits);
    } catch (e) {
      return new ReadonlyCallResult<Option<string>>(false, [], undefined);
    }
  }

  async getDomainResolverId(domain: string): Promise<ReadonlyCallResult<Option<ContractIdInput>>> {
    try {
      const result = await this.readonlyRegistryContract
        .functions
        .get_resolver(domain)
        .get();
      return ReadonlyCallResult.fromInvocationResult(result);
    } catch (e) {
      return new ReadonlyCallResult<Option<ContractIdInput>>(false, [], undefined);
    }
  }

  async resolveDomainToAddress(domain: string): Promise<ReadonlyCallResult<Option<IdentityOutput>>> {
    try {
      const assetIdResult = await this.getAssetId(domain);
      if (!assetIdResult.isSuccess || !assetIdResult.value) {
        return assetIdResult.asFailure();
      }
      const assetId = assetIdResult.value!;
      const resolverResponse = await this.getDomainResolver(domain);
      if (!resolverResponse.isSuccess) {
        return resolverResponse.asFailure();
      }
      if (!resolverResponse.value) {
        return new ReadonlyCallResult(true, [], undefined);
      }
      const resolver = resolverResponse.value!;

      const result = await resolver
        .functions
        .resolve({bits: assetId})
        .get();

      return ReadonlyCallResult.fromInvocationResult(result);
    } catch (e) {
      return new ReadonlyCallResult<Option<IdentityOutput>>(false, [], undefined);
    }
  }

  async setAddress(domain: string, address: Option<Address>, txParams: TxParams): Promise<CallResult<void>> {
    const account = this.account();
    try {
      const assetIdResult = await this.getAssetId(domain);
      if (!assetIdResult.isSuccess || !assetIdResult.value) {
        return assetIdResult.asCallFailure();
      }
      const assetId = assetIdResult.value!;

      const resolverResponse = await this.getDomainResolver(domain);
      if (!resolverResponse.isSuccess || !resolverResponse.value) {
        return resolverResponse.asFailure();
      }
      const resolver = resolverResponse.value!;

      const invocationScope = resolver
        .functions
        .set({bits: assetId}, address ? {Address: {bits: address.toB256()}} : undefined)
        .txParams(txParams);
      const scopeCall = await addAssetAndCall(invocationScope, assetId, account.address);

      const functionResult = await scopeCall.waitForResult();

      return CallResult.fromFunctionResult(functionResult);
    } catch (e) {
      return new CallResult<void>(false, [], undefined, undefined, undefined);
    }
  }

  async setPrimaryDomain(domain: string, txParams: TxParams): Promise<CallResult<void>> {
    const account = this.account();
    try {
      const assetIdResult = await this.getAssetId(domain);
      if (!assetIdResult.isSuccess || !assetIdResult.value) {
        return assetIdResult.asCallFailure();
      }
      const assetId = assetIdResult.value!;

      const invocationScope = this.writeRegistryContract!
        .functions
        .set_primary({bits: assetId})
        .txParams(txParams);
      const scopeCall = await addAssetAndCall(invocationScope, assetId, account.address);

      const functionResult = await scopeCall.waitForResult();

      return CallResult.fromFunctionResult(functionResult);
    } catch (e) {
      return new CallResult<void>(false, [], undefined, undefined, undefined);
    }
  }

  private async getAssetId(domain: string): Promise<ReadonlyCallResult<string>> {
    try {
      if (domain.endsWith('.fuel')) {
        const result = await this.readonlyRegistryContract
          .functions
          .get_domain_asset_id(domain)
          .get();
        return ReadonlyCallResult.fromInvocationResult(result)
          .map(domainAssetId => parseHexAssetId(domainAssetId.bits))
      }
      return new ReadonlyCallResult(true, [], parseHexAssetId(domain))
    } catch (e) {
      return new ReadonlyCallResult<string>(false, [], undefined);
    }
  }

  private async getDomainResolver(domain: string): Promise<ReadonlyCallResult<Option<Resolver>>> {
    try {
      const resolverContractIdResponse = await this.getDomainResolverId(domain);
      if (!resolverContractIdResponse.isSuccess) {
        return resolverContractIdResponse.asFailure();
      }
      const resolver = resolverContractIdResponse.value ? new Resolver(resolverContractIdResponse.value.bits, this.provider()) : undefined;
      return new ReadonlyCallResult(true, [], resolver)
    } catch (e) {
      return new ReadonlyCallResult<Option<Resolver>>(false, [], undefined);
    }
  }
}
