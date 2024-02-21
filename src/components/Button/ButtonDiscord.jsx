import { useState } from "react";
import { Button } from "antd";
import { FaDiscord } from "react-icons/fa";

function ButtonDiscord({ setActionTwitter, children }) {
  const [hover, setHover] = useState(false);
  const handleClick = () => {
    setActionTwitter((prev) => {
      return {
        ...prev,
        [children]: true
      };
    });
  };
  return (
    <div>
      <Button
        onClick={() => handleClick()}
        onMouseEnter={() => setHover(true)}
        onMouseLeave={() => setHover(false)}
        className="bg-[#179CF0] p-2 md:p-6 flex items-center text-[14px] md:text-[18px] text-white font-semibold hover:bg-transparent"
        icon={<FaDiscord style={{ color: hover ? "#179CF0" : "" }} className="text-white w-6 h-6" />}
      >
        {children}
      </Button>
    </div>
  );
}
export default ButtonDiscord;
