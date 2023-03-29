import React, { useEffect, useState } from "react";
import Exercise from "./Exercise";

function ExerciseList() {
    const [exercises, setExercises] = useState([]);
    const [exerciseSelection, setExerciseSelection] = useState([]);

    useEffect(() => {
        fetch("http://localhost:9292/exercises")
          .then((r) => r.json())
          .then((exercises) => setExercises(exercises));
      }, []);
    
    function handleChange(e){
        e.preventDefault();
        setExerciseSelection(e.target.value)
    }

    function handleSubmit(e){
        e.preventDefault();
        console.log(exerciseSelection)
    }

    return (
        <form className="exercise-list" onSubmit={handleSubmit}>
            <label>
                <select id="exercise-select" value={exerciseSelection} onChange={handleChange}>
                    <option value="">--Add an Exercise Record--</option>
                    {exercises.map((exercise) => (
                        <Exercise
                            key={exercise.id}
                            exercise={exercise}
                        />
                    ))}
                    <option value="add exercise">Create New Exercise</option>
                </select>
            </label>
            <input type="submit" value="Add" />
        </form>
    )

}

export default ExerciseList;
