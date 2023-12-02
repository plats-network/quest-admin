import { useNavigate } from "react-router-dom";
import Tabs from "./Tabs";
import { FaSignOutAlt } from "react-icons/fa";

function BodyDetailQuest() {
  const navigate = useNavigate();

  const handleClick = () => {
    navigate(-1);
  };

  return (
    <div className="container pb-8">
      <div className="flex items-center justify-between">
        <h1 className="title mb-4">Detail Campaign</h1>
        <FaSignOutAlt
          onClick={handleClick}
          className="text-white rotate-180 cursor-pointer hover:opacity-40 active:opacity-80"
          size={40}
        />
      </div>
      <Tabs />
    </div>
  );
}

export default BodyDetailQuest;
