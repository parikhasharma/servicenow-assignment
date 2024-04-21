import React, { useState } from 'react';
import axios from 'axios';
import "./userform.css"
import { useNavigate } from 'react-router-dom';


const UserForm = ({setUsers}) => {
    const navigate=useNavigate();
    const [data, setData] = useState({
      id:"",
      name:"",
      email:"",
      company:{
          name:"",
      }
  });
    

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
      await axios.post('https://jsonplaceholder.typicode.com/users', data);
      alert("New User added")
      setUsers((prev)=>[...prev,data])
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
    <h2 className='heading'>Add User</h2>
    <form onSubmit={handleSubmit}>
      <label>User Id</label> 
      <input type="number" placeholder="User Id" name="id" value={data.id} onChange={handleChange} className="input-field"/>
      
      <label>Name</label> 
      <input type="text" placeholder="Name" name="name" value={data.name} onChange={handleChange} className="input-field"/>
      
      <label>Email</label> 
      <input type="email" placeholder="Email" name="email" value={data.email} onChange={handleChange} className="input-field"/>
      
      <label>Department</label> 
      <input type="text" placeholder="Department" name="company" value={data.company.name} onChange={handleChange} className="input-field"/>
      
      <button type="submit" className="submit-button">Add User</button>
    </form>
    <div>
        <p>Navigate to User List:</p>
        <button className='userlist-btn' onClick={()=>navigate("/users")}>User List</button>
    </div>
  </div>
  );
};

export default UserForm;