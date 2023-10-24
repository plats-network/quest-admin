export const routes = {
    authentication: {
        walletRegister: "/api/wallet-register",
        walletLogin: "/api/wallet-login"
    },
    quest: {
        getCollection: "/api/campains",
        createCampaign: "/api/campains",
        getDetailCampaign: (id) =>  `/api/campains/${id}`,
        updateDetailCampaign: (id) =>  `/api/campains/${id}`
    }
}