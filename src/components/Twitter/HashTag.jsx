import React from "react";
import { Input } from "antd";
import { FaWindowClose } from "react-icons/fa";

function HashTag({ setHashtag, setActionTwitter, value, isDisable, urlHashtag, setUrlHashtag }) {
  return (
    <div className="borderBlue rounded-lg p-2 md:py-4 md:px-6 mb-4 relative">
      <h1 className="text-[16px] md:text-[24px] font-semibold text-white">Twitter Hashtag</h1>
      <div className="mt-4">
        <label className="heading" htmlFor="follow">
          Hashtags (separated by comma)
        </label>
        <Input
          disabled={isDisable}
          value={value || ""}
          onChange={(e) => setHashtag(e.target.value)}
          className="leading-[50px] placeholder:text-[18px] placeholder:text-white placeholder:opacity-40"
          placeholder="#Twitter, #Retweet, #Like"
        />
      </div>
      <div className="mt-4">
        <label className="heading" htmlFor="follow">
          URL HashTag
        </label>
        <Input
          disabled={isDisable}
          value={urlHashtag || ""}
          onChange={(e) => setUrlHashtag(e.target.value)}
          className="leading-[50px] placeholder:text-[18px] placeholder:text-white placeholder:opacity-40"
          placeholder="https://twitter.com/..."
        />
      </div>
      <div
        onClick={() => setActionTwitter((prev) => ({ ...prev, Hashtag: !prev.Hashtag }))}
        className="absolute top-4 right-4 z-10"
      >
        <FaWindowClose className="w-[40px] h-[40px] text-white cursor-pointer hover:text-yellow-300 active:opacity-40" />
      </div>
    </div>
  );
}

export default HashTag;
