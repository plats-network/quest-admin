import { useState, useEffect } from "react";
import { DateTime } from "luxon";
import { Button, Avatar, Divider, Tooltip } from "antd";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import { useDispatch } from "react-redux";
import metadata from "../utils/contract.json";

import {
  setStateDeposit,
  setStateLeaderboard,
  setStateQuest,
  setStateReward,
  setStateSetup,
} from "../redux/stateCampaign";
import { instanceAxios } from "../services/api-connect-wallet";
import { useContract, useTx } from "useink";
import { routes } from "../routes";

function Leaderboard({ setValue, startDate, endDate, setValueSetup, setValueQuest, setValueReward, valueReward }) {
  const param = useParams();
  const [partyTime, setPartyTime] = useState(false);
  const [days, setDays] = useState(0);
  const [hours, setHours] = useState(0);
  const [minutes, setMinutes] = useState(0);
  const [seconds, setSeconds] = useState(0);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const isDetail = useLocation().pathname.includes("detail");
  const [listLuckyMembers, setListLuckyMembers] = useState([]);
  const [isPrize, setIsPrize] = useState(false);

  const CONTRACT_ADDRESS_ALPHE = import.meta.env.VITE_CONTRACT_ADDRESS_ALEPH;
  const alpheContract = useContract(CONTRACT_ADDRESS_ALPHE, metadata, "aleph-testnet");
  const alpheReward = useTx(alpheContract, "reward");

  const start_date = DateTime.fromJSDate(new Date(startDate));
  const end_date = DateTime.fromJSDate(new Date(endDate));

  const [isRemainingToStart, setIsRemainingToStart] = useState(false);

  const countTime = (now) => {
    const diff_now_start = start_date.diff(now).values.milliseconds;
    const diff_now_end = end_date.diff(now).values.milliseconds;
    if (diff_now_start > 0) {
      if (!isRemainingToStart) {
        setIsRemainingToStart(true);
      }
      return diff_now_start;
    }
    if (isRemainingToStart) {
      setIsRemainingToStart(false);
    }
    return diff_now_end;
  };

  const handleOtherCampaign = () => {
    dispatch(setStateSetup(false));
    dispatch(setStateDeposit(false));
    dispatch(setStateQuest(false));
    dispatch(setStateReward(false));
    dispatch(setStateLeaderboard(false));
    setValueQuest();
    setValueReward();
    setValueSetup();
    setValue("Setup");
  };

  const handleGoCampaign = () => {
    dispatch(setStateSetup(false));
    dispatch(setStateDeposit(false));
    dispatch(setStateQuest(false));
    dispatch(setStateReward(false));
    dispatch(setStateLeaderboard(false));
    setValueQuest();
    setValueReward();
    setValueSetup();
    navigate("/campaign");
  };

  useEffect(() => {
    let interval;
    if (endDate && startDate) {
      interval = setInterval(() => {
        const now = DateTime.now();
        const d = Math.floor(countTime(now) / (1000 * 60 * 60 * 24));

        setDays(d);

        const h = Math.floor((countTime(now) % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        setHours(h);

        const m = Math.floor((countTime(now) % (1000 * 60 * 60)) / (1000 * 60));
        setMinutes(m);

        const s = Math.floor((countTime(now) % (1000 * 60)) / 1000);
        setSeconds(s);

        if (d <= 0 && h <= 0 && m <= 0 && s <= 0) {
          setIsPrize(true);
          setPartyTime(true);
        }
      }, 1000);
    }
    return () => clearInterval(interval);
  }, []);

  const handlePrize = async () => {
    try {
      const res = await instanceAxios.get(routes.quest.getDetailCampaign(param?.id));
      const listMembers = await res?.data?.users_reward.map((item) => item.wallet_address);
      setListLuckyMembers(listMembers);
      if (res.status === 200) {
        alpheReward.signAndSend([listMembers]);
      }
      setIsPrize(false);
    } catch (error) {
      throw new Error(error);
    }
  };

  return (
    <div className="px-2 md:px-0 mt-4">
      <h1 className="text-[20px] md:text-[28px] text-white font-semibold">
        {isRemainingToStart ? "Countdown to the beginning" : "Time Remaining"}
      </h1>
      <div className="max-w-[85%] mx-auto flex items-center justify-between mt-4 md:mt-10 border-[1px] border-[#279EFF] rounded-lg py-4 px-6">
        <div className="flex flex-col items-center justify-center">
          <p className="text-[24px] md:text-[40px] font-bold mb-3 text-[#FD8D14]">{days}</p>
          <p className="text-white text-[18px] md:text-[32px]">Days</p>
        </div>
        <div className="flex flex-col items-center justify-center">
          <p className="text-[24px] md:text-[40px]  font-bold mb-3 text-[#FD8D14]">{hours}</p>
          <p className="text-white text-[18px] md:text-[32px]">Hours</p>
        </div>
        <div className="flex flex-col items-center justify-center">
          <p className="text-[24px] md:text-[40px] font-bold mb-3 text-[#FD8D14]">{minutes}</p>
          <p className="text-white text-[18px] md:text-[32px]">Minutes</p>
        </div>
        <div className="flex flex-col items-center justify-center">
          <p className="text-[24px] md:text-[40px] font-bold mb-3 text-[#FD8D14]">{seconds}</p>
          <p className="text-white text-[18px] md:text-[32px]">Seconds</p>
        </div>
      </div>
      <Button
        style={{ opacity: isPrize ? 1 : 0.5 }}
        disabled={!isPrize}
        onClick={handlePrize}
        className="bg-[#279EFF] text-white text-[12px] px-4 md:text-[18px] font-semibold md:px-8 md:py-6 flex items-center border-none outline-none hover:bg-none mx-auto mt-8"
      >
        Prize Draw
      </Button>

      {listLuckyMembers?.length > 0 && (
        <div>
          <h1 className="text-[20px] md:text-[28px] text-white font-semibold mt-8">List Lucky User</h1>
          <ul>
            {listLuckyMembers.map((item, index) => {
              return (
                <li key={index} className="text-yellow-500 text-[13px] md:text-[24px] mt-2 md:ml-10">
                  <span>
                    {item} + {valueReward?.totalReward / valueReward?.numberWinner} {valueReward?.categoryToken}
                  </span>
                </li>
              );
            })}
          </ul>
        </div>
      )}
      <div className="mt-4 md:mt-6">
        <h1 className="text-[20px] md:text-[28px] text-white font-semibold">Questers (899)</h1>
        <Avatar.Group
          className="max-w-[85%] mx-auto block mt-2 md:mt-6"
          maxCount={2}
          size={{ xs: 40, sm: 32, md: 40, lg: 64, xl: 80, xxl: 80 }}
          maxStyle={{
            color: "#f56a00",
            backgroundColor: "#fde3cf",
          }}
        >
          <Avatar className="" src="https://xsgames.co/randomusers/avatar.php?g=pixel&key=3" />
          <Avatar
            style={{
              backgroundColor: "#f56a00",
            }}
          >
            K
          </Avatar>
          <Tooltip title="Ant User" placement="top">
            <Avatar
              style={{
                backgroundColor: "#87d068",
              }}
              // icon={<UserOutlined />}
            />
          </Tooltip>
          <Avatar
            style={{
              backgroundColor: "#1677ff",
            }}
            // icon={<AntDesignOutlined />}
          />
        </Avatar.Group>
      </div>
      <div className="flex items-center justify-center gap-4 md:gap-10 mt-10 md:mt-20">
        <Button
          onClick={handleGoCampaign}
          className="bg-[#279EFF] text-white text-[12px] px-4 md:text-[18px] font-semibold md:px-8 md:py-6 flex items-center border-none outline-none hover:bg-none"
        >
          Go to Campaign
        </Button>
        <Button
          onClick={handleOtherCampaign}
          className="bg-[#B575AB] text-white text-[12px] md:text-[18px] font-semibold px-4 py-2 md:px-8 md:py-6 flex items-center border-none outline-none !hover:"
        >
          Create Other Campaign
        </Button>
      </div>
    </div>
  );
}

export default Leaderboard;
