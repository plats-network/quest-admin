import { Input, Select } from "antd";
import { NetWorks } from "./TemplateWeb3";
import { FaWindowClose } from "react-icons/fa";

const NftTemplate = ({ setActiveTemplate, title, value, setInfoCheckNft }) => {
  const handleChangeNetwork = (value) => {
    setInfoCheckNft((prev) => ({
      ...prev,
      network: value
    }));
  };

  const handleAddressNft = (e) => {
    setInfoCheckNft((prev) => ({
      ...prev,
      address: e.target.value
    }));
  };

  return (
    <div className="borderBlue rounded-lg p-2 md:py-4 md:px-6 mb-4 relative">
      <h1 className="text-[16px] md:text-[24px] font-semibold text-white">{title} </h1>
      <div className="grid grid-cols-3 items-center gap-4 md:gap-10">
        <div className="col-span-1 overflow-y-auto">
          <label className="heading">Network</label>
          <Select
            className="w-full h-[40px] md:!h-[54px] !text-[130px] placeholder:text[20px]"
            size="large"
            defaultValue={value?.network || "Phala"}
            onChange={handleChangeNetwork}
          >
            {NetWorks.map((item) => (
              <Select.Option key={item.network} value={item.network} label={item.network}>
                <div className="text-[14px] md:text-[18px] flex items-center">
                  <img
                    className="w-[24px] h-[24px] md:w-[36px] md:h-[36px] rounded-full mr-2"
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

        <div className="col-span-2 mt-[1px]">
          <label className="heading truncate">Address NFT</label>
          <Input
            type="text"
            value={value?.address}
            placeholder="Address NFT"
            className="placeholder:text-white placeholder:opacity-50"
            onChange={handleAddressNft}
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
};

export default NftTemplate;
