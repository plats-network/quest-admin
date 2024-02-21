import { memo } from "react";
import { FaWindowClose } from "react-icons/fa";

function BlockTask({ title, children, setActionTwitter, twitter = true }) {
  const handleClick = () => {
    setActionTwitter((prev) => ({ ...prev, [title]: !prev[title] }));
  };

  return (
    <div className="borderBlue rounded-lg p-2 md:py-4 md:px-6 mb-4 relative">
      <h1 className="text-[16px] md:text-[24px] font-semibold text-white">
        {twitter ? "Twitter" : "Join"} {title}
      </h1>
      {children}
      <div onClick={handleClick} className="absolute top-4 right-4 z-10">
        <FaWindowClose className="w-[40px] h-[40px] text-white cursor-pointer hover:text-yellow-300 active:opacity-40" />
      </div>
    </div>
  );
}

export default memo(BlockTask);
