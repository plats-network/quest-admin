import React from "react";
import { Input } from "antd";
import { FaWindowClose } from "react-icons/fa";

function Like({ setLike, setActionTwitter, value, isDisable }) {
  return (
    <div className="borderBlue rounded-lg p-2 md:py-4 md:px-6 mb-4, relative">
      <h1 className="text-[16px] md:text-[24px] font-semibold text-white">Twitter Like</h1>
      <div className="mt-4">
        <label className="heading" htmlFor="follow">
          URL
        </label>
        <Input
          disabled={isDisable}
          value={value || ""}
          onChange={(e) => setLike(e.target.value)}
          className="leading-[50px] placeholder:text-white"
        />
      </div>
      <div
        onClick={() => setActionTwitter((prev) => ({ ...prev, Like: !prev.Like }))}
        className="absolute top-4 right-4 z-10"
      >
        <FaWindowClose className="w-[40px] h-[40px] text-white cursor-pointer hover:text-yellow-300 active:opacity-40" />
      </div>
    </div>
  );
}

export default Like;
