import { createSlice } from '@reduxjs/toolkit';
const campaignSlice = createSlice({
  name: 'stateCampaign',
  initialState: {
    stateSetup: false,
    stateQuest: false,
    stateReward: false,
    stateDeposit: false,
    stateLeaderboard: false,
    resetQuest: false,
    resetReward: false,
    saveSuccess: false,
    contract: null,
    account: null,
    token: "",
    isSave: false // dùng để check có disable nút save ở màn deposit ở trong màn detail
  },
  reducers: {
    setStateSetup: (state, action) => {
      state.stateSetup = action.payload
    },

    setStateQuest: (state, action) => {
        state.stateQuest = action.payload
      },
      setStateReward: (state, action) => {
        state.stateReward = action.payload
      },
      setStateDeposit: (state, action) => {
        state.stateDeposit = action.payload
      },
      setStateLeaderboard: (state, action) => {
        state.stateLeaderboard = action.payload
      },
      setResetQuest: (state, action) => {
        state.resetQuest = action.payload
      },
      setResetReward: (state, action) => {
        state.resetReward = action.payload
      },
      setSaveSuccess: (state, action) => {
        state.saveSuccess = action.payload
      },
      setToken: (state, action) => {
        state.token = action.payload
      },
      setIsSave: (state, action) => {
        state.isSave = action.payload
      }

  },
});
export const { setStateDeposit, setStateQuest, setStateReward, setStateSetup, setStateLeaderboard, setResetQuest, setResetReward, setSaveSuccess, setContract, setAccount, setToken, setIsSave} = campaignSlice.actions;
export default campaignSlice.reducer;