import './App.css';
import { BrowserRouter, Routes, Route} from "react-router-dom";
import UserList from './components/UserList';
import UserForm from './components/UserForm';
import { useEffect, useState } from 'react';
import EditUserForm from './components/EditUserForm';
import ErrorMessage from './components/ErrorMessage';


function App() {
  const [users,setUsers]=useState([]);
  const [error, setError] = useState('');
  
  useEffect(()=>{
    fetchUsers();
  },[]);
  const fetchUsers=async()=>{
    try {
      const response = await fetch('https://jsonplaceholder.typicode.com/users').then((response)=>response.json());
      setUsers(response);
    } catch (error) {
      setError('Error fetching users');
    }
  }
  return (
    <div>
      <BrowserRouter>
      <Routes>
        {error && <ErrorMessage message={error} />}
        <Route path="/users" element={ <UserList users={users} setUsers={setUsers}/>}/>
        <Route path="/users/:userId" element={<EditUserForm users={users} setUsers={setUsers}/>}/>
        <Route exact path="/" element={<UserForm setUsers={setUsers}/>}/>
        </Routes>
        </BrowserRouter>
    </div>
   
  );
}

export default App;
