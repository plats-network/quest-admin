import { useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import { setSaveSuccess, setStateQuest } from "../redux/stateCampaign";
import { callApiCreate, callApiUpdate } from "../services/callApiCreate";
import { checkAllowedNext } from "../utils/checkAllowNextQuest";
import { checkLogin } from "../utils/checkLogin";
import { handleCheckDisable } from "../utils/handleDisableTask";
import { notifyError, notifySuccess } from "../utils/toastify";
import { validateTaskQuest } from "../utils/validateQuest";
import TemplateWeb3 from "./ActionWeb3/TemplateWeb3";
import ButtonNetwork from "./ButtonNetwork";
import ButtonTwitter from "./ButtonTwitter";
import Follow from "./Twitter/Follow";
import HashTag from "./Twitter/HashTag";
import Like from "./Twitter/Like";
import Retweet from "./Twitter/Retweet";
import LogicHandleButton from "../utils/LogicHandleButton";
import { checkTaskOnChain } from "../utils/checkTaskOnChain";
import NftTemplate from "./ActionWeb3/NftTemplate";
import ButtonDiscord from "./Button/ButtonDiscord";
import ButtonTelegram from "./Button/ButtonTelegram";
import JoinDiscord from "./Twitter/JoinDiscord";
import JoinTelegram from "./Twitter/JoinTelegram";
import ReferalTemplate from "./ActionWeb3/ReferalTemplate";

const ActiosTwitter = ["Follow", "Retweet", "Like", "Hashtag"];
const ActionWeb3 = ["Token Holder", "Transaction Activity", "NFT", "Referal"];

function Quest({ setValue, valueSetup, setValueQuest, data, onActive, timeStart }) {
  const param = useParams();
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
    Discord: false,
    Telegram: false
  });

  const [activeTemplate, setActiveTemplate] = useState({
    TokenHolder: false,
    TransactionActivity: false,
    NFT: false,
    Referal: false
  });

  const [follow, setFollow] = useState(data?.twitterFollow || "");
  const [retweet, setRetweet] = useState(data?.twitterRetweet || "");
  const [like, setLike] = useState(data?.twitterLike || "");
  const [hashtag, setHashtag] = useState(data?.twitterHashtag || "");
  const [urlHashtag, setUrlHashtag] = useState(data?.twitterHashtagUrl || "");
  const [linkDiscord, setLinkDiscord] = useState(data?.urlDiscord || "");
  const [linkTelegram, setLinkTelegram] = useState(data?.urlTelegram || "");

  const [tokenHolder, setTokenHolder] = useState(
    data?.tokenHolder || {
      network: "Aleph Zero(Testnet)",
      categoryToken: "AZERO",
      minimumAmount: ""
    }
  );

  const [transactionActivity, setTransactionActivity] = useState(
    data?.transactionActivity || {
      network: "Aleph Zero(Testnet)",
      categoryToken: "AZERO",
      minimumAmount: ""
    }
  );

  const [infoCheckNft, setInfoCheckNft] = useState(
    data?.infoCheckNft || {
      network: "Aleph Zero(Testnet)",
      address: ""
    }
  );

  const [isReferal, setIsReferal] = useState(data?.isReferal || false);

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
      transactionActivity,
      linkDiscord,
      linkTelegram,
      infoCheckNft,
      isReferal
    );
    const check = validateTaskQuest(activeTwitter, follow, retweet, like, urlHashtag, hashtag);
    const checkAmount = checkTaskOnChain(tokenHolder.minimumAmount, transactionActivity.minimumAmount);
    if (!checkAmount) return false;
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
        urlDiscord: linkDiscord,
        urlTelegram: linkTelegram,
        infoCheckNft,
        isReferal
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

  const handleUpdate = async () => {
    try {
      const res = await callApiUpdate(param?.id, valueSetup, {
        twitterFollow: follow,
        twitterRetweet: retweet,
        twitterLike: like,
        twitterHashtag: hashtag,
        twitterHashtagUrl: urlHashtag,
        tokenHolder: tokenHolder,
        transactionActivity: transactionActivity,
        urlDiscord: linkDiscord,
        urlTelegram: linkTelegram,
        infoCheckNft,
        isReferal
      });
      if (res.data?.status === "success") {
        notifySuccess("Update campaign successfully");
        setTimeout(() => {
          navigate("/campaign");
        }, 1200);
      }
    } catch (error) {
      notifyError("Update campaign Failed");
    }
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
        urlDiscord: linkDiscord,
        urlTelegram: linkTelegram,
        infoCheckNft,
        isReferal
      });
      if (res.data.status === "success") {
        navigate("/campaign");
        dispatch(setSaveSuccess(true));
      }
    } catch (error) {
      notifyError(error.message);
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
        <ButtonDiscord setActionTwitter={setActionTwitter}>Discord</ButtonDiscord>
        <ButtonTelegram setActionTwitter={setActionTwitter}>Telegram</ButtonTelegram>
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
        {activeTwitter.Discord || data?.urlDiscord ? (
          <JoinDiscord
            linkDiscord={linkDiscord}
            setActionTwitter={setActionTwitter}
            setLinkDiscord={setLinkDiscord}
            isDisable={handleCheckDisable(isDetail, isEdit, stateQuest)}
          />
        ) : (
          ""
        )}
        {activeTwitter.Telegram || data?.urlTelegram ? (
          <JoinTelegram
            linkTelegram={linkTelegram}
            setActionTwitter={setActionTwitter}
            setLinkTelegram={setLinkTelegram}
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
        {activeTemplate.NFT || data?.infoCheckNft?.address ? (
          <NftTemplate
            value={infoCheckNft}
            setActiveTemplate={setActiveTemplate}
            setInfoCheckNft={setInfoCheckNft}
            title="NFT"
          />
        ) : (
          ""
        )}
        {activeTemplate.Referal || data?.isReferal ? (
          <ReferalTemplate
            value={isReferal}
            setActiveTemplate={setActiveTemplate}
            setIsReferal={setIsReferal}
            title="Referal"
          />
        ) : (
          ""
        )}
      </div>
      <LogicHandleButton
        isDetail={isDetail}
        data={data}
        isEdit={isEdit}
        handleEdit={handleEdit}
        startDate={timeStart}
        onUpdate={handleUpdate}
        handleCreateEdit={handleCreateEdit}
        handleNext={handleNext}
        onSave={handleSave}
        state={stateQuest}
      />
      <ToastContainer />
    </div>
  );
}

export default Quest;
