import React, { useState } from 'react'
import "./userlist.css"
import axios from "axios"
import { useNavigate } from 'react-router-dom'

function UserList({users,setUsers}) {
    const navigate=useNavigate()
    const itemsPerPage = 5; 
    const [currentPage, setCurrentPage] = useState(1);

    const handleDelete=async(id)=>{
        try {
            await axios.delete(`https://jsonplaceholder.typicode.com/users/${id}`);
            setUsers((prev) => prev.filter((user) => user.id !== id));
            alert("User Deleted Successfully");
        } catch (error) {
            console.log("Error")
        }
    }

    const indexOfLastUser = currentPage * itemsPerPage;
    const indexOfFirstUser = indexOfLastUser - itemsPerPage;
    const currentUsers = users.slice(indexOfFirstUser, indexOfLastUser);

    const paginate = (pageNumber) => setCurrentPage(pageNumber);

  return (
    <div className="user-list">
    <h2 className='heading'>UserList</h2>
    <table>
      <thead>
        <tr>
          <th>User ID</th>
          <th>First Name</th>
          <th>Last Name</th>
          <th>Email</th>
          <th>Department</th>
          <th>Actions</th>
        </tr>
      </thead>
      <tbody>
        {currentUsers.map((user, ind) => {
          const name = user.name.split(" ");
          return (
            <tr key={ind}>
              <td>{user.id}</td>
              <td>{name[0]}</td>
              <td>{name[1]}</td>
              <td>{user.email}</td>
              <td>{user.company.name}</td>
              <td>
                <button className="edit-button" onClick={()=>navigate(`/users/${user.id}`)}>Edit</button>
                <button className="delete-button" onClick={() => handleDelete(user.id)}>Delete</button>
              </td>
            </tr>
          );
        })}
      </tbody>
    </table>
    <div>
      <p>Add new User:</p>
      <button className="add-button" onClick={()=>navigate("/")}>Add</button>
    </div>
    <div className="pagination">
      <p>Pages:</p>
                {Array.from({ length: Math.ceil(users.length / itemsPerPage) }, (_, i) => (
                    <button key={i} onClick={() => paginate(i + 1)}>{i + 1}</button>
                ))}
            </div>
  </div>
  )
}

export default UserList;