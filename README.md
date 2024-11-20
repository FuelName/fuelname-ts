# fuelname-ts

TypeScript SDK for interacting with the FuelName smart contracts.

```shell
npm i fuelname-ts
```

### Preconditions

Domain names as Strings and AssetIds are interchangeable. The AssetId is the unique identifier of the domain.
Sometimes you'll need it as a String, sometimes as an AssetId.

To convert String domain to AssetId, call the following function:

```
Registry::get_domain_asset_id(domain: String) -> AssetId;
```

Conversion of AssetId to String is a bit trickier.
First of all, you **must** check that the AssetId is valid. You can do that by calling this function:

```
Registry::domain_asset_exists(asset: AssetId) -> bool;
```

If the function returns `true`, call:

```
Registry::get_domain_name(asset: AssetId) -> Option<String>
```

### On-chain constants

TESTNET_API_URL: `https://testnet.fuel.network/v1/graphql`

REGISTRY_CONTRACT_ID: `0x8e66c1787462dad4193ce687eab081adbcbced4b2cc4170f061285a4489855e7`

REGISTRAR_CONTRACT_ID: `0xbb04e3c7222d3bbcee2dda9bcc6ee4635235a9ac8d084489a435f448cc7b4a05`

RESOLVER_CONTRACT_ID: `0x41771453899a2170cfed89470dd414ce753e4d3b5b9c4f34e28a6e07e80425fe`

### Usage

#### Get domain price

```
Registrar::domain_price(domain: String, years: u64) -> u64;
```

#### Register a domain

```
Registrar::mint_domain(domain: String, years: u64) -> AssetId;
```

In order to call this function, you need to:

- add registry contract id to the transaction as a reference. For that, you need to call the `addContracts` function.
  See [more](https://docs.fuel.network/docs/fuels-ts/contracts/inter-contract-calls/#inter-contract-calls-using-the-sdk)
- transfer the appropriate fee in ETH (the price of the domain). Use
  the [forward call param](https://docs.fuel.network/docs/fuels-ts/contracts/call-parameters/#forward-parameter) for
  that

#### Set target address for a domain

```
Resolver::set(asset: AssetId, resolve_to: Option<Identity>, is_primary: bool);
```

Should be called by the domain owner.

In order to call this function, you need to:

- add the asset id of the domain as an input to the transaction. Not sure if the following will work properly, but let's
  try to use
  the [forward call parameter](https://docs.fuel.network/docs/fuels-ts/contracts/call-parameters/#forward-parameter):

```ts
await contract.functions
  .set
  .callParams({
    forward: [1, domainAssetId],
  })
```

The function takes the `is_primary` flag. For the first domain pointing to an address, this flag is ignored and always
set to `true` internally.

#### Get domain target address

```
Resolver::resolve(asset: AssetId) -> Option<Identity>;
```

#### Get domain by address

```
Resolver::reverse_resolve(identity: Identity) -> Option<AssetId>;
```

#### Check domain availability

```
Registry::domain_exists(domain: String) -> bool;
```

#### Check asset availability

```
Registry::domain_asset_exists(asset: AssetId) -> bool;
```

#### Get domain expiration time

```
Registry::get_expiration(domain: String) -> Option<u64>;
```

The returned timestamp is in TAI format. Info on how to convert it is
provided [here](https://forum.fuel.network/t/how-do-i-convert-a-tai64-timestamp/1853).
Basically, the logic is trivial:

```ts
function convertTaiTime(num: string) {
  return BigInt(num) - BigInt(Math.pow(2, 62)) - BigInt(10);
}

function convertTime(input: BN) {
  let bigNum = convertTaiTime(input.valueOf())
  let final = Number(bigNum) * 1000;
  return final;
}
```

#### Get owned domains

For now, there is only one, suboptimal way of doing this. You need to check all assets of the user (by calling
the `balances` function). And for each asset id check if it's a domain:

```
Registry::domain_asset_exists(asset: AssetId) -> bool;
```

#### Check is primary

Call the:

```
Resolver::reverse_resolve(identity: Identity) -> Option<AssetId>;
```

It will return the primary domain asset id for an address, if one exists.

#### Get minted domain metadata

```
Registry::metadata(asset: AssetId, key: String) -> Option<Metadata>
```

Where `key` is `"uri"`. It should return an uri String pointing to a json file with the metadata for existing
domains.

#### Get minted domain image

At first, get the [metadata of the domain](#get-minted-domain-metadata).
Retrieve the json over network, and take the `image` field from it.
