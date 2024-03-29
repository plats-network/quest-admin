import { Switch } from "antd";
import { FaWindowClose } from "react-icons/fa";
const ReferalTemplate = ({ value, setActiveTemplate, setIsReferal, title }) => {
  const onChange = (checked) => {
    setIsReferal(checked);
  };

  return (
    <div className="relative">
      <div className="borderBlue rounded-lg p-2 md:py-4 md:px-6 mb-4 relative flex items-center justify-between">
        <h1 className="text-[16px] md:text-[24px] font-semibold text-white">
          {title}
          <p className="text-white text-sm">Refer friend to increase the chance of winning Lucky Draw Only</p>
        </h1>
        <Switch value={value} className="mt-12 bg-gray-950" defaultChecked onChange={onChange} />
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

export default ReferalTemplate;
