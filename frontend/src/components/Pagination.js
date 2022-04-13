import React from "react";
import _ from "lodash";

const Pagination = (props) => {
  const range = (start, end) => {
    let length = end - start + 1;
    /*
  	Create an array of certain length and set the elements within it from
    start value to end value.
  */
    return Array.from({ length }, (_, idx) => idx + start);
  };
  const { itemsCount, pageSize, onNext,onPrevious, currentPage } = props;

  const pagesCount = Math.ceil(itemsCount / pageSize);

  if (pagesCount === 1) return null;

  const pages = range(1, pagesCount + 1);

  return (
    <div className="px-5 py-5 bg-white border-t flex flex-col xs:flex-row items-center xs:justify-between          ">
      <span className="text-xs xs:text-sm text-gray-900">
        Showing 1 to 4 of 50 Entries
      </span>
      <div className="inline-flex mt-2 xs:mt-0">
        <button
          onClick={onPrevious}
          className="text-sm bg-gray-300 hover:bg-gray-400 text-gray-800 font-semibold py-2 px-4 rounded-l"
        >
          Prev
        </button>
        <button
          onClick={onNext}
          className="text-sm bg-gray-300 hover:bg-gray-400 text-gray-800 font-semibold py-2 px-4 rounded-r"
        >
          Next
        </button>
      </div>
    </div>
  );
};

export default Pagination;
