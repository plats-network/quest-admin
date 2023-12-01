
let enablePolkadotExtensionCache;
export const enablePolkadotExtension = async () => {
  if (enablePolkadotExtensionCache) return enablePolkadotExtensionCache;
  
  enablePolkadotExtensionCache = (async () => {
    const { web3Enable } = await import("@polkadot/extension-dapp");
    const extensions = await web3Enable("Phala SDK Example");
  
    if (extensions.length === 0) {
      throw new Error(
        "No extension installed, or the user did not accept the authorization"
      );
    }
  })();
  
  return enablePolkadotExtensionCache;
};

export const getSigner = async (
  account
) => {
  await enablePolkadotExtension();
  const { web3FromSource } = await import("@polkadot/extension-dapp");
  const injector = await web3FromSource(account?.meta?.source);
  const signer = injector.signer;
  
  return signer;
};