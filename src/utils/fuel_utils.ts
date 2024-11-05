import {Account, AddressLike, AssetId, BytesLike, FunctionInvocationScope, Provider} from "fuels";

import {Registrar, Registry, Resolver} from "./contracts";
import {ReadonlyCallResult, ScopeCall} from "./types";
import {RegistrarContractId, RegistryContractId, ResolverContractId} from "./constants";

const TestnetApiUrl = 'https://testnet.fuel.network/v1/graphql';

let _testnetProvider: Provider | null = null;

export const getTestnetProvider = async () => {
  if (!_testnetProvider) {
    _testnetProvider = await Provider.create(TestnetApiUrl);
  }
  return _testnetProvider;
}

export const getRegistryReadOnlyContract = async () => {
  const provider = await getTestnetProvider();
  return getRegistryContract(provider);
};

export const getRegistrarReadOnlyContract = async () => {
  const provider = await getTestnetProvider();
  return getRegistrarContract(provider);
};

export const getResolverReadOnlyContract = async () => {
  const provider = await getTestnetProvider();
  return getResolverContract(provider);
};

export const getRegistryContract = (accountOrProvider: Account | Provider) => {
  return new Registry(RegistryContractId, accountOrProvider);
};

export const getRegistrarContract = (accountOrProvider: Account | Provider) => {
  return new Registrar(RegistrarContractId, accountOrProvider);
};

export const getResolverContract = (accountOrProvider: Account | Provider) => {
  return new Resolver(ResolverContractId, accountOrProvider);
};

export const addAssetAndCall = async <TArgs extends Array<any>, TReturn>(scope: FunctionInvocationScope<TArgs, TReturn>,
                                                                         assetId: BytesLike,
                                                                         to: AddressLike): Promise<ScopeCall<TReturn>> => {
  const transactionRequest = await scope.getTransactionRequest();
  transactionRequest.addCoinOutput(to, 1, assetId);
  return await scope.call();
};

export const getAssetId = async (domain: string): Promise<ReadonlyCallResult<string>> => {
  try {
    if (domain.endsWith('.fuel')) {
      const registryContractInstance = await getRegistryReadOnlyContract();
      const result = await registryContractInstance
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
};

const hexRegex = /^[a-fA-F0-9]{64}$/;

const parseHexAssetId = (hexStr: string): string => {
  hexStr = hexStr.startsWith('0x') ? hexStr.slice(2) : hexStr;
  if (!hexRegex.test(hexStr)) {
    throw new Error(`Invalid hex asset id: ${hexStr}`);
  }
  return addHexPrefix(hexStr);
}

const addHexPrefix = (hexStr: string): string => {
  return hexStr.startsWith('0x') ? hexStr : `0x${hexStr}`;
}

export const removeFuelDomainSuffix = (domain: string): string => {
  return domain.endsWith(".fuel") ? domain.slice(0, -5) : domain;
};

export const getBaseAssetId = async (): Promise<string> => {
  const provider = await getTestnetProvider();
  return addHexPrefix(provider.getBaseAssetId());
};
