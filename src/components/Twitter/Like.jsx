import React, { useCallback } from "react";
import BlockInput from "../BlockInput";
import BlockTask from "../BlockTask";

function Like({ setLike, setActionTwitter, value, isDisable }) {
  return (
    <BlockTask title="Like" setActionTwitter={setActionTwitter}>
      <BlockInput name="URL" value={value} setAction={setLike} isDisable={isDisable} />
    </BlockTask>
  );
}

export default Like;
