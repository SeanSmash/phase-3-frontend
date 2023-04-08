import React, { useContext } from 'react';
import { CurrentUserContext } from './UserInfo';
import { useNavigate } from "react-router-dom"
import { NavLink } from "react-router-dom";


function Login({ isLoggedIn, onLogout }) {
    const [currentUser, setCurrentUser ] = useContext(CurrentUserContext)
    const navigate = useNavigate()
    const year = new Date().getFullYear()

    function profileDisplay(){
        if (isLoggedIn){
            return(
                <span>
                    {currentUser.user_name}, 
                    ({currentUser.gender.slice(0,1)}, 
                    {year-currentUser.birthdate.slice(0,4)}) 
                    <NavLink className="navlink" to="/edit_profile">Edit Profile</NavLink></span>
            )
        } else {
            return(
                <span>Please login</span>
            )
        }
    }

    function handleNewLogin(){
        if (!isLoggedIn){
            navigate("/login")
        } else {
            onLogout()
        }
    }

    return ( 
        <p className="login">
            {profileDisplay()}
            <span>
            <button onClick={handleNewLogin}>{(isLoggedIn) ? "Log out" : "Login" }</button>
          </span>
        </p>
    )

}

export default Login;