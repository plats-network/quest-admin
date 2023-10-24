import Header from "../components/Header";
import BodyQuest from "../components/BodyQuest";
import { ToastContainer } from "react-toastify";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { notifySuccess } from "../utils/toastify";
import { setSaveSuccess } from "../redux/stateCampaign";

function Quest() {
  const { saveSuccess } = useSelector((state) => state.stateCampaign);
  const dispatch = useDispatch();

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
