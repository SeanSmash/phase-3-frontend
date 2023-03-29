import React, { useEffect, useState, useContext } from 'react';
import { CurrentUserContext } from './UserInfo';
import Popup from 'reactjs-popup';

function Login() {
    const [currentUser, setCurrentUser ] = useContext(CurrentUserContext)
    const [users, setUsers] = useState([])
    
    useEffect(() => {
        fetch("http://localhost:9292/user_profiles")
          .then((r) => r.json())
          .then((resp) => setUsers(resp));
      }, []);

    function isLoggedIn(){

    }

    function handleUsername(){}

    function handleUserSubmit(){}

    return ( 
        <p className="login">
          {currentUser}
          <Popup trigger=
          {<button>{isLoggedIn ? "Log out" : "Login"}</button>}
          modal nested>
            {close => (
              <>
              <form onSubmit={(e) => {
                handleUserSubmit(e)
                close()
              }}>
                <input type="text" value={currentUser} onChange={handleUsername}/>
                <input type="submit" value="Login" />
                <input type="submit" value="Create User" />
              </form>
              </>
            )}
          </Popup>
        </p>
    )

}

export default Login;