import './App.css';
import React, { useContext } from "react";
import Login from "./Login";
import PersonalRecords from './PersonalRecords';
import { CurrentUserContext } from './UserInfo';

function App() {
  const [currentUser, setCurrentUser ] = useContext(CurrentUserContext)
 

  function isLoggedIn(){
    if (currentUser.length !== 0){
      return(
        <PersonalRecords />
      )
    }
  }
  
  return (
    <main>
      <header>
      <h1 className='title'>Personal Record Tracker</h1>
      </header>
      <Login />
      {isLoggedIn()}
    </main>
  );
}

export default App;