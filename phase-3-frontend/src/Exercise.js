import React from "react";

function Exercise ({ exercise } ){

    return(
        <option value={exercise.exercise}>{exercise.exercise}</option>
    )
}

export default Exercise;