import './App.css';
import React, { useContext, useEffect, useState } from "react";
import { Routes, Route, NavLink } from "react-router-dom";
import Login from "./Login";
import LoginPage from './LoginPage';
import PersonalRecords from './PersonalRecords';
import NewUser from './NewUser';
import { CurrentUserContext } from './UserInfo';
import EditProfile from './EditProfile';

function App() {
  const [currentUser, setCurrentUser ] = useContext(CurrentUserContext)
  const [users, setUsers] = useState([])
  const [isLoggedIn, setIsLoggedIn] = useState(false)

  useEffect(() => {
    fetch("http://localhost:9292/user_profiles")
      .then((r) => r.json())
      .then((resp) => {
        setUsers(resp)
      })
  }, []);

  function handleLogin(user){
    setCurrentUser(user)
    setIsLoggedIn(true)
  }
  
  function handleLogout(){
    setCurrentUser([])
    setIsLoggedIn(false)
  }

  return (
    <main>
      <header>
      <h1 className='title'>Personal Record Tracker</h1>
      </header>
      <Login isLoggedIn={isLoggedIn} onLogout={handleLogout}/>
      <Routes>
        <Route path="/edit_profile" element={<EditProfile />} />
        <Route path="/login" element={<LoginPage users={users} onLogin={handleLogin}/>} />
        <Route path="/new_user" element={<NewUser onLogin={handleLogin} users={users}/>} />
        <Route path="/" element={<PersonalRecords isLoggedIn={isLoggedIn}/>} />
        <Route path="*" element={<h1>404 not found</h1>} />
      </Routes>
    </main>
  );
}

export default App;