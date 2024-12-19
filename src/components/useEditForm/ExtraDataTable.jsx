import { useEditForm } from "../../lib/hooks/useEditForm";
import { FaEdit, } from "react-icons/fa";
import { MdDelete } from "react-icons/md";

const ExtraDataTable = () => {
    const {
        state,
        handlers : {
            handleEditExtraUser,
            handleRemoveExtraUser
        }
    } = useEditForm();


  return (
    <div className={` ${state.extraUsers.length > 0 ? 'flex' : 'hidden' } overflow-auto rounded-lg shadow mx-5 sm:w-[50%] mt-8 `}>
        <table className="w-full">
            <thead className="bg-primary text-light border-2 border-primary ">
            <tr>
                <th className="w-16 sm:w-20 px-1 sm:p-2 text-[12px] sm:text-[18px] font-light sm:font-semibold tracking-wide text-left">User</th>
                <th className="w-16 sm:w-20 px-1 sm:p-2 text-[12px] sm:text-[18px] font-light sm:font-semibold tracking-wide text-left">Date</th>
                <th className="w-16 sm:w-20 px-1 sm:p-2 text-[12px] sm:text-[18px] font-light sm:font-semibold tracking-wide text-left">Reciept no.</th>
                <th className="w-16 sm:w-20 px-1 sm:p-2 text-[12px] sm:text-[18px] font-light sm:font-semibold tracking-wide text-left">Recieved </th>
                <th className="w-16 sm:w-20 px-1 sm:p-2 text-[12px] sm:text-[18px] font-light sm:font-semibold tracking-wide text-left">Action </th>
            </tr>
            </thead>

            <tbody className="border-2 border-primary">
            {state.extraUsers.map((item, index) => (
                <tr key={item.id} className={`${index % 2 === 0 ? 'bg-dark' : 'bg-table1'}`}>
                <td className="sm:p-3 text-[12px] sm:text-xl text-gray-700 whitespace-nowrap">
                    <a href="#" className="font-light sm:font-medium text-secondary hover:underline">{item.name}</a>
                </td>
                <td className="sm:p-3 text-[12px] sm:text-xl text-gray-700 whitespace-nowrap">
                    <a href="#" className="font-light sm:font-medium text-secondary hover:underline">{item.date}</a>
                </td>
                <td className="sm:p-3 text-[12px] sm:text-xl text-gray-700 whitespace-nowrap">
                    <a href="#" className="font-light sm:font-medium text-secondary hover:underline">{item.relation}</a>
                </td>
                <td className="sm:p-3 text-[12px] sm:text-xl font-medium text-gray-700 whitespace-nowrap">
                    <a href="#" className="font-light sm:font-medium text-secondary hover:underline">{item.receivedAmount}</a>
                </td>
                <td className="sm:p-3 text-[12px] sm:text-xl font-medium text-gray-700 whitespace-nowrap flex gap-4">
                    <a href="#" className="font-light sm:font-medium text-secondary hover:underline" onClick={() => handleEditExtraUser(index)}><FaEdit /></a>
                    <a href="#" className="font-light sm:font-medium text-secondary hover:underline" onClick={() => handleRemoveExtraUser(index)}><MdDelete /></a>
                </td>

                </tr>
            ))} 
            </tbody>
        </table>
    </div>
  );
};

export default ExtraDataTable;
