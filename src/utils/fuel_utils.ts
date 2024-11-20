import {AddressLike, BytesLike, FunctionInvocationScope} from "fuels";

import {ScopeCall} from "./types";

export const addAssetAndCall = async <TArgs extends Array<any>, TReturn>(scope: FunctionInvocationScope<TArgs, TReturn>,
                                                                         assetId: BytesLike,
                                                                         to: AddressLike): Promise<ScopeCall<TReturn>> => {
  const transactionRequest = await scope.getTransactionRequest();
  transactionRequest.addCoinOutput(to, 1, assetId);
  return await scope.call();
};

const hexRegex = /^[a-fA-F0-9]{64}$/;

export const parseHexAssetId = (hexStr: string): string => {
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
