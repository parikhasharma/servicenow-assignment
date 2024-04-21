import React, { useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom';
import axios from "axios";

function EditUserForm({users,setUsers}) {
    const {userId}=useParams();
    const navigate=useNavigate();
    const customData=users.filter((user)=>user.id==userId);
    const [data, setData] = useState(customData.length > 0 ? customData[0] : null);

  const handleChange = (e) => {
    const { name, value } = e.target;
    name!=="company"? setData((prevData) => ({
      ...prevData,
      [name]: value,
    }))
    : setData((prevData) => ({
        ...prevData,
        company: {
          ...prevData.company,
          name: value 
        }
      }))
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.put(`https://jsonplaceholder.typicode.com/users/${userId}`, data);
      alert("User updated successfully")
      setUsers((prev)=>[...prev,data]);
      setData({
        id: "",
        name: "",
        email: "",
        company: {
          name: ""
        }
      });
    } catch (error) {
      console.log(error)
    }
  }

  return (
    <div className='form-data'>
    <h2 className='heading'>Edit User</h2>
    <form onSubmit={handleSubmit}>
      <label>User Id</label> 
      <input type="number" placeholder="User Id" name="id" value={data?.id} onChange={handleChange} className="input-field"/>
      
      <label>Name</label> 
      <input type="text" placeholder="Name" name="name" value={data?.name} onChange={handleChange} className="input-field"/>
      
      <label>Email</label> 
      <input type="email" placeholder="Email" name="email" value={data?.email} onChange={handleChange} className="input-field"/>
      
      <label>Department</label> 
      <input type="text" placeholder="Department" name="company" value={data?.company?.name} onChange={handleChange} className="input-field"/>
      
      <button type="submit" className="submit-button">Add User</button>
    </form>
    <div>
        <p>Navigate to User List:</p>
        <button className='userlist-btn' onClick={()=>navigate("/users")}>User List</button>
    </div>
  </div>
  )
}

export default EditUserForm