import { routes } from "../routes";
import { instanceAxios } from "./api-connect-wallet";
import dayjs from 'dayjs'

const Network = {
    "Aleph Zero": "aleph",
    "Astar": "astar"
}
export const callApiCreate = async (valueSetup, valueQuest, valueReward, status, setValue) => {
    const tasks = [];
    if (valueQuest?.tokenHolder?.minimumAmount) {
        tasks.push({
            name: "Token Holder",
            block_chain_network:Network[valueQuest?.transactionActivity?.network],
            total_token: valueQuest?.tokenHolder?.minimumAmount,
            category_token: valueQuest?.tokenHolder?.categoryToken,
            status: "Active",
            entry_type: "TOKEN_HOLDERS"
        })
    }
    if (valueQuest?.transactionActivity?.minimumAmount) {
        tasks.push({
            name: "Token Holder",
            block_chain_network: Network[valueQuest?.transactionActivity?.network],
            total_token: valueQuest?.transactionActivity?.minimumAmount,
            category_token: valueQuest?.transactionActivity?.categoryToken,
            status: "Active",
            entry_type: "TRANSFER_ACTIVITY"
        })
    }
    if (valueQuest?.twitterFollow) {
        tasks.push({
            name: "Twitter Follow",
            entry_type: "TWITTER_FOLLOW",
            value: valueQuest?.twitterFollow,
            status : "Active"
        })
    }
    if (valueQuest?.twitterLike) {
        tasks.push({
            name: "Twitter Like",
            entry_type: "TWITTER_LIKE",
            value: valueQuest?.twitterLike,
            status : "Active"
        })
    }
    if (valueQuest?.twitterRetweet) {
        tasks.push({
            name: "Twitter Retweet",
            entry_type: "TWITTER_RETWEET",
            value: valueQuest?.twitterRetweet,
            status : "Active"
        })
    }
    if (valueQuest?.twitterHashtag) {
        tasks.push({
            name: "Twitter HashTag",
            entry_type: "TWITTER_HASHTAG",
            hash_tag: valueQuest?.twitterHashtag,
            value: valueQuest?.twitterHashtagUrl,
            status : "Active"
        })
    }
    const body = {
        name: valueSetup?.title,
        content: valueSetup?.description,
        start_at: dayjs(valueSetup?.startDate).format('YYYY-MM-DDTHH:mm:ss'),
        end_at: dayjs(valueSetup?.endDate).format('YYYY-MM-DDTHH:mm:ss'),
        thumbnail: valueSetup?.base64Thumbnail,
        reward_type: valueReward?.rewardType,
        block_chain_network: valueReward?.network,
        category_token: valueReward?.categoryToken,
        total_token: valueReward?.totalReward,
        total_person: valueReward?.numberWinner,
        status: status ? "Active" : "Draft",
        tasks
    }


        const res = await instanceAxios.post(routes.quest.createCampaign, body)
        return res;
}


export const callApiUpdate = async (id,valueSetup, valueQuest, valueReward, status) => {
    const tasks = [];
    if (valueQuest?.tokenHolder?.minimumAmount) {
        tasks.push({
            name: "Token Holder",
            block_chain_network: Network[valueQuest?.tokenHolder?.network],
            total_token: valueQuest?.tokenHolder?.minimumAmount,
            category_token: valueQuest?.tokenHolder?.categoryToken,
            status: "Active",
            entry_type: "TOKEN_HOLDERS"
        })
    }
    if (valueQuest?.transactionActivity?.minimumAmount) {
        tasks.push({
            name: "Token Holder",
            block_chain_network: Network[valueQuest?.transactionActivity?.network],
            total_token: valueQuest?.transactionActivity?.minimumAmount,
            category_token: valueQuest?.transactionActivity?.categoryToken,
            status: "Active",
            entry_type: "TRANSFER_ACTIVITY"
        })
    }
    if (valueQuest?.twitterFollow) {
        tasks.push({
            name: "Twitter Follow",
            entry_type: "TWITTER_FOLLOW",
            value: valueQuest?.twitterFollow,
            status : "Active"
        })
    }
    if (valueQuest?.twitterLike) {
        tasks.push({
            name: "Twitter Like",
            entry_type: "TWITTER_LIKE",
            value: valueQuest?.twitterLike,
            status : "Active"
        })
    }
    if (valueQuest?.twitterRetweet) {
        tasks.push({
            name: "Twitter Retweet",
            entry_type: "TWITTER_RETWEET",
            value: valueQuest?.twitterRetweet,
            status : "Active"
        })
    }
    if (valueQuest?.twitterHashtag) {
        tasks.push({
            name: "Twitter HashTag",
            entry_type: "TWITTER_HASHTAG",
            value: valueQuest?.twitterHashtag,
            status : "Active"
        })
    }
    const body = {
        name: valueSetup?.title,
        content: valueSetup?.description,
        start_at: dayjs(valueSetup?.startDate).format('YYYY-MM-DDTHH:mm:ss'),
        end_at: dayjs(valueSetup?.endDate).format('YYYY-MM-DDTHH:mm:ss'),
        thumbnail: valueSetup?.base64Thumbnail,
        reward_type: valueReward?.rewardType,
        block_chain_network: Network[valueReward?.network],
        category_token: valueReward?.categoryToken,
        total_token: valueReward?.totalReward,
        total_person: valueReward?.numberWinner,
        status: status ? "Active" : "Draft",
        tasks
    }

    const res = await instanceAxios.patch(routes.quest.updateDetailCampaign(id), body)
    return res;
}