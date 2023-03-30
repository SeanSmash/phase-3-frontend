import React, { useState, useEffect } from "react";

function Record(record){
    const [exercise, setExercise] = useState([])
    const [categories, setCategories] = useState([])

    useEffect(() => {
        fetch(`http://localhost:9292/exercises/${record.record.exercise_id}`)
          .then((r) => r.json())
          .then((resp) => setExercise(resp));
        fetch(`http://localhost:9292/exercises/${record.record.exercise_id}/categories`)
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
console.log(exercise)
    function metricDisplay(){
        if (exercise.for_reps){
            return(
                <td>{record.record.metric} reps</td>
            )
        } else if (exercise.for_weight){
            return(
                <td>{record.record.metric} lbs</td>
            )
        } else if (exercise.for_time){
            const minutes = Math.floor(record.record.metric / 60)
            const seconds = (record.record.metric % 60)
            return(
                <td>{minutes} mins, {seconds} secs</td>
            )
        }
    }

return (
    <tr key={record.record.id}>
        <td>{exercise.exercise}</td>
        {metricDisplay()}
        <td>{record.record.date_created.slice(0,10)}</td>
        {categoryDisplay()}
        <td><button>edit</button></td>
        <td><button>delete</button></td>
    </tr>
)
}

export default Record;