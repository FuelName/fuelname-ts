/* Autogenerated file. Do not edit manually. */

/* eslint-disable max-classes-per-file */
/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/consistent-type-imports */

/*
  Fuels version: 0.97.0
*/

import { Contract, Interface } from "fuels";
import type {
  Provider,
  Account,
  StorageSlot,
  AbstractAddress,
  FunctionFragment,
  InvokeFunction,
} from 'fuels';

import type { Option, Enum } from "./common";

export enum ExpirationErrorInput { ExpiredDomain = 'ExpiredDomain' };
export enum ExpirationErrorOutput { ExpiredDomain = 'ExpiredDomain' };
export type IdentityInput = Enum<{ Address: AddressInput, ContractId: ContractIdInput }>;
export type IdentityOutput = Enum<{ Address: AddressOutput, ContractId: ContractIdOutput }>;
export enum OwnershipErrorInput { NotDomainOwner = 'NotDomainOwner' };
export enum OwnershipErrorOutput { NotDomainOwner = 'NotDomainOwner' };

export type AddressInput = { bits: string };
export type AddressOutput = AddressInput;
export type AssetIdInput = { bits: string };
export type AssetIdOutput = AssetIdInput;
export type ContractIdInput = { bits: string };
export type ContractIdOutput = ContractIdInput;
export type SetAddressEventInput = { asset: AssetIdInput, identity: Option<IdentityInput> };
export type SetAddressEventOutput = { asset: AssetIdOutput, identity: Option<IdentityOutput> };

export type ResolverConfigurables = Partial<{
  REGISTRY_CONTRACT_ID: ContractIdInput;
}>;

const abi = {
  "programType": "contract",
  "specVersion": "1",
  "encodingVersion": "1",
  "concreteTypes": [
    {
      "type": "()",
      "concreteTypeId": "2e38e77b22c314a449e91fafed92a43826ac6aa403ae6a8acb6cf58239fbaf5d"
    },
    {
      "type": "enum errors::ExpirationError",
      "concreteTypeId": "ee7a715622ed02d79e886175ef1d67eb792ec779ac30a30e6c5cb6cd0b9078b1",
      "metadataTypeId": 1
    },
    {
      "type": "enum errors::OwnershipError",
      "concreteTypeId": "aee2b753e18659eedbaa4e102230ed85324bb7b4c022931cd57aa8d3af6668a0",
      "metadataTypeId": 2
    },
    {
      "type": "enum std::identity::Identity",
      "concreteTypeId": "ab7cd04e05be58e3fc15d424c2c4a57f824a2a2d97d67252440a3925ebdc1335",
      "metadataTypeId": 3
    },
    {
      "type": "enum std::option::Option<enum std::identity::Identity>",
      "concreteTypeId": "253aea1197e8005518365bd24c8bc31f73a434fac0f7350e57696edfdd4850c2",
      "metadataTypeId": 4,
      "typeArguments": [
        "ab7cd04e05be58e3fc15d424c2c4a57f824a2a2d97d67252440a3925ebdc1335"
      ]
    },
    {
      "type": "struct SetAddressEvent",
      "concreteTypeId": "44a7faea0a1080b7a61ff45439f6aead0184d5c89294f2ac8d8ee57319707221",
      "metadataTypeId": 6
    },
    {
      "type": "struct std::asset_id::AssetId",
      "concreteTypeId": "c0710b6731b1dd59799cf6bef33eee3b3b04a2e40e80a0724090215bbf2ca974",
      "metadataTypeId": 8
    },
    {
      "type": "struct std::contract_id::ContractId",
      "concreteTypeId": "29c10735d33b5159f0c71ee1dbd17b36a3e69e41f00fab0d42e1bd9f428d8a54",
      "metadataTypeId": 9
    }
  ],
  "metadataTypes": [
    {
      "type": "b256",
      "metadataTypeId": 0
    },
    {
      "type": "enum errors::ExpirationError",
      "metadataTypeId": 1,
      "components": [
        {
          "name": "ExpiredDomain",
          "typeId": "2e38e77b22c314a449e91fafed92a43826ac6aa403ae6a8acb6cf58239fbaf5d"
        }
      ]
    },
    {
      "type": "enum errors::OwnershipError",
      "metadataTypeId": 2,
      "components": [
        {
          "name": "NotDomainOwner",
          "typeId": "2e38e77b22c314a449e91fafed92a43826ac6aa403ae6a8acb6cf58239fbaf5d"
        }
      ]
    },
    {
      "type": "enum std::identity::Identity",
      "metadataTypeId": 3,
      "components": [
        {
          "name": "Address",
          "typeId": 7
        },
        {
          "name": "ContractId",
          "typeId": 9
        }
      ]
    },
    {
      "type": "enum std::option::Option",
      "metadataTypeId": 4,
      "components": [
        {
          "name": "None",
          "typeId": "2e38e77b22c314a449e91fafed92a43826ac6aa403ae6a8acb6cf58239fbaf5d"
        },
        {
          "name": "Some",
          "typeId": 5
        }
      ],
      "typeParameters": [
        5
      ]
    },
    {
      "type": "generic T",
      "metadataTypeId": 5
    },
    {
      "type": "struct SetAddressEvent",
      "metadataTypeId": 6,
      "components": [
        {
          "name": "asset",
          "typeId": 8
        },
        {
          "name": "identity",
          "typeId": 4,
          "typeArguments": [
            {
              "name": "",
              "typeId": 3
            }
          ]
        }
      ]
    },
    {
      "type": "struct std::address::Address",
      "metadataTypeId": 7,
      "components": [
        {
          "name": "bits",
          "typeId": 0
        }
      ]
    },
    {
      "type": "struct std::asset_id::AssetId",
      "metadataTypeId": 8,
      "components": [
        {
          "name": "bits",
          "typeId": 0
        }
      ]
    },
    {
      "type": "struct std::contract_id::ContractId",
      "metadataTypeId": 9,
      "components": [
        {
          "name": "bits",
          "typeId": 0
        }
      ]
    }
  ],
  "functions": [
    {
      "inputs": [
        {
          "name": "asset",
          "concreteTypeId": "c0710b6731b1dd59799cf6bef33eee3b3b04a2e40e80a0724090215bbf2ca974"
        }
      ],
      "name": "resolve",
      "output": "253aea1197e8005518365bd24c8bc31f73a434fac0f7350e57696edfdd4850c2",
      "attributes": [
        {
          "name": "storage",
          "arguments": [
            "read"
          ]
        }
      ]
    },
    {
      "inputs": [
        {
          "name": "asset",
          "concreteTypeId": "c0710b6731b1dd59799cf6bef33eee3b3b04a2e40e80a0724090215bbf2ca974"
        },
        {
          "name": "resolve_to",
          "concreteTypeId": "253aea1197e8005518365bd24c8bc31f73a434fac0f7350e57696edfdd4850c2"
        }
      ],
      "name": "set",
      "output": "2e38e77b22c314a449e91fafed92a43826ac6aa403ae6a8acb6cf58239fbaf5d",
      "attributes": [
        {
          "name": "storage",
          "arguments": [
            "read",
            "write"
          ]
        }
      ]
    }
  ],
  "loggedTypes": [
    {
      "logId": "12601836278229916142",
      "concreteTypeId": "aee2b753e18659eedbaa4e102230ed85324bb7b4c022931cd57aa8d3af6668a0"
    },
    {
      "logId": "17184171942952633047",
      "concreteTypeId": "ee7a715622ed02d79e886175ef1d67eb792ec779ac30a30e6c5cb6cd0b9078b1"
    },
    {
      "logId": "4947198598787924151",
      "concreteTypeId": "44a7faea0a1080b7a61ff45439f6aead0184d5c89294f2ac8d8ee57319707221"
    }
  ],
  "messagesTypes": [],
  "configurables": [
    {
      "name": "REGISTRY_CONTRACT_ID",
      "concreteTypeId": "29c10735d33b5159f0c71ee1dbd17b36a3e69e41f00fab0d42e1bd9f428d8a54",
      "offset": 12848
    }
  ]
};

const storageSlots: StorageSlot[] = [];

export class ResolverInterface extends Interface {
  constructor() {
    super(abi);
  }

  declare functions: {
    resolve: FunctionFragment;
    set: FunctionFragment;
  };
}

export class Resolver extends Contract {
  static readonly abi = abi;
  static readonly storageSlots = storageSlots;

  declare interface: ResolverInterface;
  declare functions: {
    resolve: InvokeFunction<[asset: AssetIdInput], Option<IdentityOutput>>;
    set: InvokeFunction<[asset: AssetIdInput, resolve_to?: Option<IdentityInput>], void>;
  };

  constructor(
    id: string | AbstractAddress,
    accountOrProvider: Account | Provider,
  ) {
    super(id, abi, accountOrProvider);
  }
}
