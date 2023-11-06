import BlockInput from "../BlockInput";
import BlockTask from "../BlockTask";

function Retweet({ setRetweet, setActionTwitter, value, isDisable }) {
  return (
    <BlockTask title="Retweet" setActionTwitter={setActionTwitter}>
      <BlockInput name="URL" value={value} setAction={setRetweet} isDisable={isDisable} />
    </BlockTask>
  );
}

export default Retweet;
