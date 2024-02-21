export const checkAllowedNext = (
  activeTwitter,
  activeTemplate,
  follow,
  retweet,
  like,
  hashtag,
  urlHashtag,
  tokenHolder,
  transactionActivity,
  linkDiscord,
  linkTelegram,
  infoCheckNft
) => {
  if (activeTwitter.Follow && !follow) return false;
  if (activeTwitter.Retweet && !retweet) return false;
  if (activeTwitter.Like && !like) return false;
  if (activeTwitter.Hashtag && !hashtag) return false;

  if (activeTwitter.Discord && !linkDiscord) return false;
  if (activeTwitter.Telegram && !linkTelegram) return false;

  if (activeTwitter.Hashtag && !hashtag && !urlHashtag) return false;
  if (activeTemplate.TokenHolder && !tokenHolder.minimumAmount) return false;
  if (activeTemplate.TransactionActivity && !transactionActivity.minimumAmount) return false;
  if (activeTemplate.NFT && !infoCheckNft.address) return false;
  if (
    !follow &&
    !retweet &&
    !like &&
    !hashtag &&
    !urlHashtag &&
    !tokenHolder.minimumAmount &&
    !transactionActivity.minimumAmount &&
    !linkDiscord &&
    !linkTelegram &&
    !infoCheckNft.address
  )
    return false;
  return true;
};
