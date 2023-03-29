import './App.css';
import React, { useEffect, useState, useContext } from "react";
import Popup from 'reactjs-popup';
import ExerciseList from "./ExerciseList";
import PersonalRecords from "./PersonalRecords";
import { CurrentUserContext } from './UserInfo'; 

function App() {
  const [exercises, setExercises] = useState([]);
  const [isLoggedIn, setIsLoggedIn] = useState(false)
  const [currentUser, setCurrentUser ] = useContext(CurrentUserContext)
  const [users, setUsers] = useState([])
  const [username, setUsername] = useState()
  //const [search, setSearch] = useState("");

  useEffect(() => {
    fetch("http://localhost:9292/exercises")
      .then((r) => r.json())
      .then((exercises) => setExercises(exercises));
    fetch("http://localhost:9292/user_profiles")
      .then((r) => r.json())
      .then((resp) => setUsers(resp));
  }, []);

  function onLogin(){
    if (isLoggedIn) {
      setIsLoggedIn(false)
    } else {
      setIsLoggedIn(true)
    }
  }

  function handleUsername(e){
    e.preventDefault()
    setUsername(e.target.value)
    //console.log(username)
  }

  function handleUserSubmit(e){
    e.preventDefault()
    const userCheck = users.find(user => user.user_name === username)
    if (Array.isArray(userCheck)) {
      console.log("submit")
    } else {
      console.log("alert")
    }
  }

  return (
    <main>
      <header>
      <h1 className='title'>Personal Record Tracker</h1>
        <p>
          {currentUser.user_name}
          <Popup trigger=
          {<button>{isLoggedIn ? "Log out" : "Login"}</button>}
          modal nested>
            {close => (
              <>
              <form onSubmit={(e) => {
                handleUserSubmit(e)
                close()
              }}>
                <input type="text" value={username} onChange={handleUsername}/>
                <input type="submit" value="Login" />
                <input type="submit" value="Create User" />
              </form>
              </>
            )}
          </Popup>
        </p>
      </header>
      <ExerciseList />
      <h2>Personal Records</h2>
      <PersonalRecords currentUser={currentUser}/>
    </main>
  );
}

export default App;
