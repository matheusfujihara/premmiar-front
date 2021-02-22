import React, { useState, useEffect } from "react";
import './App.css';
import Axios from 'axios';


function App() {

  const [ name, setName ] = useState('');
  const [ username, setUsername ] = useState('');
  const [ password, setPassword ] = useState('');
  const [ userList, setUserList ] = useState([]);
  const [ newName, setNewName ] = useState('');
  const [ newEmail, setNewEmail ] = useState('');

  useEffect(() => {
    Axios
      .get("http://localhost:8080/user")
      .then((response) => {
        setUserList(response.data.users);
      });
  }, []);

  const submitUser = () => {
    Axios.post("http://localhost:8080/user", {
      name: name,
      email: username,
      password: password
    });

    setUserList([
      ...userList,
      { name: name, email: username }
    ]);
  };

  const deleteUser = (userEmail) => {
    Axios.delete(`http://localhost:8080/user/${userEmail}`)
  }

  const updateUser = (userName, userEmail) => {
    Axios.put(`http://localhost:8080/user/${userEmail}`, {
      name: newName? newName : userName,
      email: newEmail? newEmail : userEmail
    });
    setNewName("");
    setNewEmail("");
  }

  return (
    <div className="App">
      <h1>CRUD User</h1>
    
      <div className="form">

        <label>Name:</label>
        <input type="text" name="name" onChange={(e) => {
          setName(e.target.value)
        }} />

        <label>Username:</label>
        <input type="text" name="username" onChange={(e) => {
          setUsername(e.target.value)
        }} />

        <label>Password:</label>
        <input type="text" name="password" onChange={(e) => {
          setPassword(e.target.value)
        }} />

        <div className="button-div">
          <button className="button" onClick={ submitUser }>Submit</button>
        </div>

        { userList.map((item) => {
          return (
            <div className="card-user">
              <h1>{ item.name }</h1>
              <p>{ item.email }</p>

              <button onClick={() => {
                deleteUser(item.email)
              }}>Delete</button>

              <input type="text" id="update-insert" onChange={(e) => {
                setNewName(e.target.value)
              }} placeholder="New Name..." />

              <input type="text" id="update-insert" onChange={(e) => {
                setNewEmail(e.target.value)
              }} placeholder="New Email..." />
              <button onClick={() => {updateUser(item.name, item.email)}}>Update</button>
            </div>
          )
        })}

      </div>

    </div>
    
  );
}

export default App;
