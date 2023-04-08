import React, { useState } from "react";
import { useNavigate } from "react-router-dom"

function NewUser({ onLogin, users }){
    const navigate = useNavigate()
    const [username, setUsername] = useState('')
    const [firstName, setFirstName] = useState('')
    const [lastName, setLastName] = useState('')
    const [gender, setGender] = useState('Male')
    const [birthDate, setBirthDate] = useState('2003-01-01')
    
    function handleSubmit(e){
        e.preventDefault()
        let formComplete = false
        let userDuplicate
        users.filter(u =>{
            if (u.user_name === username){
                return userDuplicate = true
            }
        })
        
        if (userDuplicate){
            alert("user already exists. choose a different username or login.")
        } else if (username === ""){
            alert("all fields must be complete")
        } else if (firstName === ""){
            alert("all fields must be complete")
        } else if (lastName === ""){
            alert("all fields must be complete")
        } else {formComplete = true}
        

        if (formComplete){
            fetch("http://localhost:9292/user_profiles", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    user_name: username,
                    first_name: firstName,
                    last_name: lastName,
                    birthdate: birthDate,
                    gender: gender
                }),
            })
            .then((r) => r.json())
            .then((newUser) => {
                onLogin(newUser)
                navigate("/")});
        }
    }

    return(
        <form className="user-form" onSubmit={handleSubmit}>
            <legend>Create New User</legend>
            <label>Username</label>
            <input type="text" placeholder="username" onChange={e => setUsername(e.target.value)}/>
            <br></br>
            <label>First Name</label>
            <input type="text" placeholder="first name" onChange={e => setFirstName(e.target.value)} />
            <br></br>
            <label>Last Name</label>
            <input type="text" placeholder="last name" onChange={e => setLastName(e.target.value)} />
            <br></br>
            <label>Gender</label>
            <select onSelect={e => setGender(e.target.value)}>
                <option value="Male">Male</option>
                <option value="Female">Female</option>
            </select><br></br>
            <label>Date of Birth</label>
            <input type="date" onChange={e => setBirthDate(e.target.value)} />
            <br></br>
            <input id="user-form-submit" type="submit" value="Create User" />
        </form>
    )
}

export default NewUser;