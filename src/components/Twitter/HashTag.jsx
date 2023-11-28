import BlockInput from "../BlockInput";
import BlockTask from "../BlockTask";

function HashTag({ setHashtag, setActionTwitter, value, isDisable, urlHashtag, setUrlHashtag }) {
  return (
    <BlockTask title="Hashtag" setActionTwitter={setActionTwitter}>
      <BlockInput
        name="Hashtags (separated by comma)"
        value={value}
        setAction={setHashtag}
        isDisable={isDisable}
        placeholder="#hashtag"
      />
      <BlockInput name="URL" value={urlHashtag} setAction={setUrlHashtag} isDisable={isDisable} />
    </BlockTask>
  );
}

export default HashTag;
