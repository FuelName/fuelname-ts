/* Autogenerated file. Do not edit manually. */

/* eslint-disable max-classes-per-file */
/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/consistent-type-imports */

/*
  Fuels version: 0.96.1
*/

import { Contract, Interface } from "fuels";
import type {
  Provider,
  Account,
  StorageSlot,
  AbstractAddress,
  BigNumberish,
  BN,
  Bytes,
  FunctionFragment,
  InvokeFunction,
  StdString,
} from 'fuels';

import type { Enum } from "./common";

export enum AccessErrorInput { NotOwner = 'NotOwner' };
export enum AccessErrorOutput { NotOwner = 'NotOwner' };
export enum DomainRenewalErrorInput { CanNotRenewRootDomain = 'CanNotRenewRootDomain' };
export enum DomainRenewalErrorOutput { CanNotRenewRootDomain = 'CanNotRenewRootDomain' };
export enum GracePeriodErrorInput { InvalidGracePeriodDuration = 'InvalidGracePeriodDuration' };
export enum GracePeriodErrorOutput { InvalidGracePeriodDuration = 'InvalidGracePeriodDuration' };
export type IdentityInput = Enum<{ Address: AddressInput, ContractId: ContractIdInput }>;
export type IdentityOutput = Enum<{ Address: AddressOutput, ContractId: ContractIdOutput }>;
export enum InitializationErrorInput { CannotReinitialized = 'CannotReinitialized' };
export enum InitializationErrorOutput { CannotReinitialized = 'CannotReinitialized' };
export enum ValidationErrorInput { InvalidDomainName = 'InvalidDomainName', InvalidPeriod = 'InvalidPeriod', WrongFeeAmount = 'WrongFeeAmount' };
export enum ValidationErrorOutput { InvalidDomainName = 'InvalidDomainName', InvalidPeriod = 'InvalidPeriod', WrongFeeAmount = 'WrongFeeAmount' };

export type AddressInput = { bits: string };
export type AddressOutput = AddressInput;
export type AssetIdInput = { bits: string };
export type AssetIdOutput = AssetIdInput;
export type ContractIdInput = { bits: string };
export type ContractIdOutput = ContractIdInput;
export type OwnershipSetInput = { new_owner: IdentityInput };
export type OwnershipSetOutput = { new_owner: IdentityOutput };

export type RegistrarConfigurables = Partial<{
  REGISTRY_CONTRACT_ID: ContractIdInput;
  DEFAULT_RESOLVER_CONTRACT_ID: ContractIdInput;
  RESERVER_ADDRESS: string;
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
      "type": "b256",
      "concreteTypeId": "7c5ee1cecf5f8eacd1284feb5f0bf2bdea533a51e2f0c9aabe9236d335989f3b"
    },
    {
      "type": "enum errors::DomainRenewalError",
      "concreteTypeId": "cd65ec2daed1d3dbc3938a60c52b21602222993a736153a20f2f3dbeb6ceb24a",
      "metadataTypeId": 0
    },
    {
      "type": "enum errors::GracePeriodError",
      "concreteTypeId": "887317a065009a5155723008af1cb63074f86cfe9ed093c3aea3c9e710c2bef2",
      "metadataTypeId": 1
    },
    {
      "type": "enum errors::ValidationError",
      "concreteTypeId": "6035fe0570bba8a2c3eaca3ef799babf90d26bbd8d7c35f17b0441b5dbce8c8e",
      "metadataTypeId": 2
    },
    {
      "type": "enum standards::src5::AccessError",
      "concreteTypeId": "3f702ea3351c9c1ece2b84048006c8034a24cbc2bad2e740d0412b4172951d3d",
      "metadataTypeId": 3
    },
    {
      "type": "enum sway_libs::ownership::errors::InitializationError",
      "concreteTypeId": "1dfe7feadc1d9667a4351761230f948744068a090fe91b1bc6763a90ed5d3893",
      "metadataTypeId": 5
    },
    {
      "type": "struct std::asset_id::AssetId",
      "concreteTypeId": "c0710b6731b1dd59799cf6bef33eee3b3b04a2e40e80a0724090215bbf2ca974",
      "metadataTypeId": 8
    },
    {
      "type": "struct std::contract_id::ContractId",
      "concreteTypeId": "29c10735d33b5159f0c71ee1dbd17b36a3e69e41f00fab0d42e1bd9f428d8a54",
      "metadataTypeId": 11
    },
    {
      "type": "struct std::string::String",
      "concreteTypeId": "9a7f1d3e963c10e0a4ea70a8e20a4813d1dc5682e28f74cb102ae50d32f7f98c",
      "metadataTypeId": 12
    },
    {
      "type": "struct sway_libs::ownership::events::OwnershipSet",
      "concreteTypeId": "e1ef35033ea9d2956f17c3292dea4a46ce7d61fdf37bbebe03b7b965073f43b5",
      "metadataTypeId": 13
    },
    {
      "type": "u64",
      "concreteTypeId": "1506e6f44c1d6291cdf46395a8e573276a4fa79e8ace3fc891e092ef32d1b0a0"
    }
  ],
  "metadataTypes": [
    {
      "type": "enum errors::DomainRenewalError",
      "metadataTypeId": 0,
      "components": [
        {
          "name": "CanNotRenewRootDomain",
          "typeId": "2e38e77b22c314a449e91fafed92a43826ac6aa403ae6a8acb6cf58239fbaf5d"
        }
      ]
    },
    {
      "type": "enum errors::GracePeriodError",
      "metadataTypeId": 1,
      "components": [
        {
          "name": "InvalidGracePeriodDuration",
          "typeId": "2e38e77b22c314a449e91fafed92a43826ac6aa403ae6a8acb6cf58239fbaf5d"
        }
      ]
    },
    {
      "type": "enum errors::ValidationError",
      "metadataTypeId": 2,
      "components": [
        {
          "name": "InvalidDomainName",
          "typeId": "2e38e77b22c314a449e91fafed92a43826ac6aa403ae6a8acb6cf58239fbaf5d"
        },
        {
          "name": "InvalidPeriod",
          "typeId": "2e38e77b22c314a449e91fafed92a43826ac6aa403ae6a8acb6cf58239fbaf5d"
        },
        {
          "name": "WrongFeeAmount",
          "typeId": "2e38e77b22c314a449e91fafed92a43826ac6aa403ae6a8acb6cf58239fbaf5d"
        }
      ]
    },
    {
      "type": "enum standards::src5::AccessError",
      "metadataTypeId": 3,
      "components": [
        {
          "name": "NotOwner",
          "typeId": "2e38e77b22c314a449e91fafed92a43826ac6aa403ae6a8acb6cf58239fbaf5d"
        }
      ]
    },
    {
      "type": "enum std::identity::Identity",
      "metadataTypeId": 4,
      "components": [
        {
          "name": "Address",
          "typeId": 7
        },
        {
          "name": "ContractId",
          "typeId": 11
        }
      ]
    },
    {
      "type": "enum sway_libs::ownership::errors::InitializationError",
      "metadataTypeId": 5,
      "components": [
        {
          "name": "CannotReinitialized",
          "typeId": "2e38e77b22c314a449e91fafed92a43826ac6aa403ae6a8acb6cf58239fbaf5d"
        }
      ]
    },
    {
      "type": "raw untyped ptr",
      "metadataTypeId": 6
    },
    {
      "type": "struct std::address::Address",
      "metadataTypeId": 7,
      "components": [
        {
          "name": "bits",
          "typeId": "7c5ee1cecf5f8eacd1284feb5f0bf2bdea533a51e2f0c9aabe9236d335989f3b"
        }
      ]
    },
    {
      "type": "struct std::asset_id::AssetId",
      "metadataTypeId": 8,
      "components": [
        {
          "name": "bits",
          "typeId": "7c5ee1cecf5f8eacd1284feb5f0bf2bdea533a51e2f0c9aabe9236d335989f3b"
        }
      ]
    },
    {
      "type": "struct std::bytes::Bytes",
      "metadataTypeId": 9,
      "components": [
        {
          "name": "buf",
          "typeId": 10
        },
        {
          "name": "len",
          "typeId": "1506e6f44c1d6291cdf46395a8e573276a4fa79e8ace3fc891e092ef32d1b0a0"
        }
      ]
    },
    {
      "type": "struct std::bytes::RawBytes",
      "metadataTypeId": 10,
      "components": [
        {
          "name": "ptr",
          "typeId": 6
        },
        {
          "name": "cap",
          "typeId": "1506e6f44c1d6291cdf46395a8e573276a4fa79e8ace3fc891e092ef32d1b0a0"
        }
      ]
    },
    {
      "type": "struct std::contract_id::ContractId",
      "metadataTypeId": 11,
      "components": [
        {
          "name": "bits",
          "typeId": "7c5ee1cecf5f8eacd1284feb5f0bf2bdea533a51e2f0c9aabe9236d335989f3b"
        }
      ]
    },
    {
      "type": "struct std::string::String",
      "metadataTypeId": 12,
      "components": [
        {
          "name": "bytes",
          "typeId": 9
        }
      ]
    },
    {
      "type": "struct sway_libs::ownership::events::OwnershipSet",
      "metadataTypeId": 13,
      "components": [
        {
          "name": "new_owner",
          "typeId": 4
        }
      ]
    }
  ],
  "functions": [
    {
      "inputs": [
        {
          "name": "domain",
          "concreteTypeId": "9a7f1d3e963c10e0a4ea70a8e20a4813d1dc5682e28f74cb102ae50d32f7f98c"
        },
        {
          "name": "years",
          "concreteTypeId": "1506e6f44c1d6291cdf46395a8e573276a4fa79e8ace3fc891e092ef32d1b0a0"
        }
      ],
      "name": "domain_price",
      "output": "1506e6f44c1d6291cdf46395a8e573276a4fa79e8ace3fc891e092ef32d1b0a0",
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
      "inputs": [],
      "name": "get_grace_period",
      "output": "1506e6f44c1d6291cdf46395a8e573276a4fa79e8ace3fc891e092ef32d1b0a0",
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
      "inputs": [],
      "name": "initialize",
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
    },
    {
      "inputs": [
        {
          "name": "domain",
          "concreteTypeId": "9a7f1d3e963c10e0a4ea70a8e20a4813d1dc5682e28f74cb102ae50d32f7f98c"
        },
        {
          "name": "years",
          "concreteTypeId": "1506e6f44c1d6291cdf46395a8e573276a4fa79e8ace3fc891e092ef32d1b0a0"
        }
      ],
      "name": "mint_domain",
      "output": "c0710b6731b1dd59799cf6bef33eee3b3b04a2e40e80a0724090215bbf2ca974",
      "attributes": [
        {
          "name": "payable",
          "arguments": []
        },
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
          "name": "name",
          "concreteTypeId": "9a7f1d3e963c10e0a4ea70a8e20a4813d1dc5682e28f74cb102ae50d32f7f98c"
        },
        {
          "name": "years",
          "concreteTypeId": "1506e6f44c1d6291cdf46395a8e573276a4fa79e8ace3fc891e092ef32d1b0a0"
        }
      ],
      "name": "renew_domain",
      "output": "2e38e77b22c314a449e91fafed92a43826ac6aa403ae6a8acb6cf58239fbaf5d",
      "attributes": [
        {
          "name": "payable",
          "arguments": []
        },
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
          "name": "three_letter_fee",
          "concreteTypeId": "1506e6f44c1d6291cdf46395a8e573276a4fa79e8ace3fc891e092ef32d1b0a0"
        },
        {
          "name": "four_letter_fee",
          "concreteTypeId": "1506e6f44c1d6291cdf46395a8e573276a4fa79e8ace3fc891e092ef32d1b0a0"
        },
        {
          "name": "long_domain_fee",
          "concreteTypeId": "1506e6f44c1d6291cdf46395a8e573276a4fa79e8ace3fc891e092ef32d1b0a0"
        }
      ],
      "name": "set_fees",
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
    },
    {
      "inputs": [
        {
          "name": "grace_period_duration",
          "concreteTypeId": "1506e6f44c1d6291cdf46395a8e573276a4fa79e8ace3fc891e092ef32d1b0a0"
        }
      ],
      "name": "set_grace_period",
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
    },
    {
      "inputs": [],
      "name": "withdraw_funds",
      "output": "2e38e77b22c314a449e91fafed92a43826ac6aa403ae6a8acb6cf58239fbaf5d",
      "attributes": [
        {
          "name": "storage",
          "arguments": [
            "read"
          ]
        }
      ]
    }
  ],
  "loggedTypes": [
    {
      "logId": "6932726500726384802",
      "concreteTypeId": "6035fe0570bba8a2c3eaca3ef799babf90d26bbd8d7c35f17b0441b5dbce8c8e"
    },
    {
      "logId": "2161305517876418151",
      "concreteTypeId": "1dfe7feadc1d9667a4351761230f948744068a090fe91b1bc6763a90ed5d3893"
    },
    {
      "logId": "16280289466020123285",
      "concreteTypeId": "e1ef35033ea9d2956f17c3292dea4a46ce7d61fdf37bbebe03b7b965073f43b5"
    },
    {
      "logId": "14800495431373673435",
      "concreteTypeId": "cd65ec2daed1d3dbc3938a60c52b21602222993a736153a20f2f3dbeb6ceb24a"
    },
    {
      "logId": "4571204900286667806",
      "concreteTypeId": "3f702ea3351c9c1ece2b84048006c8034a24cbc2bad2e740d0412b4172951d3d"
    },
    {
      "logId": "9832228389136669265",
      "concreteTypeId": "887317a065009a5155723008af1cb63074f86cfe9ed093c3aea3c9e710c2bef2"
    }
  ],
  "messagesTypes": [],
  "configurables": [
    {
      "name": "REGISTRY_CONTRACT_ID",
      "concreteTypeId": "29c10735d33b5159f0c71ee1dbd17b36a3e69e41f00fab0d42e1bd9f428d8a54",
      "offset": 22472
    },
    {
      "name": "DEFAULT_RESOLVER_CONTRACT_ID",
      "concreteTypeId": "29c10735d33b5159f0c71ee1dbd17b36a3e69e41f00fab0d42e1bd9f428d8a54",
      "offset": 22440
    },
    {
      "name": "RESERVER_ADDRESS",
      "concreteTypeId": "7c5ee1cecf5f8eacd1284feb5f0bf2bdea533a51e2f0c9aabe9236d335989f3b",
      "offset": 22504
    }
  ]
};

const storageSlots: StorageSlot[] = [
  {
    "key": "935808ce1ee7979fecaa005bd54e2eecbbba638326cf02ca6d85767af6e593e9",
    "value": "00000000000f4240000000000000000000000000000000000000000000000000"
  },
  {
    "key": "b9e5c42ac2d61ff00f5cf3f05f47a7e4b3004820dd77d307f58276c1ef118c52",
    "value": "0000000002faf080000000000000000000000000000000000000000000000000"
  },
  {
    "key": "bf9e1cb91a641d0fca4355b07f9ba9228df0e16f38ad95eeb3ba8070816438a5",
    "value": "0000000000989680000000000000000000000000000000000000000000000000"
  },
  {
    "key": "e47f62b3ad6ed5494ff3db9f949a8a7fc91d24f919486ba33b95890bc4fcc056",
    "value": "0000000000278d00000000000000000000000000000000000000000000000000"
  }
];

export class RegistrarInterface extends Interface {
  constructor() {
    super(abi);
  }

  declare functions: {
    domain_price: FunctionFragment;
    get_grace_period: FunctionFragment;
    initialize: FunctionFragment;
    mint_domain: FunctionFragment;
    renew_domain: FunctionFragment;
    set_fees: FunctionFragment;
    set_grace_period: FunctionFragment;
    withdraw_funds: FunctionFragment;
  };
}

export class Registrar extends Contract {
  static readonly abi = abi;
  static readonly storageSlots = storageSlots;

  declare interface: RegistrarInterface;
  declare functions: {
    domain_price: InvokeFunction<[domain: StdString, years: BigNumberish], BN>;
    get_grace_period: InvokeFunction<[], BN>;
    initialize: InvokeFunction<[], void>;
    mint_domain: InvokeFunction<[domain: StdString, years: BigNumberish], AssetIdOutput>;
    renew_domain: InvokeFunction<[name: StdString, years: BigNumberish], void>;
    set_fees: InvokeFunction<[three_letter_fee: BigNumberish, four_letter_fee: BigNumberish, long_domain_fee: BigNumberish], void>;
    set_grace_period: InvokeFunction<[grace_period_duration: BigNumberish], void>;
    withdraw_funds: InvokeFunction<[], void>;
  };

  constructor(
    id: string | AbstractAddress,
    accountOrProvider: Account | Provider,
  ) {
    super(id, abi, accountOrProvider);
  }
}
