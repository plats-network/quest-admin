import { notifyError } from "./toastify"

export const checkBalanceNetwork = (valueReward, balance) => {
    if (valueReward >= balance) {
        notifyError("You don't have enough balance to reward")
        return false;
    }
    return true;
}