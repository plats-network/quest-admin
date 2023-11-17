import { notifyError } from "./toastify";

export const checkTimeCampaign = (startDate, endDate) => {
    const start_date = new Date(startDate).getDate();
    const end_date = new Date(endDate).getDate();
    if(start_date >= end_date) {
        notifyError("Campaign time is invalid. please check again")
        return false;
    }
    return true;
}