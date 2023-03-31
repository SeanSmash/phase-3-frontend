import React from "react";
import Record from "./Record";

function RecordList({records, onRecordDelete, onRecordUpdate, exerciseSearchTerm, categorySearchTerm }){

    return(
        <div>
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
                        exerciseSearchTerm={exerciseSearchTerm}
                        categorySearchTerm={categorySearchTerm}
                    />
                ))}
            </tbody>
        </table>
      </div>
    )
}

export default RecordList;