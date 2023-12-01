import { memo } from "react";
import Button from "../components/Button";
import { checkStartCampaign } from "./checkStartCampaign";
import Group3Button from "../components/GroupButton";

function logicHandleButton({
  isDetail,
  data,
  isEdit,
  handleEdit,
  startDate,
  handleCreateEdit,
  handleNext,
  handleSave,
  state
}) {
  return isDetail ? (
    data?.status === "Draft" ? (
      <div className="flex items-center justify-center">
        <Button
          style={{ backgroundColor: isEdit ? "#279EFF" : "#D83F31" }}
          name={isEdit ? "Save" : "Edit"}
          onClick={handleEdit}
        />
      </div>
    ) : checkStartCampaign(startDate) ? (
      ""
    ) : (
      <div className="flex items-center justify-center">
        <Button
          style={{ backgroundColor: isEdit ? "#279EFF" : "#D83F31" }}
          name={isEdit ? "Save" : "Edit"}
          onClick={handleEdit}
        />
      </div>
    )
  ) : (
    <Group3Button handleCreateEdit={handleCreateEdit} handleSave={handleSave} handleNext={handleNext} state={state} />
  );
}

export default memo(logicHandleButton);
