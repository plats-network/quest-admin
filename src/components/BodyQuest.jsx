import { routes } from "../routes";
import useGetApi from "../utils/hooks/useGetApi";
import { lazy, Suspense, useEffect, useState } from "react";
import Pagination from "./common/Panigation";
const Card = lazy(() => import("./Card"));

const NUMBER_ITEM_PAGE = 4;

function BodyQuest() {
  const res = useGetApi(routes.quest.getCollection);
  const data = res?.data;
  // const data = "";
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPage, setTotalPage] = useState();
  const [currentData, setCurrentData] = useState([]);

  useEffect(() => {
    handlePages();
  }, [data, currentPage]);

  const handlePages = () => {
    const total = Math.ceil(data?.length / NUMBER_ITEM_PAGE);
    const indexOfLastItem = currentPage * NUMBER_ITEM_PAGE;
    const indexOfFirstItem = indexOfLastItem - NUMBER_ITEM_PAGE;
    const currentData = data?.slice(indexOfFirstItem, indexOfLastItem);
    setCurrentData(currentData);
    setTotalPage(total);
  };

  return (
    <div className="container overflow-hidden">
      <h1 className="px-2 text-[20px] md:text-[30px] text-white border-b-2 border-[#0E21A0] mb-12 pb-2">Campaign</h1>
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
