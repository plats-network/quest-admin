import { useEffect, useState } from "react";
import Setup from "./Setup";
import Reward from "./Reward";
import Quest from "./Quest";
import Deposit from "./Deposit";
import Leaderboard from "./Leaderboard";
import { useParams } from "react-router-dom";
import Tab from "./Tab";
import { listTabs } from "../utils/listTabs";
import { networkOptions } from "../utils/network";
import { useQuery } from "@tanstack/react-query";
import { getCampaign } from "../services/getCampaign";
import BodyDetailSkeleton from "./BodyDetailSkeleton";

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
    Astar: "Astar",
    Polkadot: "Polkadot",
    acala: "Acala",
    moonbeam: "Moonbeam"
  };

  useEffect(() => {
    setData([
      {
        name: "Setup",
        order: 1,
        isActive: true
      },
      {
        name: "Quest",
        order: 2,
        isActive: false
      },
      {
        name: "Reward",
        order: 3,
        isActive: false
      },
      {
        name: "Deposit",
        order: 4,
        isActive: false
      },
      {
        name: "Leaderboard",
        order: 5,
        isActive: false
      }
    ]);
  }, []);

  const { data: campaign, isLoading } = useQuery({
    queryKey: ["detailCampaign", param.id],
    queryFn: () => getCampaign(param.id),
    enabled: !!param.id,
    refetchOnWindowFocus: false
  });

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
        const tasks = campaign?.tasks;
        setTimeStart(campaign?.start_at);
        setIsPrize(campaign?.is_prize);
        tasks?.forEach((item) => {
          if (item?.entry_type === "TRANSFER_ACTIVITY") {
            transactionActivity = {
              network: networkOptions[item?.block_chain_network],
              categoryToken: item?.category_token,
              minimumAmount: item?.total_token
            };
          }

          if (item?.entry_type === "TOKEN_HOLDERS") {
            tokenHolder = {
              network: networkOptions[item?.block_chain_network],
              categoryToken: item?.category_token,
              minimumAmount: item?.total_token
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
          title: campaign?.name,
          description: campaign?.content,
          startDate: campaign?.start_at,
          endDate: campaign?.end_at,
          urlThumbnail: campaign?.featured_image,
          status: campaign?.status
        });
        setValueQuest({
          twitterFollow,
          twitterRetweet,
          twitterLike,
          twitterHashtag,
          twitterHashtagUrl,
          tokenHolder,
          transactionActivity,
          status: campaign?.status
        });
        setValueReward({
          network: mappingNetwork[campaign?.block_chain_network],
          rewardType: campaign?.reward_type,
          categoryToken: campaign?.category_token,
          totalReward: campaign?.total_token,
          numberWinner: campaign?.total_person,
          status: campaign?.status
        });
        setIsDeposit(campaign?.status === "Active" ? true : false);
      } catch (error) {
        throw new Error(error.message);
      }
    };
    if (param?.id) {
      fetch();
    }
  }, [campaign]);
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
    )
  };
  if (isLoading) {
    return <BodyDetailSkeleton />;
  }

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
