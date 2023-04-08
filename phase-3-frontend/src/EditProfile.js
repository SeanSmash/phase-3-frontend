import React, { useState, useContext } from "react";
import { CurrentUserContext } from './UserInfo';
import { useNavigate } from "react-router-dom"


function EditProfile(){
    const [currentUser, setCurrentUser ] = useContext(CurrentUserContext)
    const navigate = useNavigate()
    const [username, setUsername] = useState(`${currentUser.user_name}`)
    const [firstName, setFirstName] = useState(`${currentUser.first_name}`)
    const [lastName, setLastName] = useState(`${currentUser.last_name}`)
    const [gender, setGender] = useState(`${currentUser.gender}`)
    const [birthDate, setBirthDate] = useState(`${currentUser.birthdate}`)

    function handleSubmit(e){
        e.preventDefault()
        fetch(`http://localhost:9292/user_profiles/${currentUser.id}`, {
            method: "PATCH",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                user_name: username,
                first_name: firstName,
                last_name: lastName,
                gender: gender,
                birthdate: birthDate
            }),
        })
        .then((r) => r.json())
        .then((updatedProfile) => {
            setCurrentUser(updatedProfile)
            navigate("/")
        });
    }

    return(
        <>
        <form className="user-form" id="edit-profile-form" onSubmit={handleSubmit}>
            <legend>Edit Profile</legend>
            <label>Username</label>
            <input type="text" placeholder={currentUser.user_name} onChange={e => setUsername(e.target.value)}/>
            <br></br>
            <label>First Name</label>
            <input type="text" placeholder={currentUser.first_name} onChange={e => setFirstName(e.target.value)} />
            <br></br>
            <label>Last Name</label>
            <input type="text" placeholder={currentUser.last_name} onChange={e => setLastName(e.target.value)} />
            <br></br>
            <label>Gender</label>
            <select onChange={e => setGender(e.target.value)}>
                <option value={currentUser.gender}> -- </option>
                <option value="Male">Male</option>
                <option value="Female">Female</option>
            </select><br></br>
            <label>Date of Birth</label>
            <input type="date" onChange={e => setBirthDate(e.target.value)} />
            <br></br>
        </form>
        <button id="cancel-btn" onClick={e => navigate("/")}>Cancel</button>
        <input id="user-form-submit" form="edit-profile-form" type="submit" />
        </>

    )
}

export default EditProfile;