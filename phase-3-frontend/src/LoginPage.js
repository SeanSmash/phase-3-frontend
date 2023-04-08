import React, { useState, useContext } from "react";
import { useNavigate } from "react-router-dom"
import { CurrentUserContext } from './UserInfo';

function LoginPage({ users, onLogin }){
    const [currentUser, setCurrentUser ] = useContext(CurrentUserContext)
    const [username, setUsername] = useState("")
    const navigate = useNavigate()

    function handleUsername(e){
        setUsername(e.target.value)
    }

    function createNewUser(){
        navigate("/new_user")
    }

    function handleSubmit(e){
        e.preventDefault()
        const existingUser = users.filter(user =>{
            return (user.user_name === username)
        })
        if(existingUser.length == 1){
            onLogin(existingUser[0])
            navigate("/")
        } else {
            alert("user not found. please create a username")
            createNewUser()
        }
    }

    return(
        <form className="user-form" onSubmit={handleSubmit}>
            <legend>User Login</legend>
            <label>Username</label>
            <input type="text" placeholder="username" onChange={e => setUsername(e.target.value)}/>
            <input type="submit" value="Submit" />
        </form>
    )
}

export default LoginPage;