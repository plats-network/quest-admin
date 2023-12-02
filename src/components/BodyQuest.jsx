import { lazy, Suspense, useEffect, useState } from "react";
import Pagination from "./common/Panigation";
import { useQuery } from "@tanstack/react-query";
const Card = lazy(() => import("./Card"));
import { useSelector } from "react-redux";
import { getCampaigns } from "../services/getCampaigns";
import CardSkeleton from "./CardSkeleton";

const NUMBER_ITEM_PAGE = 4;

function BodyQuest() {
  const { token } = useSelector((state) => state.stateCampaign);

  const { data, isLoading } = useQuery({
    queryKey: ["listCampaign", token],
    queryFn: () => getCampaigns(token),
    refetchOnWindowFocus: false,
    staleTime: 1000 * 10
  });

  const [currentPage, setCurrentPage] = useState(1);
  const [totalPage, setTotalPage] = useState();
  const [currentData, setCurrentData] = useState([]);

  useEffect(() => {
    if (data?.length) {
      handlePages();
    }
  }, [data, currentPage]);

  const handlePages = () => {
    const total = Math.ceil(data?.length / NUMBER_ITEM_PAGE);
    const indexOfLastItem = currentPage * NUMBER_ITEM_PAGE;
    const indexOfFirstItem = indexOfLastItem - NUMBER_ITEM_PAGE;
    const currentData = data?.slice(indexOfFirstItem, indexOfLastItem);
    setCurrentData(currentData);
    setTotalPage(total);
  };

  if (isLoading) {
    return (
      <div className="container overflow-hidden">
        <h1 className="px-2 text-white border-b-2 border-[#0E21A0] mb-12 pb-2 title">Campaign</h1>
        <div className="px-2 grid grid-cols-1 md:grid-cols-4 gap-4 justify-center items-center max-w-[300px] md:max-w-max mx-auto">
          {Array(4)
            .fill(0)
            .map(() => (
              <CardSkeleton key={crypto.randomUUID()} />
            ))}
        </div>
      </div>
    );
  }

  return (
    <div className="container overflow-hidden">
      <h1 className="px-2 text-white border-b-2 border-[#0E21A0] mb-12 pb-2 title">Campaign</h1>
      {currentData?.length > 0 ? (
        <Suspense fallback={<div className="loading-indicator flex items-center justify-center"></div>}>
          <div className="px-2 grid grid-cols-1 md:grid-cols-4 gap-4 justify-center items-center max-w-[300px] md:max-w-max mx-auto">
            {currentData?.map((item, index) => {
              return <Card {...item} key={index} />;
            })}
          </div>
        </Suspense>
      ) : (
        <h1 className="text-white text-center text-[40px]">Empty Campaign</h1>
      )}

      <div className="mt-12 mb-4">
        {currentData?.length > 0 && (
          <Pagination pages={totalPage} setCurrentPage={setCurrentPage} currentPage={currentPage} />
        )}
      </div>
    </div>
  );
}

export default BodyQuest;
