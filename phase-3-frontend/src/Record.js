import React, { useState, useEffect } from "react";
import RecordEdit from "./RecordEdit";

function Record({ record, onRecordDelete, onRecordUpdate, exerciseSearchTerm, categorySearchTerm }){
    const [exercise, setExercise] = useState([])
    const [categories, setCategories] = useState([])

    useEffect(() => {
        fetch(`http://localhost:9292/exercises/${record.exercise_id}`)
          .then((r) => r.json())
          .then((resp) => setExercise(resp));
        fetch(`http://localhost:9292/exercises/${record.exercise_id}/categories`)
          .then((r) => r.json())
          .then((resp) => setCategories(resp));
      }, []);

    function categoryDisplay(){
        const categoryArray = categories.map(category => {
            return category.category
        })
        return (
            <td>{categoryArray.join(", ")}</td>
        )
    }

    function metricDisplay(){
        if (exercise.for_reps){
            return(
                <td>{record.metric} reps</td>
            )
        } else if (exercise.for_weight){
            return(
                <td>{record.metric} lbs</td>
            )
        } else if (exercise.for_time){
            const minutes = Math.floor(record.metric / 60)
            const seconds = (record.metric % 60)
            return(
                <td>{minutes} mins, {seconds} secs</td>
            )
        }
    }

    function handleRecordDelete(){
        fetch(`http://localhost:9292//personal_records/${record.id}`, {
                method:"DELETE"
            })
       onRecordDelete(record.id)
    }

    function filterCheck(){
        const categoryArray = categories.map(category => {
            return category.category
        })

        if (exerciseSearchTerm === ""){
            if (categorySearchTerm === ""){
                return table()
            } else if (categoryArray.join().toLowerCase().includes(categorySearchTerm)){
                return table()
            }
        } else if (exercise.exercise.toLowerCase().includes(exerciseSearchTerm)){
            return table()
        }
    }

    function categoryDisplay(){
        const categoryArray = categories.map(category => {
            return category.category
        })
        return (
            <td>{categoryArray.join(", ")}</td>
        )
    }

    function table(){
        return(
            <tr key={record.id}>
                <td>{exercise.exercise}</td>
                {metricDisplay()}
                <td>{record.date_created.slice(0,10)}</td>
                {categoryDisplay()}
                <RecordEdit 
                    record={record}
                    exercise={exercise}
                    onRecordUpdate={onRecordUpdate}
                />
                <td><button onClick={handleRecordDelete}>delete</button></td>
            </tr>
        )
    }

return (
    <>
    {filterCheck()}
    </>
)
}

export default Record;