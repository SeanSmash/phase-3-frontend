import React from "react";

function Exercise (exercise){

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

    return(
        <li>
            <span>{exercise.exercise.exercise}</span>
            <span> {metricCheck(exercise.exercise)}</span>
        </li>
    )
}

export default Exercise;