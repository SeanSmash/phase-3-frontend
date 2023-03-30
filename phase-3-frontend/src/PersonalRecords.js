import React, { useEffect,useState } from 'react';
import RecordList from "./RecordList";

function PersonalRecords() {
    const [userRecords, setUserRecords] = useState([])

    useEffect(() => {
        fetch("http://localhost:9292/personal_records/1")
          .then((r) => r.json())
          .then((records) => setUserRecords(records));
      }, []);

    return ( 
        <RecordList records={userRecords} />
    )

}

export default PersonalRecords;