import ReactPaginate from "react-paginate";

const Pagination = ({ pageCount, onPageChange }) => {
  return (
    <ReactPaginate
      breakLabel="..."
      nextLabel="Nākamā >"
      previousLabel="< Iepriekšējā"
      onPageChange={onPageChange}
      pageRangeDisplayed={5}
      pageCount={pageCount}
      containerClassName="flex justify-center space-x-2 mt-4"
      pageClassName="px-3 py-1 border rounded"
      activeClassName="bg-blue-500 text-white"
      previousClassName="px-3 py-1 border rounded"
      nextClassName="px-3 py-1 border rounded"
      disabledClassName="text-gray-400"
    />
  );
};

export default Pagination;