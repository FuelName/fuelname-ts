#!/bin/bash

set -ex

mkdir -p tmp_abis
cd tmp_abis

echo "Fetching latest sources"
git clone git@fuelname.github.com:FuelName/contracts.git

echo "Building contracts"

cd contracts
forc build --release

cd ../..

rm -rf sway_abis

mkdir -p sway_abis/contracts/registry
mkdir -p sway_abis/contracts/registrar
mkdir -p sway_abis/contracts/resolver

mv -f tmp_abis/contracts/registry/out/release/ sway_abis/contracts/registry
mv -f tmp_abis/contracts/registrar/out/release/ sway_abis/contracts/registrar
mv -f tmp_abis/contracts/resolver/out/release/ sway_abis/contracts/resolver

rm -rf tmp_abis

pnpm fuels typegen -i sway_abis/contracts/*/release/*-abi.json -o ./src/sdk/typegen --contract
