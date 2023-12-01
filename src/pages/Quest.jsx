import Header from "../components/Header";
import BodyQuest from "../components/BodyQuest";
import { ToastContainer } from "react-toastify";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { notifySuccess } from "../utils/toastify";
import {
  setIsSave,
  setSaveSuccess,
  setStateDeposit,
  setStateLeaderboard,
  setStateQuest,
  setStateReward,
  setStateSetup
} from "../redux/stateCampaign";

function Quest() {
  const { saveSuccess } = useSelector((state) => state.stateCampaign);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(setIsSave(false));
    dispatch(setStateDeposit(false));
    dispatch(setStateLeaderboard(false));
    dispatch(setStateSetup(false));
    dispatch(setStateQuest(false));
    dispatch(setStateReward(false));
  }, []);

  useEffect(() => {
    if (saveSuccess) {
      notifySuccess("Save Campaign Successfully");
      dispatch(setSaveSuccess(false));
    }
  }, [saveSuccess]);

  return (
    <main className="bg-">
      <Header />
      <BodyQuest />
      <ToastContainer />
    </main>
  );
}

export default Quest;
