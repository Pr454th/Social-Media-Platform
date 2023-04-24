import React from "react";
import ReactPaginate from "react-paginate";

export default function Paginate(props) {
  return (
    <ReactPaginate
      pageCount={props.pageCount}
      pageRangeDisplayed={props.pageCount}
      marginPagesDisplayed={1}
      onPageChange={props.handlePageChange}
      previousLabel={"<"}
      nextLabel={">"}
      breakLabel={"..."}
      containerClassName={"flex mb-4 content-evenly"}
      previousClassName={"px-4 py-2 rounded-lg mr-4 border border-gray-300"}
      nextClassName={"px-4 py-2 rounded-lg ml-4 border border-gray-300"}
      breakClassName={"px-4 py-2 rounded-md border border-gray-300"}
      pageClassName={
        "flex items-center justify-center my-auto mx-2 w-8 h-8 rounded-full hover:bg-gray-800"
      }
      pageLinkClassName={"text-white"}
      activeLinkClassName={"text-white"}
      activeClassName={"bg-rose-500"}
      disabledClassName={"opacity-50 cursor-not-allowed"}
    />
  );
}
