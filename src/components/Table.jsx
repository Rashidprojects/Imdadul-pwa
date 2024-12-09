import { useEffect } from 'react';
import { TableData } from "../Datas/TableData";
import { usePagination } from '../lib/providers/PaginationContext';

const Table = () => {
  const { state, setTotalItems } = usePagination();
  const { currentPage, itemsPerPage } = state;

  // Effect to set the total number of items when data is available
  useEffect(() => {
    setTotalItems(TableData.length); // Assuming TableData is available and contains all items
  }, []);

  // Get the data for the current page
  const indexOfLastItem = currentPage * itemsPerPage;
  //   lastItem = 2 * 5 = 10
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  // firstItem = 10 - 5 = 5
  const currentData = TableData.slice(indexOfFirstItem, indexOfLastItem);
  // slice data => slice(5, 10) o/p => [6,7,8,9,10]

  return (
    <div className="overflow-auto rounded-lg shadow mx-5">
      <table className="w-full">
        <thead className="bg-primary text-light border-2 border-primary ">
          <tr>
            <th className="w-20 p-3 text-xl font-semibold tracking-wide text-left">No.</th>
            <th className="w-20 p-3 text-xl font-semibold tracking-wide text-left">House No.</th>
            <th className="w-20 p-3 text-xl font-semibold tracking-wide text-left">Area Code</th>
            <th className="w-24 p-3 text-xl font-semibold tracking-wide text-left">Name</th>
            <th className="w-24 p-3 text-xl font-semibold tracking-wide text-left">Place</th>
            <th className="w-24 p-3 text-xl font-semibold tracking-wide text-left">Total</th>
            <th className="w-24 p-3 text-xl font-semibold tracking-wide text-left">Received</th>
            <th className="w-32 p-3 text-xl font-semibold tracking-wide text-left">Pending</th>
          </tr>
        </thead>
        <tbody className="border-2 border-primary">
          {currentData.map((item) => (
            <tr key={item.id} className={`${item.id % 2 === 0 ? 'bg-dark' : 'bg-table1'}`}>
              <td className="p-3 text-xl text-gray-700 whitespace-nowrap">
                <a href="#" className="font-bold text-secondary hover:underline">{item.id}</a>
              </td>
              <td className="p-3 text-xl text-gray-700 whitespace-nowrap">
                <a href="#" className="font-bold text-secondary hover:underline">{item.houseNo}</a>
              </td>
              <td className="p-3 text-xl text-gray-700 whitespace-nowrap">
                <a href="#" className="font-bold text-secondary hover:underline">{item.areacode}</a>
              </td>
              <td className="p-3 text-xl text-gray-700 whitespace-nowrap">{item.name}</td>
              <td className="p-3 text-xl text-gray-700 whitespace-nowrap">{item.place}</td>
              <td className="p-3 text-xl text-gray-700 whitespace-nowrap">
                <span className="p-1.5 text-[18px] font-medium uppercase tracking-wider text-blue-800 rounded-lg bg-opacity-50">{item.total}</span>
              </td>
              <td className="p-3 text-xl text-gray-700 whitespace-nowrap">
                <span className="p-1.5 text-[18px] font-medium uppercase tracking-wider text-green-800 rounded-lg bg-opacity-50">{item.received}</span>
              </td>
              <td className="p-3 text-xl text-gray-700 whitespace-nowrap">
                <span className="p-1.5 text-[18px] font-medium uppercase tracking-wider text-red-800 rounded-lg bg-opacity-50">{item.total - item.received}</span>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Table;
