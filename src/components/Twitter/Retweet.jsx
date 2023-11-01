import React from "react";
import { Input } from "antd";
import { FaWindowClose } from "react-icons/fa";

function Retweet({ setRetweet, setActionTwitter, value, isDisable }) {
  return (
    <div className="borderBlue rounded-lg p-2 md:py-4 md:px-6 mb-4 relative">
      <h1 className="text-[16px] md:text-[24px] font-semibold text-white">Twitter Retweet</h1>

      <div className="mt-4">
        <label className="heading" htmlFor="follow">
          URL
        </label>
        <Input
          disabled={isDisable}
          value={value || ""}
          onChange={(e) => setRetweet(e.target.value)}
          className="placeholder:text-white placeholder:opacity-40"
          placeholder="https://twitter.com/..."
        />
      </div>
      <div
        onClick={() => setActionTwitter((prev) => ({ ...prev, Retweet: !prev.Retweet }))}
        className="absolute top-4 right-4 z-10"
      >
        <FaWindowClose className="w-[40px] h-[40px] text-white cursor-pointer hover:text-yellow-300 active:opacity-40" />
      </div>
    </div>
  );
}

export default Retweet;
