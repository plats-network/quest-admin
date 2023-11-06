import { Input, Select } from "antd";
import "antd/dist/antd";
import { NetWorks, Tokens } from "./ActionWeb3/TemplateWeb3";
import { useEffect, useState } from "react";
import { ToastContainer } from "react-toastify";
import { notifyError } from "../utils/toastify";
import { useDispatch, useSelector } from "react-redux";
import { setIsSave, setResetReward, setSaveSuccess, setStateReward } from "../redux/stateCampaign";
import { callApiCreate } from "../services/callApiCreate";
import { useLocation, useNavigate } from "react-router-dom";
import { checkLogin } from "../utils/checkLogin";
import { Nft, Token } from "../assets/img";
import { handleCheckDisable } from "../utils/handleDisableTask";

function Reward({ setValue, valueSetup, valueQuest, setValueReward, data, onActive }) {
  const [rewardType, setRewardType] = useState(data?.rewardType || "Token");
  const [network, setNetwork] = useState(data?.network || "Aleph Zero");
  const [categoryToken, setCategoryToken] = useState(data?.categoryToken || "AZERO");
  const [totalReward, setTotalReward] = useState(data?.totalReward || "");
  const [numberWinner, setNumberWinner] = useState(data?.numberWinner || 1);
  const { stateReward, resetReward } = useSelector((state) => state.stateCampaign);
  const [isEdit, setIsEdit] = useState(false);
  const isDetail = useLocation().pathname.includes("detail");

  const navigate = useNavigate();
  const dispatch = useDispatch();

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
  };

  const handleCreateEdit = () => {
    dispatch(setStateReward(false));
  };

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
  const handleEdit = () => {
    if (isEdit) {
      handleNext();
    } else {
      setIsEdit(true);
    }
  };

  const handleNetwork = (value) => {
    setNetwork(value);
    if (value === "Phala") {
      setCategoryToken("PHA");
    } else if (value === "Aleph Zero") {
      setCategoryToken("AZERO");
    } else {
      setCategoryToken("ASTR");
    }
  };
  return (
    <div className="">
      <div className="py-2 px-4 md:py-6 md:px-8 rounded-lg border-[1px] border-[#279EFF]">
        <div className="flex flex-col md:flex-row items-center justify-between gap-4 md:gap-10 ">
          <div className="w-full">
            <label className="heading">Network</label>
            <Select
              disabled={handleCheckDisable(isDetail, isEdit, stateReward)}
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
              disabled={handleCheckDisable(isDetail, isEdit, stateReward)}
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
              disabled={handleCheckDisable(isDetail, isEdit, stateReward)}
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
                    />
                    <p className="text-white">{item.token}</p>
                  </div>
                </Select.Option>
              ))}
            </Select>
          </div>
        </div>
        <div className="mt-2 md:mt-5">
          <label className="heading">Total Reward</label>
          <Input
            type="number"
            disabled={handleCheckDisable(isDetail, isEdit, stateReward)}
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
      {isDetail ? (
        data?.status === "Draft" && (
          <button
            onClick={handleEdit}
            style={{ backgroundColor: isEdit ? "#279EFF" : "#D83F31" }}
            className="hover:bg-opacity-60 text-white font-medium md:font-bold py-2 px-4 md:py-3 md:px-8 rounded relative left-[50%] -translate-x-[50%] mt-4 md:mt-8 text-[16px] md:text-[20px]"
          >
            {isEdit ? "Save" : "Edit"}
          </button>
        )
      ) : (
        <>
          {" "}
          <button
            style={{ display: !stateReward ? "none" : "" }}
            onClick={handleCreateEdit}
            className="bg-[#D83F31] hover:bg-opacity-60 text-white font-medium md:font-bold py-2 px-4 md:py-3 md:px-8 rounded relative left-[50%] -translate-x-[50%] mt-4 md:mt-8 text-[16px] md:text-[20px]"
          >
            Edit
          </button>
          <div className="flex items-center justify-center gap-4 md:gap-8 mt-5">
            <button
              style={{ display: stateReward ? "none" : "" }}
              onClick={handleSave}
              className="bg-[#D83F31] hover:bg-opacity-60 text-white font-bold py-1 px-3 md:py-3 md:px-8 rounded  mt-2 mb-4 text-[16px] md:text-[20px]"
            >
              Save
            </button>

            <button
              style={{ display: stateReward ? "none" : "" }}
              onClick={handleNext}
              className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-1 px-3 md:py-3 md:px-8 rounded  mt-2 mb-4 text-[16px] md:text-[20px]"
            >
              Next
            </button>
          </div>
        </>
      )}
      <ToastContainer />
    </div>
  );
}

export default Reward;
