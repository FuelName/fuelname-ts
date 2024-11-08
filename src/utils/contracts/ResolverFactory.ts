/* Autogenerated file. Do not edit manually. */

/* eslint-disable max-classes-per-file */
/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/consistent-type-imports */

/*
  Fuels version: 0.96.1
*/

import { Contract, ContractFactory, decompressBytecode } from "fuels";
import type { Provider, Account, DeployContractOptions, DeployContractResult } from "fuels";

import { Resolver } from "./Resolver";

const bytecode = decompressBytecode("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");

export class ResolverFactory extends ContractFactory {

  static readonly bytecode = bytecode;

  constructor(accountOrProvider: Account | Provider) {
    super(bytecode, Resolver.abi, accountOrProvider);
  }

  override deploy<TContract extends Contract = Contract>(
    deployOptions?: DeployContractOptions
  ): Promise<DeployContractResult<TContract>> {
    return super.deploy({
      storageSlots: Resolver.storageSlots,
      ...deployOptions,
    });
  }

  static async deploy (
    wallet: Account,
    options: DeployContractOptions = {}
  ): Promise<DeployContractResult<Resolver>> {
    const factory = new ResolverFactory(wallet);
    return factory.deploy(options);
  }
}
