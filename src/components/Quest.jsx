import { useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useLocation, useNavigate } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import { setSaveSuccess, setStateQuest } from "../redux/stateCampaign";
import { callApiCreate } from "../services/callApiCreate";
import { checkAllowedNext } from "../utils/checkAllowNextQuest";
import { checkLogin } from "../utils/checkLogin";
import { handleCheckDisable } from "../utils/handleDisableTask";
import { notifyError } from "../utils/toastify";
import { validateTaskQuest } from "../utils/validateQuest";
import TemplateWeb3 from "./ActionWeb3/TemplateWeb3";
import ButtonNetwork from "./ButtonNetwork";
import ButtonTwitter from "./ButtonTwitter";
import Follow from "./Twitter/Follow";
import HashTag from "./Twitter/HashTag";
import Like from "./Twitter/Like";
import Retweet from "./Twitter/Retweet";
import { checkStartCampaign } from "../utils/checkStartCampaign";

const ActiosTwitter = ["Follow", "Retweet", "Like", "Hashtag"];
const ActionWeb3 = ["Token Holder", "Transaction Activity"];

function Quest({ setValue, valueSetup, setValueQuest, data, onActive, timeStart }) {
  const isDetail = useLocation().pathname.includes("detail");
  const countRef = useRef(1);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { stateQuest } = useSelector((state) => state.stateCampaign);
  const [isEdit, setIsEdit] = useState(false);
  const [activeTwitter, setActionTwitter] = useState({
    Follow: false,
    Retweet: false,
    Like: false,
    Hashtag: false,
  });

  const [activeTemplate, setActiveTemplate] = useState({
    TokenHolder: false,
    TransactionActivity: false,
  });

  const [follow, setFollow] = useState(data?.twitterFollow || "");
  const [retweet, setRetweet] = useState(data?.twitterRetweet || "");
  const [like, setLike] = useState(data?.twitterLike || "");
  const [hashtag, setHashtag] = useState(data?.twitterHashtag || "");
  const [urlHashtag, setUrlHashtag] = useState(data?.twitterHashtagUrl || "");

  const [tokenHolder, setTokenHolder] = useState(
    data?.tokenHolder || {
      network: "Aleph Zero",
      categoryToken: "AZERO",
      minimumAmount: "",
    }
  );

  const [transactionActivity, setTransactionActivity] = useState(
    data?.transactionActivity || {
      network: "Aleph Zero",
      categoryToken: "AZERO",
      minimumAmount: "",
    }
  );

  const handleNext = () => {
    const res = checkAllowedNext(
      activeTwitter,
      activeTemplate,
      follow,
      retweet,
      like,
      hashtag,
      urlHashtag,
      tokenHolder,
      transactionActivity
    );
    const check = validateTaskQuest(activeTwitter, follow, retweet, like, urlHashtag, hashtag);
    if (!check) return;
    if (res) {
      setValueQuest({
        twitterFollow: follow,
        twitterRetweet: retweet,
        twitterLike: like,
        twitterHashtag: hashtag,
        twitterHashtagUrl: urlHashtag,
        tokenHolder: tokenHolder,
        transactionActivity: transactionActivity,
      });
      setValue("Reward");
      onActive((prev) => {
        const quest = prev[2];
        quest.isActive = true;
        return prev;
      });
      dispatch(setStateQuest(true));
    } else {
      notifyError("Please complete all information !");
    }
  };

  const handleCreateEdit = () => {
    dispatch(setStateQuest(false));
  };

  const handleSave = async () => {
    if (!checkLogin()) {
      notifyError("Please connect wallet first");
      return;
    }
    const check = validateTaskQuest(activeTwitter, follow, retweet, like, urlHashtag, hashtag);
    if (!check) return;
    try {
      const res = await callApiCreate(valueSetup, {
        twitterFollow: follow,
        twitterRetweet: retweet,
        twitterLike: like,
        twitterHashtag: hashtag,
        tokenHolder: tokenHolder,
        transactionActivity: transactionActivity,
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

  return (
    <div>
      <div className="flex flex-wrap items-center gap-4 mb-8 px-2 md:px-0">
        {ActiosTwitter.map((item, index) => {
          return (
            <ButtonTwitter key={index} setActionTwitter={setActionTwitter}>
              {item}
            </ButtonTwitter>
          );
        })}
        {ActionWeb3.map((item, index) => {
          return (
            <ButtonNetwork countRef={countRef} key={index} setActiveTemplate={setActiveTemplate}>
              {item}
            </ButtonNetwork>
          );
        })}
      </div>
      <div className="px-2 md:px-0">
        {activeTwitter.Follow || data?.twitterFollow ? (
          <Follow
            setFollow={setFollow}
            setActionTwitter={setActionTwitter}
            value={follow}
            isDisable={handleCheckDisable(isDetail, isEdit, stateQuest)}
          />
        ) : (
          ""
        )}{" "}
        {activeTwitter.Retweet || data?.twitterRetweet ? (
          <Retweet
            setRetweet={setRetweet}
            setActionTwitter={setActionTwitter}
            value={retweet}
            isDisable={handleCheckDisable(isDetail, isEdit, stateQuest)}
          />
        ) : (
          ""
        )}
        {activeTwitter.Like || data?.twitterLike ? (
          <Like
            setLike={setLike}
            setActionTwitter={setActionTwitter}
            value={like}
            isDisable={handleCheckDisable(isDetail, isEdit, stateQuest)}
          />
        ) : (
          ""
        )}
        {activeTwitter.Hashtag || data?.twitterHashtag ? (
          <HashTag
            setHashtag={setHashtag}
            setUrlHashtag={setUrlHashtag}
            setActionTwitter={setActionTwitter}
            value={hashtag}
            urlHashtag={urlHashtag}
            isDisable={handleCheckDisable(isDetail, isEdit, stateQuest)}
          />
        ) : (
          ""
        )}
        {activeTemplate.TokenHolder || data?.tokenHolder?.minimumAmount ? (
          <TemplateWeb3
            value={tokenHolder}
            setActiveTemplate={setActiveTemplate}
            setTokenHolder={setTokenHolder}
            title="TokenHolder"
            label="Minimum amount of tokens held"
            isDisable={handleCheckDisable(isDetail, isEdit, stateQuest)}
          />
        ) : (
          ""
        )}
        {activeTemplate.TransactionActivity || data?.transactionActivity?.minimumAmount ? (
          <TemplateWeb3
            value={transactionActivity}
            setActiveTemplate={setActiveTemplate}
            setTransactionActivity={setTransactionActivity}
            title="TransactionActivity"
            label="Minimum number of transactions"
            isDisable={handleCheckDisable(isDetail, isEdit, stateQuest)}
          />
        ) : (
          ""
        )}
      </div>
      {isDetail ? (
        data?.status === "Draft" ? (
          <button
            onClick={handleEdit}
            style={{ backgroundColor: isEdit ? "#279EFF" : "#D83F31" }}
            className="hover:bg-opacity-60 text-white font-medium md:font-bold py-2 px-4 md:py-3 md:px-8 rounded relative left-[50%] -translate-x-[50%] mt-4 md:mt-8 text-[16px] md:text-[20px]"
          >
            {isEdit ? "Save" : "Edit"}
          </button>
        ) : checkStartCampaign(timeStart) ? (
          ""
        ) : (
          <button
            onClick={handleEdit}
            style={{ backgroundColor: isEdit ? "#279EFF" : "#D83F31" }}
            className="hover:bg-opacity-60 text-white font-medium md:font-bold py-2 px-4 md:py-3 md:px-8 rounded relative left-[50%] -translate-x-[50%] mt-4 md:mt-8 text-[16px] md:text-[20px]"
          >
            {isEdit ? "Save" : "Edit"}
          </button>
        )
      ) : (
        <div>
          <button
            style={{ display: !stateQuest ? "none" : "" }}
            onClick={handleCreateEdit}
            className="bg-[#D83F31] hover:bg-opacity-60 text-white font-medium md:font-bold py-2 px-4 md:py-3 md:px-8 rounded relative left-[50%] -translate-x-[50%] mt-4 md:mt-8 text-[16px] md:text-[20px]"
          >
            Edit
          </button>

          <div className="flex items-center justify-center gap-4 md:gap-8">
            <button
              style={{ display: stateQuest ? "none" : "" }}
              onClick={handleSave}
              className="bg-[#D83F31] hover:bg-opacity-60 text-white font-bold py-1 px-3 md:py-3 md:px-8 rounded  mt-2 mb-4 text-[16px] md:text-[20px]"
            >
              Save
            </button>

            <button
              style={{ display: stateQuest ? "none" : "" }}
              onClick={handleNext}
              className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-1 px-3 md:py-3 md:px-8 rounded  mt-2 mb-4 text-[16px] md:text-[20px]"
            >
              Next
            </button>
          </div>
        </div>
      )}
      <ToastContainer />
    </div>
  );
}

export default Quest;
