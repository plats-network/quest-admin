import { notifySuggest } from "./toastify";

const MappingErrorNetwork = {
  "Aleph Zero(Testnet)": "Claim token here >>\n https://faucet.test.azero.dev/",
  "Astar(Testnet)": "Claim token here >>\n https://portal.astar.network/shibuya-testnet/assets"
};

export const checkBalanceNetwork = (valueReward, balance, network) => {
  if (valueReward >= balance || balance === 0) {
    notifySuggest(`You don't have enough balance?\n ${MappingErrorNetwork[network]}`);
    return false;
  }
  if (valueReward <= 0) {
    notifySuggest("You must deposit an amount of tokens greater than 0");
    return false;
  }
  return true;
};