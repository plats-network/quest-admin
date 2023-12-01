import axios from "axios";


export const instanceAxios = axios.create({
  baseURL: import.meta.env.VITE_BASE_URL,
  timeout: 30000
});

instanceAxios.interceptors.request.use(
  function (config) {
    document.body.classList.add("loading-indicator");
    const accessToken = localStorage.getItem("token");
    if (accessToken) {
      config.headers["Content-Type"] = "application/json";
      config.headers["Authorization"] = `Bearer ${accessToken}`;
    }
    return config;
  },
  function (error) {
    return Promise.reject(error);
  }
);

instanceAxios.interceptors.response.use(
  function (response) {
    document.body.classList.remove("loading-indicator");
    return response;
  },
  async function (error) {
    document.body.classList.remove("loading-indicator");
    // const originConfig = error.config;
    // if (
    //     error?.response?.status === 401 &&
    //     error.response.data.msg.detail === TOKEN_EXPIRED_MESSAGE &&
    //     !originConfig._retry
    // ) {
    //     originConfig._retry = true;
    //     try {
    //         window.refreshToken = window.refreshToken ? window.refreshToken : refreshAccessToken();
    //         await window.refreshToken;
    //         window.refreshToken = null;
    //         return instanceAxios(originConfig);
    //     } catch (error) {
    //         window.location.href = "/login";
    //         TokenService.removeToken();
    //         return Promise.reject(error);
    //     }
    // }
    // if (error?.response?.status === 401 && error.response.data.msg.detail === TWO_ACCOUNT_LOGIN) {
    //     window.location.href = "/login";
    //     TokenService.removeToken();
    //     return Promise.reject(error);
    // }
    return Promise.reject(error);
  }
);

export const hocApiPost = (url, body) => {
  return async () => {
    try {
      const res = await instanceAxios.post(url, body);
      return res;
    } catch (error) {
      throw new Error(error.message);
    }
  };
};