import React from "react";

function Record(record){

return (
    <tr key={record.record.id}>
        <td>{record.record.exercise_id}</td>
        <td>{record.record.metric}</td>
        <td>{record.record.date_created.slice(0,10)}</td>
    </tr>
)
}

export default Record;