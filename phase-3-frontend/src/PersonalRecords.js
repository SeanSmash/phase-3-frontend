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

      function handleDeleteRecord(id){
        const updatedRecords = userRecords.filter((record) => record.id !== id);
        setUserRecords(updatedRecords)
      }

    //   function handleDeleteMessage(id) {
    //     const updatedMessages = messages.filter((message) => message.id !== id);
    //     setMessages(updatedMessages);
    //   }

    return ( 
        <RecordList 
            records={userRecords}
            onRecordDelete={handleDeleteRecord} />
    )

}

export default PersonalRecords;