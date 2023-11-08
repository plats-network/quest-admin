import { useEffect, useState } from "react";
import metadata from "../utils/contract.json";
import { useTx, useContract } from "useink";
import * as U from "useink/utils";
import { ToastContainer } from "react-toastify";
import { getAccountAddress } from "../services/getAccount";
import { Button } from "antd";
import { notifyError, notifySuccess } from "../utils/toastify";
import { callApiCreate, callApiUpdate } from "../services/callApiCreate";
import { useDispatch, useSelector } from "react-redux";
import { setSaveSuccess, setStateDeposit, setStateLeaderboard } from "../redux/stateCampaign";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import { main } from "../utils/phala-setup";
import { checkLogin } from "../utils/checkLogin";
import clsx from "clsx";
import { checkValueQuest } from "../utils/checkTickQuest";

function DepositPayout({ amount, setValue, categoryToken, valueSetup, valueQuest, valueReward, isDeposit, onActive }) {
  const param = useParams();
  const CONTRACT_ADDRESS_ALPHE = import.meta.env.VITE_CONTRACT_ADDRESS_ALEPH;
  const CONTRACT_ADDRESS_ASTAR = import.meta.env.VITE_CONTRACT_ADDRESS_ASTAR;
  const alpheContract = useContract(CONTRACT_ADDRESS_ALPHE, metadata, "aleph-testnet");
  const astarContract = useContract(CONTRACT_ADDRESS_ASTAR, metadata, "shibuya-testnet");
  const [isFlagDeposit, setIsFlagDeposit] = useState(false);
  const alpheDeposit = useTx(alpheContract, "deposit");
  const astarDeposit = useTx(astarContract, "deposit");
  const dispatch = useDispatch();
  const isDetail = useLocation().pathname.includes("detail");
  const { isSave } = useSelector((state) => state.stateCampaign);
  const navigate = useNavigate();

  const depositOption = {
    Astar: astarDeposit,
    "Aleph Zero": alpheDeposit,
  };

  useEffect(() => {
    main(dispatch);
  }, []);

  const handleDepositAzero = async () => {
    if (!checkConnectWallet()) {
      return;
    }
    if (!isFlagDeposit) {
      alpheDeposit.signAndSend([], { value: BigInt(amount * 1e12) });
    }
  };
  const handleDepositAstar = async () => {
    if (!checkConnectWallet()) {
      return;
    }
    if (!isFlagDeposit) {
      astarDeposit.signAndSend([], { value: BigInt(amount * 1e18) });
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

  const handleDeposit = async () => {
    if (valueReward?.network === "Astar") {
      await handleDepositAstar();
    } else {
      await handleDepositAzero();
    }
  };

  const handleSave = async () => {
    let res = null;
    if (!checkLogin()) {
      notifyError("Please connect wallet first");
      return;
    }
    try {
      const quest = checkValueQuest(valueQuest);
      if (!quest) {
        notifyError("Please complete quest form");
        return;
      }
      if (!valueReward?.totalReward) {
        notifyError("Please complete reward form");
        return;
      }
      if (param?.id) {
        res = await callApiUpdate(param?.id, valueSetup, valueQuest, valueReward);
      } else {
        res = await callApiCreate(valueSetup, valueQuest, valueReward);
      }
      if (res.data.status === "success") {
        navigate("/campaign");
        dispatch(setSaveSuccess(true));
        notifySuccess("Save campaign successfully");
      }
    } catch (error) {
      notifyError(error?.response?.data?.message?.name[0]);
    }
  };

  const handleUpdate = async () => {
    try {
      const res = await callApiUpdate(param?.id, valueSetup, valueQuest, valueReward, true, setValue);
      if (res.data?.status === "success") {
        notifySuccess("Update campaign successfully");
        setTimeout(() => {
          setValue("Leaderboard");
        }, 1500);
        dispatch(setStateDeposit(true));
        dispatch(setStateLeaderboard(true));
      }
    } catch (error) {
      notifyError("Update campaign Failed");
    }
  };

  useEffect(() => {
    if (U.isInBlock(depositOption[valueReward?.network] || alpheDeposit)) {
      setIsFlagDeposit(true);
      if (!param?.id) {
        const create = async () => {
          try {
            const res = await callApiCreate(valueSetup, valueQuest, valueReward, true, setValue);
            if (res.data?.status === "success") {
              notifySuccess("Create campaign successfully");
              setTimeout(() => {
                setValue("Leaderboard");
                onActive((prev) => {
                  const quest = prev[4];
                  quest.isActive = true;
                  return prev;
                });
              }, 1500);
              dispatch(setStateDeposit(true));
              dispatch(setStateLeaderboard(true));
            }
          } catch (error) {
            notifyError(error?.response?.data?.message?.name[0]);
          }
        };
        create();
      } else {
        handleUpdate();
      }
    }
  }, [U.isInBlock(depositOption[valueReward?.network] || alpheDeposit)]);
  const checkSaveDisable = () => {
    if (param?.id && valueReward?.totalReward && !isSave) {
      return true;
    }
    return false;
  };

  return (
    <div className="">
      <div
        className={clsx({
          "absolute inset-0 bg-transparent": U.shouldDisable(depositOption[valueReward?.network] || alpheDeposit),
        })}
      ></div>
      <p className="text-[16px] md:text-[20px] font-semibold text-white py-4 px-4 rounded-lg borderBlue">
        You have {isDeposit ? " deposited " : " to deposit "}
        <span className="text-yellow-600">
          {amount} {categoryToken}
        </span>{" "}
        to the smartcontact
      </p>
      <ToastContainer />
      {isDetail && isDeposit ? (
        <Button
          onClick={handleUpdate}
          className="bg-blue-500 hover:bg-blue-700 text-white font-medium md:font-bold py-2 px-4 md:py-6 md:px-8 rounded  mt-4 md:mt-8 text-[16px] md:text-[20px] flex items-center mx-auto"
        >
          Update
        </Button>
      ) : (
        <div className="flex items-center justify-center gap-8">
          <Button
            onClick={handleSave}
            className={clsx(
              "!bg-[#D83F31] !hover:bg-opacity-60 text-white font-medium md:font-bold py-2 px-4 md:py-6 md:px-8 rounded   mt-4 md:mt-8 text-[16px] md:text-[20px] flex items-center",
              {
                hidden:
                  checkSaveDisable() ||
                  U.shouldDisable(depositOption[valueReward?.network] || alpheDeposit) ||
                  !valueReward?.totalReward,
              }
            )}
          >
            Save
          </Button>
          <Button
            loading={U.shouldDisable(depositOption[valueReward?.network] || alpheDeposit)}
            disabled={U.shouldDisable(depositOption[valueReward?.network] || alpheDeposit) || !valueReward?.totalReward}
            onClick={handleDeposit}
            className="bg-blue-500 hover:bg-blue-700 text-white font-medium md:font-bold py-2 px-4 md:py-6 md:px-8 rounded  mt-4 md:mt-8 text-[16px] md:text-[20px] flex items-center"
          >
            {U.shouldDisable(depositOption[valueReward?.network] || alpheDeposit)
              ? "Depositing & Publish"
              : "Deposit & Publish"}
          </Button>
        </div>
      )}
    </div>
  );
}

export default DepositPayout;
