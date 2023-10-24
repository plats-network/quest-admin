import React, { useEffect, useState } from "react";
import { useSalter } from "useink";
import { instanceAxios } from "../../services/api-connect-wallet";

function useGetApi(url, body) {
  const [data, setData] = useState();

  useEffect(() => {
    const fetch = async () => {
      try {
        const res = await instanceAxios.get(url, body);
        setData(res.data);
      } catch (error) {
        throw new Error(error.message);
      }
    };
    fetch();
  }, [data?.length]);

  return data;
}

export default useGetApi;
