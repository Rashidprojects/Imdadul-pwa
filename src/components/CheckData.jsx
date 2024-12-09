import { useEffect, useState } from 'react';
import { useForm } from '../lib/providers/FormContext';
import { useUserData } from '../lib/providers/UserDataContext';
import { useNavigate } from 'react-router-dom';

const CheckData = ({ isArea }) => {
 
  const { state: formState } = useForm(); // Form state
  const { state: userState, fetchUsers, setEditingUser, deleteUser } = useUserData(); // User data context
  const navigate = useNavigate();

  const [filteredUsers, setFilteredUsers] = useState([]);

  const filterByArea = (areaCode) => {
    const filtered = userState.users             
            .filter((user) => user.areaCode == areaCode)            
            .sort((a,b) => a.houseNumber - b.houseNumber)
        setFilteredUsers(filtered)
  }

  useEffect(() => {
    // Trigger fetchUsers when `formState` changes
    fetchUsers();
    filterByArea(isArea)

  }, [formState, isArea]); // Dependencies to monitor (adjust based on your requirement)

  if (userState.loading) return <p>Loading...</p>;
  if (userState.error) return <p style={{ color: 'red' }}>{userState.error}</p>;



  return (
    <div>
      <h2>Submitted Data</h2>
      {userState.users.length === 0 ? (
        <p>No data found.</p>
      ) : (
        <>
        <table border="1">
          <thead>
            <tr>
              <th>SI No</th>
              <th>Username</th>
              <th>House Number</th>
              <th>Area Code</th>
              <th>Address</th>
              <th>Mobile</th>
              <th>Total Amount</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {userState.users.map((user) => (
              <tr key={user.id}>
                <td>{user?.siNo}</td> {/* Display serial number */}
                <td>{user?.username}</td>
                <td>{user?.houseNumber}</td>
                <td>{user?.areaCode }</td>
                <td>{user?.address? user.address : '-'}</td>
                <td>{user.mobile ? user.mobile : '-'}</td>
                <td>{user.totalAmount}</td>
                <td>
                  <button
                    onClick={() => {
                      setEditingUser(user); // Set the selected user in the context
                      navigate('/edit'); // Navigate to the edit page
                    }}
                  >
                    Edit
                  </button>
                  <button onClick={() => deleteUser(user.id)}>Delete</button>
                </td>
              </tr>
              
            ))}
          </tbody>
        </table>


        <span>Filtered Table</span>

        <div>
            <button onClick={() => setFilteredUsers(userState.users)}>All Users</button>
            {/* <button onClick={() => filterByArea("A1")}>Area A1</button>
            <button onClick={() => filterByArea("A2")}>Area A2</button> */}
            {/* Add more buttons for other areas */}
        </div>

        <table border="1">
          <thead>
            <tr>
              <th>SI No</th>
              <th>Username</th>
              <th>House Number</th>
              <th>Area Code</th>
              <th>Address</th>
              <th>Mobile</th>
              <th>Total Amount</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {filteredUsers.map((user, index) => (
              <tr key={user.id}>
                <td>{user?.siNo}</td> {/* Display serial number */}
                <td>{user?.username}</td>
                <td>{user?.houseNumber}</td>
                <td>{user?.areaCode}</td>
                <td>{user?.address}</td>
                <td>{user.mobile}</td>
                <td>{user.totalAmount}</td>
                <td>
                  <button
                    onClick={() => {
                      setEditingUser(user); // Set the selected user in the context
                      navigate('/edit'); // Navigate to the edit page
                    }}
                  >
                    Edit
                  </button>
                  <br />
                  <button onClick={() => deleteUser(user.id)}>Delete</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        </>
      )}
    </div>
  );
};

export default CheckData;
