import { useEffect, useState } from "react"
import { useUserContext } from "../providers/UserDataContext";

export const useFilteredUsers = (users, areaCode, currentPage, itemsPerPage) => {
    const [filteredUsers, setFilteredUsers] = useState([]);
    const { dispatch } = useUserContext()


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
        console.log('filtered current data passed: ', currentData);
    }, [filteredUsers, currentPage, itemsPerPage, dispatch]);
    

    

    return { filteredUsers, setFilteredUsers }
}
