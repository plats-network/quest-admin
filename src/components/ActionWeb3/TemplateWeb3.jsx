import { Input, Select } from "antd";
import { Aleph, Astar, Dot } from "../../assets/img";
import { FaWindowClose } from "react-icons/fa";

export const NetWorks = [
  {
    icon: Aleph,
    network: "Aleph Zero(Testnet)"
  },
  {
    icon: Astar,
    network: "Astar(Testnet)"
  },
  {
    icon: Aleph,
    network: "Aleph Zero",
    unAvalibale: true
  },

  {
    icon: Astar,
    network: "Astar",
    unAvalibale: true
  },

  {
    icon: Dot,
    network: "Polkadot",
    unAvalibale: true
  }
];

export const Tokens = [
  {
    icon: Aleph,
    token: "AZERO"
  },
  {
    icon: Astar,
    token: "ASTR"
  },
  {
    icon: Dot,
    token: "DOT"
  }
];

const mapNetWorkToken = {
  Astar: "ASTR",
  "Astar(Testnet)": "ASTR",
  "Aleph Zero": "AZERO",
  "Aleph Zero(Testnet)": "AZERO",
  Polkadot: "DOT"
};

function TemplateWeb3({ title, label, setTokenHolder, setTransactionActivity, setActiveTemplate, value, isDisable }) {
  const Mapping = {
    TokenHolder: setTokenHolder,
    TransactionActivity: setTransactionActivity
  };

  const handleChangeNetwork = (value) => {
    Mapping[title]((prev) => {
      return {
        ...prev,
        network: value
      };
    });
    handleChangeToken(mapNetWorkToken[value]);
  };

  const handleChangeToken = (value) => {
    Mapping[title]((prev) => {
      return {
        ...prev,
        categoryToken: value
      };
    });
  };

  const handleAmount = (e) => {
    Mapping[title]((prev) => {
      return {
        ...prev,
        minimumAmount: e.target.value
      };
    });
  };

  return (
    <div className="borderBlue rounded-lg p-2 md:py-4 md:px-6 mb-4 relative">
      <h1 className="text-[16px] md:text-[24px] font-semibold text-white">{title}</h1>
      <div className="flex flex-col md:flex-row items-start justify-between gap-4 md:gap-10">
        <div className="flex flex-col w-full">
          <label className="heading">Network</label>
          <Select
            disabled={isDisable}
            className="w-full h-[40px] md:!h-[54px] !text-[130px] placeholder:text[20px]"
            size="large"
            defaultValue={value?.network || "Phala"}
            onChange={handleChangeNetwork}
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
        <div className="flex flex-col  w-full">
          <label className="heading">Token</label>
          <Select
            disabled={isDisable}
            className="w-full h-[40px] md:!h-[54px] !text-[130px] placeholder:text[20px]"
            size="large"
            value={value?.categoryToken}
            defaultValue={value?.categoryToken || "PHA"}
            // onChange={handleChangeToken}
          >
            {Tokens.map((item) => (
              <Select.Option key={item.token} value={item.network} label={item.network}>
                <div className="text-[14px] md:text-[18px] flex items-center">
                  <img
                    className="w-[24px] h-[24px] md:w-[40px] md:h-[40px] rounded-full mr-2"
                    src={item.icon}
                    alt="icon"
                  />
                  <p className="text-white">{item.token}</p>
                </div>
              </Select.Option>
            ))}
          </Select>
        </div>
        <div className="w-full mt-[1px]">
          <label className="heading truncate">{label}</label>
          <Input
            disabled={isDisable}
            value={value?.minimumAmount || ""}
            onChange={(e) => handleAmount(e)}
            type="number"
            placeholder="100"
            className="placeholder:text-white placeholder:opacity-50"
          />
        </div>
      </div>
      <div
        onClick={() => setActiveTemplate((prev) => ({ ...prev, [title]: !prev[title] }))}
        className="absolute top-4 right-4 z-10"
      >
        <FaWindowClose className="w-[40px] h-[40px] text-white cursor-pointer hover:text-yellow-300 active:opacity-30" />
      </div>
    </div>
  );
}

export default TemplateWeb3;
