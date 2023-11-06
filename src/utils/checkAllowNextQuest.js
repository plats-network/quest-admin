export const checkAllowedNext = (activeTwitter, activeTemplate, follow, retweet, like, hashtag, urlHashtag, tokenHolder, transactionActivity) => {
    if (activeTwitter.Follow && !follow) return false;
    if (activeTwitter.Retweet && !retweet) return false;
    if (activeTwitter.Like && !like) return false;
    if (activeTwitter.Hashtag && !hashtag) return false;
    if (activeTwitter.Hashtag && !hashtag && !urlHashtag) return false;
    if (activeTemplate.TokenHolder && !tokenHolder.minimumAmount) return false;
    if (activeTemplate.TransactionActivity && !transactionActivity.minimumAmount) return false;
    return true;
}