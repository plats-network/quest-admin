export const checkValueQuest = (data) => {
  if (data?.token) return true;
  if (data?.transactionActivity) return true;
  if (data?.twitterFollow) return true;
  if (data?.twitterHashtag) return true;
  if (data?.twitterLike) return true;
  if (data?.twitterRetweet) return true;
  return false;
};