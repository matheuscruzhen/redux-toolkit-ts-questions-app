import React from "react";
import ReactPaginate from "react-paginate";
import { MdNavigateBefore, MdNavigateNext } from "react-icons/md";

interface Props {
  rows: number;
  pageCount: number;
  rowsPerPage: number;
  setRowsPerPage: React.Dispatch<React.SetStateAction<number>>;
  pageNumber: number;
  handlePageClick: (page: { selected: number }) => void;
}

const index: React.FC<Props> = ({
  handlePageClick,
  pageCount,
  pageNumber,
  rows,
  rowsPerPage,
  setRowsPerPage,
}: Props) => {
  function displayRows() {
    return (
      <p className="mx-4">
        <span>{rowsPerPage * pageNumber + 1}</span>-
        <span>
          {pageNumber === 0
            ? rowsPerPage
            : rowsPerPage * pageNumber + rowsPerPage > rows
            ? rows
            : rowsPerPage * pageNumber + rowsPerPage}
        </span>
        <span> de </span>
        {rows}
      </p>
    );
  }

  return (
    <div className="mt-4 flex flex-row w-full justify-end">
      <span className="h-full flex flex-row">
        <span>
          <select
            value={rowsPerPage}
            className="text-black rounded"
            onChange={(e) => setRowsPerPage(+e.target.value)}
          >
            <option value={5}>5</option>
            <option value={10}>10</option>
            <option value={15}>15</option>
          </select>
        </span>
        <span>{displayRows()}</span>
      </span>
      <ReactPaginate
        className="flex flex-row h-full  justify-center content-center"
        previousLabel={<MdNavigateBefore size={"1.2rem"} />}
        nextLabel={<MdNavigateNext size={"1.2rem"} />}
        breakLabel={"..."}
        pageRangeDisplayed={2}
        pageCount={pageCount}
        onPageChange={handlePageClick}
        containerClassName={"bg-slate-500"}
        previousClassName={"previousBtn"}
        nextClassName={"nextBtn"}
        pageClassName={"mx-2"}
        disabledClassName={"disabledBtn"}
        activeClassName={"activeBtn"}
        pageLinkClassName={"linkBtn"}
      />
    </div>
  );
};

export default index;
