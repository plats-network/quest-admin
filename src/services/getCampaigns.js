import { instanceAxios } from "./api-connect-wallet";
import { routes } from "../routes";

export const getCampaigns = async (token) => {
  try {
    instanceAxios.defaults.headers["Authorization"] = token;
    const res = await instanceAxios.get(routes.quest.getCollection);
    return res.data.data;
  } catch (error) {
    throw new Error(error.message);
  }
};
