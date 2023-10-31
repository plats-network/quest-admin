import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { instanceAxios } from "../../services/api-connect-wallet";

function useGetApi(url, body) {
  const [data, setData] = useState();
  const { token } = useSelector((state) => state.stateCampaign);

  useEffect(() => {
    const fetch = async () => {
      try {
        instanceAxios.defaults.headers["Authorization"] = token;
        const res = await instanceAxios.get(url, body);
        setData(res.data);
      } catch (error) {
        throw new Error(error.message);
      }
    };
    fetch();
  }, [token]);

  return data;
}

export default useGetApi;
