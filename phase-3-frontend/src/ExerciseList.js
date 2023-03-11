import React from "react";

function ExerciseList (exercises){

    //console.log(exercises.exercises[0])
    const exercise = exercises[0]
    //console.log(Object.keys(exercises.exercises))

    function metricCheck (exercise) {
        let metric
        if (exercise.for_reps){
            metric = "reps"
        } else if (exercise.for_time){
            metric = "mins"
        } else {
            metric = "lbs"
        }
        return metric
    }


    return (
        <div className="exercise_list">
            <ul>
               {exercises.exercises.map((exercise) => (
                <li>
                    <span>{exercise.exercise}</span>
                    <span> {metricCheck(exercise)}</span>
                </li>
                ))}
            </ul>
        </div>
    )

}

export default ExerciseList;

{/* <Message
key={message.id}
message={message}
currentUser={currentUser}
onMessageDelete={onMessageDelete}
onUpdateMessage={onUpdateMessage}
/> */}