import { Input } from "antd";
import React, { memo } from "react";

function BlockInput({ name, value, setAction, placeholder = "https://twitter.com/", isDisable }) {
  return (
    <div className="mt-4">
      <label className="heading" htmlFor="">
        {name}
      </label>
      <Input
        className="placeholder:text-white placeholder:opacity-40"
        disabled={isDisable}
        value={value || ""}
        onChange={(e) => setAction(e.target.value)}
        placeholder={placeholder}
      />
    </div>
  );
}

export default memo(BlockInput);
