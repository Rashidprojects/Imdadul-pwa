import { useEffect, useState } from "react"
import { useUserContext } from "../providers/UserDataContext";

export const useFilteredUsers = (users, areaCode, currentPage, itemsPerPage) => {
    const [filteredUsers, setFilteredUsers] = useState([]);
    const { state, dispatch } = useUserContext()

    useEffect(() => {
        let filtered = users;

        // Filter by area code if provided
        if (areaCode) {
            filtered = users
                .filter((user) => user.areaCode === areaCode )
                .sort((a,b) => a.houseNumber - b.houseNumber)
        }

        setFilteredUsers(filtered)
        
    }, [users, areaCode])

    useEffect(() => {
        const indexOfLastItem = currentPage * itemsPerPage;
        const indexOfFirstItem = indexOfLastItem - itemsPerPage;
        const currentData = filteredUsers.slice(indexOfFirstItem, indexOfLastItem);
    
        dispatch({ type: 'CURRENT_DATA', payload: currentData });
        dispatch({ type: 'FILTER_DATA', payload: filteredUsers });

        console.log('filtered current data passed: ', currentData);
    }, [filteredUsers, currentPage, itemsPerPage, dispatch]);
    
    const totalAmount = filteredUsers.reduce((sum, user) => sum + user.subTotal , 0)
    const pendingAmount = filteredUsers.reduce((sum, user) => sum + user.pending , 0)
    const receivedAmount = totalAmount - pendingAmount

    return { filteredUsers, setFilteredUsers, totalAmount, pendingAmount, receivedAmount }
}


export const useAmountSummary = (filteredData = []) => {
    const total = filteredData.reduce((sum, user) => sum + user.subTotal, 0);
    const pending = filteredData.reduce((sum, user) => sum + user.pending, 0);
    const received = total - pending;

    console.log('Total:', total, 'Pending:', pending, 'Received:', received);

    return { total, pending, received };
};
