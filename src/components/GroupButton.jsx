import Button from "./Button";

function Group3Button({ handleCreateEdit, handleSave, handleNext, state }) {
  return (
    <div className="flex items-center justify-center">
      <Button style={{ display: !state ? "none" : "" }} name="Edit" onClick={handleCreateEdit} className="" />
      <div className="flex items-center justify-center gap-4 md:gap-8 pb-8">
        <Button style={{ display: state ? "none" : "" }} name="Save" className="bg-[#279EFF]" onClick={handleSave} />
        <Button style={{ display: state ? "none" : "" }} name="Next" className="bg-[#3CCF4E]" onClick={handleNext} />
      </div>
    </div>
  );
}

export default Group3Button;
