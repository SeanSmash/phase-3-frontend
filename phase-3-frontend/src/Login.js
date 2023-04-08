import React, { useEffect, useState, useContext } from 'react';
import { CurrentUserContext } from './UserInfo';

function Login() {
    const [currentUser, setCurrentUser ] = useContext(CurrentUserContext)
    const [username, setUsername] = useState("")
    const [users, setUsers] = useState([])
    
    useEffect(() => {
        fetch("http://localhost:9292/user_profiles")
          .then((r) => r.json())
          .then((resp) => {
            setUsers(resp)
            setCurrentUser(resp[1])})
      }, []);

    function handleUsername(e){
        setUsername(e.target.value)
    }

    function handleUserSubmit(e){
        e.preventDefault()
        users.filter(user => {
            if (username === user.user_name){
                setCurrentUser(user)
            }
        })
        console.log(currentUser)
        console.log(users)
    }

    return ( 
        <p className="login">
            {(currentUser.length === 0) ? "Please login" : `${currentUser.user_name}`}
            <span>
            <button>{(currentUser.length === 0) ? "Login" : "Log out"}</button>
          </span>
        </p>
    )

}

export default Login;