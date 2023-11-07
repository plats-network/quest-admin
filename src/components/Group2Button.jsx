import React from "react";
import { checkStartCampaign } from "../utils/checkStartCampaign";

function Group2Button() {
  return (
     <button
            onClick={handleEdit}
            style={{ backgroundColor: isEdit ? "#279EFF" : "#D83F31" }}
            className="hover:bg-opacity-60 text-white font-medium md:font-bold py-2 px-4 md:py-3 md:px-8 rounded relative left-[50%] -translate-x-[50%] mt-4 md:mt-8 text-[16px] md:text-[20px]"
          >
            {isEdit ? "Save" : "Edit"}
          </button>
        ) : checkStartCampaign(startDate) ? (
          ""
        ) : (
          <button
            onClick={handleEdit}
            style={{ backgroundColor: isEdit ? "#279EFF" : "#D83F31" }}
            className="hover:bg-opacity-60 text-white font-medium md:font-bold py-2 px-4 md:py-3 md:px-8 rounded relative left-[50%] -translate-x-[50%] mt-4 md:mt-8 text-[16px] md:text-[20px]"
          >
            {isEdit ? "Save" : "Edit"}
          </button>
  );
}

export default Group2Button;
