import axios from "axios";


export const instanceAxios = axios.create({
  baseURL: import.meta.env.VITE_BASE_URL,
  timeout: 30000
});

instanceAxios.interceptors.request.use(
  function (config) {
    // document.body.classList.add("loading-indicator");
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
    return response;
  },
  async function (error) {
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