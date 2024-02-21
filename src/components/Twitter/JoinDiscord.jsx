import BlockInput from "../BlockInput";
import BlockTask from "../BlockTask";

function JoinDiscord({ setActionTwitter, isDisable, setLinkDiscord, linkDiscord }) {
  return (
    <BlockTask title="Discord" setActionTwitter={setActionTwitter} twitter={false}>
      <BlockInput
        name="URL"
        value={linkDiscord}
        setAction={setLinkDiscord}
        isDisable={isDisable}
        placeholder="https://discord.gg/..."
      />
    </BlockTask>
  );
}

export default JoinDiscord;
