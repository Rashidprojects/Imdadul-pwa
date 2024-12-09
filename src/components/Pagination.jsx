import { usePagination } from "../lib/providers/PaginationContext";

const Pagination = () => {

  const { state, setPage, setItemsPerPage } = usePagination();
  const { totalItems, itemsPerPage, currentPage } = state;

  const totalPages = Math.ceil(totalItems / itemsPerPage);  

  // Handle previous and next page buttons
  const handlePrev = () => {
    if (currentPage > 1) setPage(currentPage - 1);
  };

  const handleNext = () => {
    if (currentPage < totalPages) setPage(currentPage + 1);
  };

  const handlePageClick = (page) => {
    setPage(page);
  };

  const handleItemsPerPageChange = (event) => {
    setItemsPerPage(Number(event.target.value));
  };

  return (
    <div className="flex items-center flex-col sm:flex-row justify-between p-4 gap-3">

      <div className="flex items-center gap-3">
        <button onClick={handlePrev} className="sm:py-1 px-2 sm:px-3 bg-dark text-primary border sm:border-2 border-secondary cursor-pointer sm:text-[18px] rounded-md sm:rounded-lg" disabled={currentPage === 1}>
          Prev
        </button>

        {/* Display page numbers */}
        <div className="flex gap-2">
          {Array.from({ length: totalPages }, (_, index) => index + 1).reduce((acc, page) => {
            // If there are more than 3 pages, apply custom logic
            if (totalPages > 3) {
              // Always include the first 2 pages
              if (page <= 2) {
                acc.push(page);
              }
              // Add ellipsis if we're at the boundary
              else if (page === 4) {
                acc.push('...');
              }
              // Always include the last 2 pages
              else if (page > totalPages - 2) {
                acc.push(page);
              }
            } else {
              // If totalPages <= 3, include all pages
              acc.push(page);
            }
            return acc;
          }, []).map((item, idx) => (
            <span
              key={idx} // Use idx as a fallback key for ellipsis
              onClick={() => typeof item === 'number' && handlePageClick(item)} // Only clickable if it's a number
              className={`cursor-pointer  sm:py-1 px-2 sm:px-3 sm:text-[16px] rounded-sm sm:rounded-md border sm:border-2 border-secondary ${
                currentPage === item ? "bg-secondary  text-light " : "bg-dark text-primary"
              } ${item === '...' ? 'cursor-default' : ''}`} 
            >
              {item}
            </span>
          ))}
        </div>


        <button onClick={handleNext} className="sm:py-1 px-2 sm:px-3 bg-dark text-primary border sm:border-2 border-secondary cursor-pointer sm:text-[18px] rounded-md sm:rounded-lg" disabled={currentPage === totalPages}>
          Next
        </button>
      </div>

      <div className="gap-2 flex sm:justify-center">
        <p className="text-secondary text-[16px] sm:text-[20px] ">Per Page</p>
        <select onChange={handleItemsPerPageChange} value={itemsPerPage} className=" border sm:border-2 rounded-md pl-1 text-primary sm:text-[20px] border-primary">
          <option value={5}>5</option>
          <option value={10}>10</option>
          <option value={15}>15</option>
          <option value={20}>20</option>
        </select>
      </div>
    </div>
  );
};

export default Pagination;
