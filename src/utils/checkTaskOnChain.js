import { notifyError } from "./toastify";

export const checkTaskOnChain = (amountTokenHolder, amountTransactionActivity) => {
  if (amountTokenHolder < 0 || amountTransactionActivity < 0) {
    notifyError("Minimum Token amount ís invalid");
    return false;
  }
  return true;
};