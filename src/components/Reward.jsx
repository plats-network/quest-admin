import { Input, Select } from "antd";
import "antd/dist/antd";
import { NetWorks, Tokens } from "./ActionWeb3/TemplateWeb3";
import { useCallback, useEffect, useState } from "react";
import { ToastContainer } from "react-toastify";
import { notifyError } from "../utils/toastify";
import { useDispatch, useSelector } from "react-redux";
import { setIsSave, setResetReward, setSaveSuccess, setStateReward } from "../redux/stateCampaign";
import { callApiCreate } from "../services/callApiCreate";
import { useLocation, useNavigate } from "react-router-dom";
import { checkLogin } from "../utils/checkLogin";
import { Nft, Token } from "../assets/img";
import { handleCheckDisable, handleCheckDisableRewards } from "../utils/handleDisableTask";
import LogicHandleButton from "../utils/LogicHandleButton";
import { useBalance, useWallet } from "useink";
import { checkBalanceNetwork } from "../utils/checkBalanceNetwork";

const mapNetworkToken = {
  "Aleph Zero": "AZERO",
  Astar: "ASTR",
  Polkadot: "DOT",
};

const rewardOptions = [
  {
    icon: Token,
    value: "Token",
  },
  {
    icon: Nft,
    value: "NFT (Comming Soon)",
  },
];

function Reward({ setValue, valueSetup, valueQuest, setValueReward, data, onActive, isDeposit, timeStart }) {
  const [rewardType, setRewardType] = useState(data?.rewardType || "Token");
  const [network, setNetwork] = useState(data?.network || "Aleph Zero");
  const [categoryToken, setCategoryToken] = useState(data?.categoryToken || "AZERO");
  const [totalReward, setTotalReward] = useState(data?.totalReward || "");
  const [numberWinner, setNumberWinner] = useState(data?.numberWinner || 1);
  const { stateReward, resetReward } = useSelector((state) => state.stateCampaign);
  const [isEdit, setIsEdit] = useState(false);
  const isDetail = useLocation().pathname.includes("detail");

  const { account } = useWallet();
  const balanceAzeroObject = useBalance(account, "aleph-testnet");
  const balanceAstrObject = useBalance(account, "shibuya-testnet");
  const balanceAzero = parseFloat(balanceAzeroObject?.freeBalance.toHuman().replace(/,/g, "")) / 1e12;
  const balanceAstr = parseFloat(balanceAstrObject?.freeBalance.toHuman().replace(/,/g, "")) / 1e18;

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const balanceOptions = {
    "Aleph Zero": balanceAzero,
    Astar: balanceAstr,
  };

  useEffect(() => {
    if (resetReward) {
      setRewardType("Token");
      setNetwork("Aleph Zero");
      setCategoryToken("AZERO");
      setTotalReward("");
      setNumberWinner(1);
    }
    dispatch(setResetReward(false));
  }, [resetReward]);

  const handleNext = () => {
    if (!checkBalanceNetwork(totalReward, balanceOptions[network], network)) {
      return;
    }
    if (totalReward) {
      setValueReward({
        rewardType,
        network,
        categoryToken,
        totalReward,
        numberWinner,
      });
      setValue("Deposit");
      onActive((prev) => {
        const quest = prev[3];
        quest.isActive = true;
        return prev;
      });
      dispatch(setStateReward(true));
    } else {
      notifyError("Please complete all information !");
    }
  }

  const handleCreateEdit = useCallback(() => {
    dispatch(setStateReward(false));
  }, []);

  const handleSave = async () => {
    if (!checkLogin()) {
      notifyError("Please connect wallet first");
      return;
    }
    try {
      const res = await callApiCreate(valueSetup, valueQuest, {
        rewardType,
        network,
        categoryToken,
        totalReward,
        numberWinner,
      });
      if (res.data.status === "success") {
        navigate("/campaign");
        dispatch(setSaveSuccess(true));
      }
    } catch (error) {
      notifyError(error?.response?.data?.message?.name[0]);
    }
  };
                                 
  const handleEdit = useCallback(() => {
    if (isEdit) {
      handleNext();
    } else {
      setIsEdit(true);
    }
  }, [isEdit]);


  const handleNetwork = useCallback((value) => {
    setNetwork(value);
    setCategoryToken(mapNetworkToken[value]);
  }, []);
  return (
    <div className="">
      <div className="py-2 px-4 md:py-6 md:px-8 rounded-lg border-[1px] border-[#279EFF]">
        <div className="flex flex-col md:flex-row items-center justify-between gap-4 md:gap-10 ">
          <div className="w-full">
            <label className="heading">Network</label>
            <Select
              disabled={handleCheckDisableRewards(isDetail, isDeposit, isEdit, stateReward)}
              className="w-full h-[40px] md:!h-[54px]"
              size="large"
              defaultValue={network}
              value={network}
              onChange={handleNetwork}
            >
              {NetWorks.map((item) => (
                <Select.Option key={item.network} value={item.network} label={item.network}>
                  <div className="text-[14px] md:text-[18px] flex items-center">
                    <img
                      className="w-[24px] h-[24px] md:w-[40px] md:h-[40px] rounded-full mr-2"
                      src={item.icon}
                      alt="icon"
                      loading="lazy"
                    />
                    <p className="text-white">{item.network}</p>
                  </div>
                </Select.Option>
              ))}
            </Select>
          </div>
          <div className="w-full">
            <label className="heading">Reward Type</label>
            <Select
              value={rewardType}
              disabled={handleCheckDisableRewards(isDetail, isDeposit, isEdit, stateReward)}
              className="w-full h-[40px] md:!h-[54px]"
              size="middle"
              onChange={setRewardType}
            >
              {rewardOptions.map((item) => (
                <Select.Option disabled={item.value.includes("NFT")} key={item.value} value={item.value}>
                  <div className="text-[14px] md:text-[18px] flex items-center">
                    <img
                      className="w-[24px] h-[24px] md:w-[40px] md:h-[40px] rounded-full mr-2"
                      src={item.icon}
                      alt="icon"
                      loading="lazy"
                    />
                    <p className="text-white">{item.value}</p>
                  </div>
                </Select.Option>
              ))}
            </Select>
          </div>

          <div className="w-full">
            <label className="heading">Category Token</label>
            <Select
              value={categoryToken}
              disabled={handleCheckDisableRewards(isDetail, isDeposit, isEdit, stateReward)}
              className="w-full h-[40px] md:!h-[54px]"
              size="large"
              onChange={setCategoryToken}
            >
              {Tokens.map((item) => (
                <Select.Option key={item.token} value={item.network} label={item.network}>
                  <div className="text-[14px] md:text-[18px] flex items-center">
                    <img
                      className="w-[24px] h-[24px] md:w-[32px] md:h-[32px] rounded-full mr-2"
                      src={item.icon}
                      alt="icon"
                      loading="lazy"
                    />
                    <p className="text-white">{item.token}</p>
                  </div>
                </Select.Option>
              ))}
            </Select>
          </div>
        </div>
        <div className="mt-2 md:mt-5">
          <label className="heading after:content-['*'] after:ml-1 after:text-red-500">Total Reward</label>
          <Input
            type="number"
            disabled={handleCheckDisableRewards(isDetail, isDeposit, isEdit, stateReward)}
            value={totalReward}
            onChange={(e) => {
              dispatch(setIsSave(true));
              setTotalReward(e.target.value);
            }}
            placeholder="0"
            className="!leading-9 md:!leading-[50px] placeholder:text-[18px] text-[18px] placeholder:text-white placeholder:opacity-40"
          />
        </div>

        <div className="mt-5">
          <label className="heading">Number Of Winner</label>
          <Input
            disabled={handleCheckDisable(isDetail, isEdit, stateReward)}
            value={numberWinner}
            onChange={(e) => setNumberWinner(e.target.value)}
            type="number"
            placeholder="Number"
            className="!leading-9 md:!leading-[50px] placeholder:text-[18px] text-[18px]"
          />
        </div>

        <div className="mt-5">
          <label className="heading">Amount per winner</label>
          <Input
            value={totalReward / numberWinner || ""}
            className="!leading-9 md:!leading-[50px] placeholder:text-[18px] text-[18px] text-white"
            disabled
          />
        </div>
      </div>
      <LogicHandleButton
        isDetail={isDetail}
        data={data}
        isEdit={isEdit}
        handleEdit={handleEdit}
        startDate={timeStart}
        handleCreateEdit={handleCreateEdit}
        handleNext={handleNext}
        handleSave={handleSave}
        state={stateReward}
      />
      <ToastContainer />
    </div>
  );
}

export default Reward;
