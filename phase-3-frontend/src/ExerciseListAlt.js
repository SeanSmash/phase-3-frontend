import React, { useEffect, useState } from "react";
import Exercise from "./Exercise";

function ExerciseListAlt() {
    const [exercises, setExercises] = useState([]);
    const [exerciseSelection, setExerciseSelection] = useState('');

    useEffect(() => {
        fetch("http://localhost:9292/exercises")
          .then((r) => r.json())
          .then((exercises) => setExercises(exercises));
      }, []);

    function handleSubmit(e){
        e.preventDefault();
        
    }

    return (
        <form className="exercise-list" onSubmit={handleSubmit}>
            <label>
                <select 
                    id="exercise-select" 
                    value={exerciseSelection} 
                    onChange={e => setExerciseSelection(e.target.value)}
                >
                    <option value="">--Add an Exercise Record--</option>
                    {exercises.map((exercise) => (
                        <Exercise
                            key={exercise.id}
                            exercise={exercise}
                        />
                    ))}
                    <option value="add exercise">--Create New--</option>
                </select>
            </label>
            <input type="submit" value="Add" />
        </form>
    )

}

export default ExerciseListAlt;
