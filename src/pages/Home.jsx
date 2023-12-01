import { useCallback, useState } from "react";
import { LogoQuest, Banner } from "../assets/img";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import ModalWallet from "../components/ModalWallet";

function Home() {
  const navigate = useNavigate();
  const { currentAccount } = useSelector((state) => state.account);
  const [isModal, setIsModal] = useState(false);

  const handleConnect = () => {
    if (!currentAccount) {
      handleModal(true);
    } else {
      navigate("/campaign");
    }
  };

  const handleModal = useCallback((value) => {
    setIsModal(value);
  }, []);

  return (
    <main className="mx-auto max-w-screen-2xl w-full mt-10 overflow-hidden px-2">
      <div className="flex items-center ">
        <img
          className="w-[48px] h-[48px] md:w-[72px] md:h-[72px] object-cover rounded-lg"
          src={LogoQuest}
          alt="logo"
          loading="lazy"
        />
        <h1 className="text-[24px] md:text-[40px] font-bold text-white ml-5">PLATS QUEST</h1>
      </div>
      <div className="flex flex-col md:flex-row items-center justify-between mt-20 ml-8">
        <div className=" md:flex-1 md:absolute md:top-[25%] md:z-50">
          <h1 className="text-[36px] md:text-[68px] w-fit text-white font-medium border-b-2 border-gray-400">
            PLATS QUEST
          </h1>
          <h2 className="text-[30px] md:text-[48px] w-fit text-[#ED3A85] font-medium border-b-2 border-gray-400 mt-4 break-words">
            Explore, Engage, Educate
          </h2>
          <h2 className="text-[32px] text-wra md:text-[40px] text-white font-medium mt-4">
            Polkadot's Quest Campaigns
          </h2>
          <p className="text-[18px] md:text-[24px] text-white mt-4 md:mt-10 w-[400px] md:w-[640px]">
            Provide an effective Marketing Tool for every project in the Polkadot ecosystem
          </p>
          <div className="md:hidden h-fit">
            <img
              className="w-[400px] h-[300px] -ml-[120px] -mt-[50px] object-cover"
              src={Banner}
              alt="banner"
              loading="lazy"
            />
          </div>
          <div className="flex items-center gap-4 md:gap-10 mt-10">
            <a
              href="https://plats-quest.vaix.group/"
              target="_blank"
              className="btnGradient1 cursor-pointer py-2 px-4 md:py-4 md:px-10 rounded-lg text-[16px] md:text-[20px] font-normal md:font-bold text-white"
              rel="noreferrer"
            >
              {" "}
              Start Earning
            </a>
            <button
              onClick={handleConnect}
              className="btnGradient2 cursor-pointer py-2 px-4 md:py-4 md:px-10 rounded-lg text-[16px] md:text-[20px] font-normal md:font-bold text-white"
            >
              Create Campaign Now
            </button>
          </div>
        </div>
        <div className="hidden md:flex flex-1 w-full">
          <img className="w-full md:-mt-[180px] md:relative" src={Banner} alt="banner" loading="lazy" />
        </div>
      </div>
      {isModal && <ModalWallet setIsModal={handleModal} />}
    </main>
  );
}

export default Home;
