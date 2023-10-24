export const checkLogin = () => {
    return localStorage?.getItem("token") ? true : false
}