import React, { useEffect,useState, useContext } from 'react';
import { CurrentUserContext } from './UserInfo';
import RecordList from "./RecordList";

function PersonalRecords() {
    const [userRecords, setUserRecords] = useState([])
    const [currentUser, setCurrentUser ] = useContext(CurrentUserContext)

    useEffect(() => {
        fetch(`http://localhost:9292/personal_records/${currentUser.id}`)
          .then((r) => r.json())
          .then((records) => setUserRecords(records));
      }, []);

    return ( 
        <RecordList records={userRecords} />
    )

}

export default PersonalRecords;