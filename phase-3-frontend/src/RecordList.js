import React from "react";
import Record from "./Record";

function RecordList({records}){

    return(
        <div className="App">
        <table>
            <thead>
                <tr>
                    <th>Exercise</th>
                    <th>Metric</th>
                    <th>Date</th>
                </tr>
            </thead>
            <tbody>
                {records.map(record => (
                    <Record 
                        key={record.id}
                        record={record}
                    />
                ))}
            </tbody>
        </table>
      </div>
    )
}

export default RecordList;