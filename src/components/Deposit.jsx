import { useEffect, useState } from "react";
import metadata from "../utils/contract.json";
import { useTx, useContract } from "useink";
import * as U from "useink/utils";
import { ToastContainer } from "react-toastify";
import { getAccountAddress } from "../services/getAccount";
import { Button } from "antd";
import { notifyError, notifySuccess } from "../utils/toastify";
import { callApiCreate, callApiUpdate } from "../services/callApiCreate";
import { useDispatch } from "react-redux";
import { setStateDeposit, setStateLeaderboard } from "../redux/stateCampaign";
import { useLocation, useParams } from "react-router-dom";

function DepositPayout({ amount, setValue, categoryToken, valueSetup, valueQuest, valueReward, isDeposit }) {
  const param = useParams();
  const CONTRACT_ADDRESS_ALPHE = import.meta.env.VITE_CONTRACT_ADDRESS_ALEPH;
  const alpheContract = useContract(CONTRACT_ADDRESS_ALPHE, metadata, "aleph-testnet");
  const [isFlagDeposit, setIsFlagDeposit] = useState(false);
  const alpheDeposit = useTx(alpheContract, "deposit");
  const dispatch = useDispatch();
  const isDetail = useLocation().pathname.includes("detail");

  const handleDeposit = async () => {
    if (!checkConnectWallet()) {
      return;
    }
    if (!isFlagDeposit) {
      alpheDeposit.signAndSend([], { value: amount });
    }
  };

  const checkConnectWallet = (currentAccount) => {
    const account = getAccountAddress();
    if (!account) {
      notifyError("Please connect wallet first!");
      return false;
    }
    return true;
  };

  useEffect(() => {
    if (U.isInBlock(alpheDeposit)) {
      setIsFlagDeposit(true);
      notifySuccess("Deposit Successfully!");
    }
    if (isFlagDeposit && param?.id) {
      setValue("Leaderboard");
      //call api
      callApiUpdate(param?.id, valueSetup, valueQuest, valueReward, true);
      dispatch(setStateDeposit(true));
      dispatch(setStateLeaderboard(true));
    } else if (isFlagDeposit && !param?.id) {
      setValue("Leaderboard");
      //call api
      callApiCreate(valueSetup, valueQuest, valueReward, true);
      dispatch(setStateDeposit(true));
      dispatch(setStateLeaderboard(true));
    }
  }, [U.isInBlock(alpheDeposit)]);
  return (
    <div className="">
      <p className="text-[16px] md:text-[20px] font-semibold text-white py-4 px-4 rounded-lg borderBlue">
        You have {isDeposit ? " deposited " : " to deposit "}
        <span className="text-yellow-600">
          {amount} {categoryToken}
        </span>{" "}
        to the smartcontact
      </p>
      <ToastContainer />
      {isDetail && valueSetup?.status === "Active" ? (
        ""
      ) : (
        <Button
          loading={U.shouldDisable(alpheDeposit)}
          disabled={U.shouldDisable(alpheDeposit) || !valueReward?.totalReward}
          onClick={handleDeposit}
          className="bg-blue-500 hover:bg-blue-700 text-white font-medium md:font-bold py-2 px-4 md:py-6 md:px-8 rounded relative left-[50%] -translate-x-[50%]  mt-4 md:mt-8 text-[16px] md:text-[20px] flex items-center"
        >
          {U.shouldDisable(alpheDeposit) ? "Depositing & Public" : "Deposit & Public"}
        </Button>
      )}
    </div>
  );
}

export default DepositPayout;
