import { FaCheck } from "react-icons/fa";
import { useSelector } from "react-redux";

export const ListTabs = () => {
  const { stateSetup, stateQuest, stateReward, stateDeposit, stateLeaderboard } = useSelector(
    (state) => state.stateCampaign
  );

  return [
    {
      label: (
        <div className="flex items-center gap-2">
          <h2>Setup</h2>
          {stateSetup && <FaCheck className="text-green-500" />}
        </div>
      ),
      value: "Setup",
    },
    {
      label: (
        <div className="flex items-center gap-2">
          <h2>Quest</h2>
          {stateQuest && <FaCheck className="text-green-500" />}
        </div>
      ),
      value: "Quest",
    },
    {
      label: (
        <div className="flex items-center gap-2">
          <h2>Reward</h2>
          {stateReward && <FaCheck className="text-green-500" />}
        </div>
      ),
      value: "Reward",
    },
    {
      label: (
        <div className="flex items-center gap-2">
          <h2>Deposit</h2>
          {stateDeposit && <FaCheck className="text-green-500" />}
        </div>
      ),
      value: "Deposit",
    },
    {
      label: (
        <div className="flex items-center gap-2">
          <h2>Leaderboard</h2>
          {stateLeaderboard && <FaCheck className="text-green-500" />}
        </div>
      ),
      value: "Leaderboard",
    },
  ];
};
