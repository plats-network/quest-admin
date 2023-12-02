import { instanceAxios } from "./api-connect-wallet";
import { routes } from "../routes";

export const getCampaign = async (id) => {
  try {
    const res = await instanceAxios.get(routes.quest.getDetailCampaign(id));
    return res.data;
  } catch (error) {
    throw new Error(error.message);
  }
};
