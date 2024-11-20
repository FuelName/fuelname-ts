export const TESTNET_REGISTRY_CONTRACT_ID =
  "0x36804c827144e07895ef3c87050d79af7370594d5f65127d0e1079cdef576a49";
export const TESTNET_REGISTRAR_CONTRACT_ID =
  "0x287de6f1f18cb08abd9a20dd2a05a2bf9f0c8b2954b8368ee14934f976ba446f";

// TODO: Update these values after deploying to mainnet
export const MAINNET_REGISTRY_CONTRACT_ID =
  "";
export const MAINNET_REGISTRAR_CONTRACT_ID =
  "";

export function registryContractId(rpcUrl: string): string {
  if (rpcUrl.includes("testnet")) {
    return TESTNET_REGISTRY_CONTRACT_ID;
  } else if (rpcUrl.includes("mainnet")) {
    return MAINNET_REGISTRY_CONTRACT_ID;
  } else {
    throw new Error(`Unsupported network: ${rpcUrl}`);
  }
}

export function registrarContractId(rpcUrl: string): string {
  if (rpcUrl.includes("testnet")) {
    return TESTNET_REGISTRAR_CONTRACT_ID;
  } else if (rpcUrl.includes("mainnet")) {
    return MAINNET_REGISTRAR_CONTRACT_ID;
  } else {
    throw new Error(`Unsupported network: ${rpcUrl}`);
  }
}
