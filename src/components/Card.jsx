import { Link } from "react-router-dom";

function Card({ featured_image, name, content, id, status }) {
  return (
    <Link to={`detail/${id}`} className="max-w-[300px]">
      <div className="bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700">
        <div className="shadow-lg">
          <img className="rounded-t-lg object-cover h-[200px] mx-auto" src={featured_image} alt="" />
        </div>
        <div className="p-5 relative">
          <div>
            <h5 className="mb-2  text-[18px] md:text-2xl font-bold tracking-tight text-gray-900 dark:text-white truncate">
              {name}
            </h5>
          </div>
          <p className="mb-5 font-normal text-gray-700 dark:text-gray-400 h-[50px] md:h-[100px] overflow-hidden truncate-text">
            {content}
          </p>
          <div
            style={{
              backgroundColor: status === "Draft" ? "#BB2525" : "#54B435",
            }}
            className="absolute bottom-2 right-2 px-5 py-1 rounded-full text-white"
          >
            {status}
          </div>
        </div>
      </div>
    </Link>
  );
}

export default Card;
