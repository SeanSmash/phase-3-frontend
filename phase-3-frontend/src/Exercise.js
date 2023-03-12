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
        <option value="">{exercise.exercise.exercise}</option>
    )
}

export default Exercise;