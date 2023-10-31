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
import { setStateDeposit, setStateLeaderboard } from "../redux/stateCampaign";
import { useLocation, useParams } from "react-router-dom";
import { main } from "../utils/phala-setup";
import { getSigner } from "../utils/polkadotExtention";

function DepositPayout({ amount, setValue, categoryToken, valueSetup, valueQuest, valueReward, isDeposit }) {
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
  const [isLoading, setIsLoading] = useState(false);
  const { contract, account } = useSelector((state) => state.stateCampaign);

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
      alpheDeposit.signAndSend([], { value: amount });
    }
  };
  const handleDepositAstar = async () => {
    if (!checkConnectWallet()) {
      return;
    }
    if (!isFlagDeposit) {
      astarDeposit.signAndSend([], { value: amount });
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

  const handleDepositPhala = async () => {
    const signer = await getSigner(account);
    contract.tx.deposit({}).signAndSend(account.address, { signer }, (status) => {
      if (status.isInBlock) {
        setIsLoading(false);
        notifySuccess("Deposit Successfully!");
        if (param?.id) {
          callApiUpdate(param?.id, valueSetup, valueQuest, valueReward, true);
        } else {
          callApiCreate(valueSetup, valueQuest, valueReward, true);
        }
        //call api
        setValue("Leaderboard");
        dispatch(setStateDeposit(true));
        dispatch(setStateLeaderboard(true));
      } else {
        setIsLoading(true);
      }
    });
  };

  const handleDeposit = async () => {
    if (valueReward?.network === "Astar") {
      await handleDepositAstar();
    } else {
      await handleDepositAzero();
    }
  };

  //   const handleReward = async () => {
  //     const signer = await getSigner(account);
  //     const listLucky = [
  //       "5G4URyHwDkRy29QvtofisCZhjqdjyUYMpvAUzzpBnhMNnY4z",
  //       "5Cu5qz2GSd1kaQFGiuqhKvTR2K7tJsrmffpfb6DFiwWoBcqt",
  //     ];
  //     contract.tx.reward({}).signAndSend(account.address, { signer }, { value: 2000 }, (status) => {
  //       if (status.isInBlock) {
  //         console.log("success");
  //       }
  //     });
  //   };

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
        const create = async () => {
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
            notifyError(error?.response?.data?.message?.name[0]);
          }
        };
        create();
      }
    }
  }, [U.isInBlock(depositOption[valueReward?.network] || alpheDeposit)]);

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
        <>
          {valueReward?.network === "Aleph Zero" && (
            <Button
              loading={U.shouldDisable(alpheDeposit)}
              disabled={U.shouldDisable(alpheDeposit) || !valueReward?.totalReward}
              onClick={handleDeposit}
              className="bg-blue-500 hover:bg-blue-700 text-white font-medium md:font-bold py-2 px-4 md:py-6 md:px-8 rounded relative left-[50%] -translate-x-[50%]  mt-4 md:mt-8 text-[16px] md:text-[20px] flex items-center"
            >
              {U.shouldDisable(alpheDeposit) ? "Depositing & Public" : "Deposit & Public"}
            </Button>
          )}
          {valueReward?.network === "Astar" && (
            <Button
              loading={U.shouldDisable(astarDeposit)}
              disabled={U.shouldDisable(astarDeposit) || !valueReward?.totalReward}
              onClick={handleDeposit}
              className="bg-blue-500 hover:bg-blue-700 text-white font-medium md:font-bold py-2 px-4 md:py-6 md:px-8 rounded relative left-[50%] -translate-x-[50%]  mt-4 md:mt-8 text-[16px] md:text-[20px] flex items-center"
            >
              {U.shouldDisable(astarDeposit) ? "Depositing & Public" : "Deposit & Public"}
            </Button>
          )}
          {valueReward?.network === "Phala" && (
            <Button
              loading={isLoading}
              disabled={!contract || !valueReward?.totalReward}
              onClick={handleDeposit}
              className="bg-blue-500 hover:bg-blue-700 text-white font-medium md:font-bold py-2 px-4 md:py-6 md:px-8 rounded relative left-[50%] -translate-x-[50%]  mt-4 md:mt-8 text-[16px] md:text-[20px] flex items-center"
            >
              Deposit & Public
            </Button>
          )}
        </>
      )}
    </div>
  );
}

export default DepositPayout;
