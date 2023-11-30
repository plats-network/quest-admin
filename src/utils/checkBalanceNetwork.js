import { notifyError, notifySuccess, notifySuggest } from "./toastify";

const MappingErrorNetwork = {
  "Aleph Zero": "Claim token here >>\n https://faucet.test.azero.dev/",
  Astar: "Claim token here >>\n https://portal.astar.network/shibuya-testnet/assets"
};

export const checkBalanceNetwork = (valueReward, balance, network) => {
  if (valueReward >= balance || balance === 0) {
    notifySuggest(`You don't have enough balance?\n ${MappingErrorNetwork[network]}`);
    return false;
  }
  return true;
};