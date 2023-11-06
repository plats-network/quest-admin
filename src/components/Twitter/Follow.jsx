import BlockInput from "../BlockInput";
import BlockTask from "../BlockTask";

function Follow({ setFollow, setActionTwitter, value, isDisable }) {
  return (
    <BlockTask title="Follow" setActionTwitter={setActionTwitter}>
      <BlockInput name="User Name" value={value} setAction={setFollow} isDisable={isDisable} />
    </BlockTask>
  );
}

export default Follow;
