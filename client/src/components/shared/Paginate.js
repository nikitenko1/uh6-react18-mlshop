import { ChevronLeftIcon, ChevronRightIcon } from "@heroicons/react/solid";
import { NavLink, useLocation } from "react-router-dom";
import { useSearchParams } from "../../hooks/useSearchParams";

const Paginate = ({ totalPage }) => {
  const arrayTotalPage = [];

  for (let i = 1; i <= totalPage; i++) {
    arrayTotalPage.push(i);
  }

  const location = useLocation();

  const searchParams = useSearchParams();

  return (
    <div
      className="bg-white px-4 py-3 flex items-center justify-between 
    border-t border-gray-200 sm:px-6 mt-5"
    >
      <div className="flex flex-1 items-center justify-center">
        <nav className="inline-flex rounded-md shadow-sm -space-x-px" aria-label="Pagination">
          <NavLink
            // http://localhost:3000/product/Phone?page=1
            to={`${location.pathname}?page=${
              +searchParams.get("page") > 1
                ? +searchParams.get("page") - 1
                : +searchParams.get("page")
            }`}
            className="inline-flex items-center px-2 py-2 rounded-l-md border border-gray-300
             bg-white text-sm font-medium text-gray-500 hover:bg-gray-50"
          >
            <span className="sr-only">Previous</span>
            <ChevronLeftIcon className="h-5 w-5" aria-hidden="true" />
          </NavLink>
          {arrayTotalPage.map((p) => (
            <NavLink
              to={`${location.pathname}?page=${p}`}
              className={`z-10 inline-flex ${
                p === +searchParams.get("page") ? "text-white bg-amber-400 " : ""
              } items-center px-4 py-2 text-sm font-medium border border-gray-300`}
              key={p}
            >
              {p}
            </NavLink>
          ))}
          <NavLink
            // http://localhost:3000/product/Phone?page=1
            to={`${location.pathname}?page=${
              +searchParams.get("page") < totalPage
                ? +searchParams.get("page") + 1
                : +searchParams.get("page")
            }`}
            className="relative inline-flex items-center px-2 py-2 rounded-r-md border border-gray-300
             bg-white text-sm font-medium text-gray-500 hover:bg-gray-50"
          >
            <span className="sr-only">Next</span>
            <ChevronRightIcon className="h-5 w-5" aria-hidden="true" />
          </NavLink>
        </nav>
      </div>
    </div>
  );
};

export default Paginate;
