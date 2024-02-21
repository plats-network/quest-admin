import BlockInput from "../BlockInput";
import BlockTask from "../BlockTask";

function JoinTelegram({ setActionTwitter, isDisable, linkTelegram, setLinkTelegram }) {
  return (
    <BlockTask title="Telegram" setActionTwitter={setActionTwitter} twitter={false}>
      <BlockInput
        name="URL"
        value={linkTelegram}
        setAction={setLinkTelegram}
        isDisable={isDisable}
        placeholder="https://t.me/..."
      />
    </BlockTask>
  );
}

export default JoinTelegram;
