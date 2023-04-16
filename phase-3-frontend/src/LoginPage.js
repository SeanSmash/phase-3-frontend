import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom"

function LoginPage({ onLogin }){
    const [userList, setUserList] = useState([])
    const [username, setUsername] = useState("")
    const navigate = useNavigate()

    useEffect(() => {
        fetch("http://localhost:9292/user_profiles")
          .then((r) => r.json())
          .then((resp) => {
            setUserList(resp)
          })
      }, []);

    function createNewUser(){
        navigate("/new_user")
    }

    function handleSubmit(e){
        e.preventDefault()
        const existingUser = userList.filter(user =>{
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