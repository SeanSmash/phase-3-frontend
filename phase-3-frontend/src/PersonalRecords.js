import React, { useEffect,useState } from 'react';
import Record from "./Record";

function PersonalRecords(currentUser) {
    const [userRecords, setUserRecords] = useState([])

    useEffect(() => {
        fetch("http://localhost:9292/personal_records/1")
          .then((r) => r.json())
          .then((records) => console.log("records"));
      }, []);

    return ( 
        <Record/>
    )

}

export default PersonalRecords;