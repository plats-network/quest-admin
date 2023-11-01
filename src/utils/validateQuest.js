import { notifyError } from "./toastify";

const regexX = /^https:\/\/x\.com\//;
const regexTwitter = /^https:\/\/twitter\.com\//;
const regexHashtag = /^#(\w+)$/;

// export const validateQuest = (follow, retweet, like, hash_tag,urlHashtag) => {
//     if ((regexTwitter.test(follow) || regexX.test(follow)) && (regexTwitter.test(retweet) || regexX.test(retweet)) && (regexTwitter.test(like) || regexX.test(like)) && (regexTwitter.test(urlHashtag) || regexX.test(urlHashtag))) {
//         if (regexHashtag.test(hash_tag)) {
//             return true;
//         } else {
//         notifyError("Please enter the correct twitter hashtag with #")
//         }
//     } else {
//         notifyError("Please enter the correct twitter field format")
//         return false;
//     }

// }

export const checkRegexTwitter = (data) => {
    if (regexTwitter.test(data) || regexX.test(data)){
        return true;
    }
    return false;
}

export const validateTaskQuest = (activeTwitter, follow, retweet, like, urlHashtag, hashtag ) => {
    if (activeTwitter?.Follow && !checkRegexTwitter(follow)) {
        notifyError("Please enter the correct twitter follow field format")
        return false;
    }

    if (activeTwitter?.Retweet && !checkRegexTwitter(retweet)) {
        notifyError("Please enter the correct twitter retweet field format")
        return false;
    }

    if (activeTwitter?.Like && !checkRegexTwitter(like)) {
        notifyError("Please enter the correct twitter like field format")
        return false;
    }

    if (activeTwitter?.Hashtag && !regexHashtag.test(hashtag)) {
        notifyError("Please enter the correct twitter hashtag format with #")
        return false;
    }

    if (activeTwitter?.Hashtag && !checkRegexTwitter(urlHashtag)) {
        notifyError("Please enter the correct twitter hashtag url field format")
        return false;
    }
    return true;
}