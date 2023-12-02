import { memo, useEffect, useState } from "react";
import Button from "../components/Button";
import { checkStartCampaign } from "./checkStartCampaign";
import Group3Button from "../components/GroupButton";

function LogicHandleButton({
  isDetail,
  data,
  isEdit,
  handleEdit,
  startDate,
  onUpdate,
  handleCreateEdit,
  handleNext,
  onSave,
  state
}) {
  const [isEnable, setIsEnable] = useState(false);

  useEffect(() => {
    setIsEnable(false);
  }, []);

  const handleUpdate = () => {
    onUpdate();
    setIsEnable(true);
  };

  const handleSave = () => {
    onSave();
    setIsEnable(true);
  };

  return isDetail ? (
    data?.status === "Draft" ? (
      <div className="flex items-center justify-center">
        {isEdit ? (
          <div className="space-x-10">
            <Button disabled={isEnable} style={{ backgroundColor: "#279EFF" }} name={"Save"} onClick={handleUpdate} />
            <Button className="bg-[#3CCF4E]" name="Next" onClick={handleEdit} />
          </div>
        ) : (
          <Button style={{ backgroundColor: "#D83F31" }} name={"Edit"} onClick={handleEdit} />
        )}
      </div>
    ) : checkStartCampaign(startDate) ? (
      ""
    ) : (
      <div className="flex items-center justify-center">
        {isEdit ? (
          <div className="space-x-10">
            <Button disabled={isEnable} style={{ backgroundColor: "#279EFF" }} name={"Save"} onClick={handleSave} />
            <Button className="bg-[#3CCF4E]" name="Next" onClick={handleEdit} />
          </div>
        ) : (
          <Button style={{ backgroundColor: "#D83F31" }} name={"Edit"} onClick={handleEdit} />
        )}
      </div>
    )
  ) : (
    <Group3Button handleCreateEdit={handleCreateEdit} handleSave={handleSave} handleNext={handleNext} state={state} />
  );
}

export default memo(LogicHandleButton);
