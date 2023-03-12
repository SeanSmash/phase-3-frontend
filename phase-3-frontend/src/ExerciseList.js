import React from "react";
import Exercise from "./Exercise";

function ExerciseList (exercises){

    //console.log(exercises.exercises)
    //console.log(Object.keys(exercises.exercises))


    return (
        <div className="exercise-list">
            <label for="exercise-select"></label>
                <select id="exercise-select">
                    <option value="">--Add an Exercise Record--</option>
                    {exercises.exercises.map((exercise) => (
                        <Exercise
                            key={exercise.id}
                            exercise={exercise}
                        />
                    ))}
                </select>
        </div>
    )

}

export default ExerciseList;

//<label for="pet-select">Choose a pet:</label>

{/* <select id="pet-select">
    <option value="">--Please choose an option--</option>
    <option value="dog">Dog</option>
    <option value="cat">Cat</option>
    <option value="hamster">Hamster</option>
    <option value="parrot">Parrot</option>
    <option value="spider">Spider</option>
    <option value="goldfish">Goldfish</option>
</select> */}

{/* <ul>
              
            </ul> */}