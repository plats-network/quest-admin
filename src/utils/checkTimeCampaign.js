import { notifyError } from "./toastify";
const DAY = 1000 * 60 * 60 * 24;

export const checkTimeCampaign = (startDate, endDate) => {
  const start_date = new Date(startDate).getTime();
  const end_date = new Date(endDate).getTime();
  if (end_date - start_date < 0) {
    notifyError("Campaign time is invalid. please check again");
    return false;
  }
  return true;
};