import { notifyError } from "./toastify";

const regexX = /^https:\/\/x\.com\//;
const regexTwitter = /^https:\/\/twitter\.com\//;
const regexHashtag = /^#(\w+)$/;

export const validateQuest = (follow, retweet, like, hash_tag,urlHashtag) => {
    if ((regexTwitter.test(follow) || regexX.test(follow)) && (regexTwitter.test(retweet) || regexX.test(retweet)) && (regexTwitter.test(like) || regexX.test(like)) && (regexTwitter.test(urlHashtag) || regexX.test(urlHashtag))) {
        if (regexHashtag.test(hash_tag)) {
            return true;
        } else {
        notifyError("Please enter the correct twitter hashtag with #")
        }
    } else {
        notifyError("Please enter the correct twitter field format")
        return false;
    }

}

