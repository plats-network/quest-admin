import { createSlice } from "@reduxjs/toolkit";
import { getAccountAddress } from "../services/getAccount";
const accountSlice = createSlice({
  name: "account",
  initialState: {
    currentAccount: getAccountAddress()
  },
  reducers: {
    setCurrentAccount: (state, action) => {
      state.currentAccount = action.payload;
    }
  }
});
export const { setCurrentAccount } = accountSlice.actions;
export default accountSlice.reducer;