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
    
    function handleRecordUpdate(updatedRecord){
        //console.log(updatedRecord)
        const updatedRecords = userRecords.map(record =>{
            if (record.id === updatedRecord.id){
                return updatedRecord
            } else {
                return record
            }
        })
        setUserRecords(updatedRecords)
    }

    return ( 
        <RecordList 
            records={userRecords}
            onRecordDelete={handleDeleteRecord}
            onRecordUpdate={handleRecordUpdate} />
    )

}

export default PersonalRecords;