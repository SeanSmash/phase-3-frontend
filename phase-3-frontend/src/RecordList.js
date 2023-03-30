import React from "react";
import Record from "./Record";

function RecordList({records, onRecordDelete, onRecordUpdate }){

    return(
        <div className="App">
        <table>
            <thead>
                <tr>
                    <th>Exercise</th>
                    <th>Metric</th>
                    <th>Date</th>
                    <th>Category</th>
                </tr>
            </thead>
            <tbody>
                {records.map(record => (
                    <Record 
                        key={record.id}
                        record={record}
                        onRecordDelete={onRecordDelete}
                        onRecordUpdate={onRecordUpdate}
                    />
                ))}
            </tbody>
        </table>
      </div>
    )
}

export default RecordList;