import { useEffect, useState } from "react";
import Setup from "./Setup";
import Reward from "./Reward";
import Quest from "./Quest";
import Deposit from "./Deposit";
import Leaderboard from "./Leaderboard";
import { useParams } from "react-router-dom";
import { routes } from "../routes";
import { instanceAxios } from "../services/api-connect-wallet";
import Tab from "./Tab";
import { listTabs } from "../utils/listTabs";
import { networkOptions } from "../utils/network";

function Tabs() {
  const [value, setValue] = useState("Setup");
  const [valueSetup, setValueSetup] = useState();
  const [valueQuest, setValueQuest] = useState();
  const [valueReward, setValueReward] = useState();
  const [isDeposit, setIsDeposit] = useState(false);
  const [timeStart, setTimeStart] = useState();
  const [isPrize, setIsPrize] = useState();
  const param = useParams();

  const [data, setData] = useState([...listTabs]);

  const mappingNetwork = {
    aleph: "Aleph Zero",
    astar: "Astar",
    polkadot: "Polkadot",
  };

  useEffect(() => {
    setData([
      {
        name: "Setup",
        order: 1,
        isActive: true,
      },
      {
        name: "Quest",
        order: 2,
        isActive: false,
      },
      {
        name: "Reward",
        order: 3,
        isActive: false,
      },
      {
        name: "Deposit",
        order: 4,
        isActive: false,
      },
      {
        name: "Leaderboard",
        order: 5,
        isActive: false,
      },
    ]);
  }, []);

  useEffect(() => {
    const fetch = async () => {
      let twitterFollow = null;
      let twitterLike = null;
      let twitterRetweet = null;
      let twitterHashtag = null;
      let twitterHashtagUrl = null;
      let tokenHolder = null;
      let transactionActivity = null;
      try {
        const { data } = await instanceAxios.get(routes.quest.getDetailCampaign(param.id));
        const tasks = data?.tasks;
        setTimeStart(data?.start_at);
        setIsPrize(data.is_prize);
        tasks?.forEach((item) => {
          if (item?.entry_type === "TRANSFER_ACTIVITY") {
            transactionActivity = {
              network: networkOptions[item?.block_chain_network],
              categoryToken: item?.category_token,
              minimumAmount: item?.total_token,
            };
          }

          if (item?.entry_type === "TOKEN_HOLDERS") {
            tokenHolder = {
              network: networkOptions[item?.block_chain_network],
              categoryToken: item?.category_token,
              minimumAmount: item?.total_token,
            };
          }

          if (item?.entry_type === "TWITTER_LIKE") {
            twitterLike = item?.value;
          }
          if (item?.entry_type === "TWITTER_RETWEET") {
            twitterRetweet = item?.value;
          }
          if (item?.entry_type === "TWITTER_FOLLOW") {
            twitterFollow = item?.value;
          }
          if (item?.entry_type === "TWITTER_HASHTAG") {
            twitterHashtag = item?.hash_tag;
            twitterHashtagUrl = item?.value;
          }
        });
        setValueSetup({
          title: data?.name,
          description: data?.content,
          startDate: data?.start_at,
          endDate: data?.end_at,
          urlThumbnail: data?.featured_image,
          status: data?.status,
        });
        setValueQuest({
          twitterFollow,
          twitterRetweet,
          twitterLike,
          twitterHashtag,
          twitterHashtagUrl,
          tokenHolder,
          transactionActivity,
          status: data?.status,
        });
        setValueReward({
          network: mappingNetwork[data?.block_chain_network],
          rewardType: data?.reward_type,
          categoryToken: data?.category_token,
          totalReward: data?.total_token,
          numberWinner: data?.total_person,
          status: data?.status,
        });
        setIsDeposit(data?.status === "Active" ? true : false);
      } catch (error) {
        throw new Error(error.message);
      }
    };
    if (param?.id) {
      fetch();
    }
  }, [param?.id]);
  const Options = {
    Setup: <Setup setValue={setValue} setValueSetup={setValueSetup} data={valueSetup} onActive={setData} />,
    Quest: (
      <Quest
        setValue={setValue}
        valueSetup={valueSetup}
        setValueQuest={setValueQuest}
        data={valueQuest}
        onActive={setData}
        timeStart={timeStart}
      />
    ),
    Reward: (
      <Reward
        setValue={setValue}
        valueSetup={valueSetup}
        valueQuest={valueQuest}
        setValueReward={setValueReward}
        data={valueReward}
        onActive={setData}
        isDeposit={isDeposit}
        timeStart={timeStart}
      />
    ),
    Deposit: (
      <Deposit
        setValue={setValue}
        amount={valueReward?.totalReward}
        categoryToken={valueReward?.categoryToken}
        valueSetup={valueSetup}
        valueQuest={valueQuest}
        valueReward={valueReward}
        isDeposit={isDeposit}
        onActive={setData}
        timeStart={timeStart}
      />
    ),
    Leaderboard: (
      <Leaderboard
        setValue={setValue}
        startDate={valueSetup?.startDate}
        endDate={valueSetup?.endDate}
        setValueSetup={setValueSetup}
        setValueQuest={setValueQuest}
        setValueReward={setValueReward}
        valueReward={valueReward}
        onActive={setData}
        isPrized={isPrize}
      />
    ),
  };

  return (
    <>
      <div className="w-fit pb-4 px-2">
        <ul className="flex flex-wrap items-center text-white bg-white rounded-lg overflow-hidden p-[1px]">
          {data?.map((item, index) => {
            return (
              <Tab
                key={index}
                {...item}
                value={value}
                setValue={setValue}
                valueSetup={valueSetup}
                valueQuest={valueQuest}
                valueReward={valueReward}
                isSuccess={isDeposit}
              />
            );
          })}
        </ul>
      </div>
      <div className="transition-all duration-500">{Options[value]}</div>
    </>
  );
}

export default Tabs;
