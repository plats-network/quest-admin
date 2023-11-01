import clsx from "clsx";
import { useSelector } from "react-redux";
import { FaCheckCircle } from "react-icons/fa";
import { useParams } from "react-router-dom";
import { checkValueQuest } from "../utils/checkTickQuest";
import { useState } from "react";

function Tab({ order, name, isActive, value, setValue, valueSetup, valueQuest, valueReward, isSuccess }) {
  console.log({ value, name });
  const { stateSetup, stateQuest, stateDeposit, stateReward, stateLeaderboard } = useSelector(
    (state) => state.stateCampaign
  );
  const { id } = useParams();
  const [notAllowLeaderBoard, setNotAllowLeaderBoard] = useState(false);

  const handleActive = () => {
    if (id && isSuccess) {
      setValue(name);
    } else if (id && !isSuccess) {
      if (name !== "Leaderboard") {
        setValue(name);
      }
    }
    if (isActive) {
      setValue(name);
    }
  };
  const handleHover = () => {
    if (id && !isSuccess && name === "Leaderboard") {
      setNotAllowLeaderBoard(true);
    }
  };
  return (
    <li
      onMouseEnter={handleHover}
      style={{
        backgroundColor: value === name ? "#B3FFAE" : "",
        cursor: (!isActive && !id) || (name === "Leaderboard" && notAllowLeaderBoard) ? "not-allowed" : "",
      }}
      className={clsx(
        "bg-white text-black font-bold px-4 py-2 rounded-lg cursor-pointer transition-colors duration-200 flex items-center gap-2"
      )}
      onClick={handleActive}
    >
      <p>{`${order}. ${name}`}</p>
      {id ? ( // man detail
        isSuccess ? (
          <FaCheckCircle className="text-green-500" /> // campaign active thì các task đều có check xanh.
        ) : (
          // check từng task
          <div>
            {valueSetup?.title && name === "Setup" && <FaCheckCircle className="text-green-500" />}
            {checkValueQuest(valueQuest) && name === "Quest" && <FaCheckCircle className="text-green-500" />}
            {valueReward?.totalReward ? name === "Reward" && <FaCheckCircle className="text-green-500" /> : ""}
            {stateDeposit && name === "Deposit" && <FaCheckCircle className="text-green-500" />}
            {stateLeaderboard && name === "Leaderboard" && <FaCheckCircle className="text-green-500" />}
          </div>
        )
      ) : (
        // màn create
        <div>
          {console.log("hello")}
          {name === "Setup" && stateSetup && <FaCheckCircle className="text-green-500" />}
          {name === "Quest" && stateQuest && <FaCheckCircle className="text-green-500" />}
          {name === "Reward" && stateReward && <FaCheckCircle className="text-green-500" />}
          {name === "Deposit" && stateDeposit && <FaCheckCircle className="text-green-500" />}
          {name === "Leaderboard" && stateLeaderboard && <FaCheckCircle className="text-green-500" />}
        </div>
      )}
    </li>
  );
}

export default Tab;
