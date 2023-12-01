import { configureStore } from "@reduxjs/toolkit";
import accountSlice from "./accountSlice";
import stateCampaignSlice from "./stateCampaign";

const combinedReducer = {
  account: accountSlice,
  stateCampaign: stateCampaignSlice
};

export default configureStore({
  reducer: combinedReducer
});