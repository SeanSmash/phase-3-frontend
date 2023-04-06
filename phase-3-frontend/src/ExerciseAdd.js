import React, { useEffect, useState } from "react";
import Popup from "reactjs-popup";
import CategoryAdd from "./CategoryAdd";

function ExerciseAdd({ onExerciseAdd }){
    const [exercises, setExercises] = useState([])
    const [categories, setCategories] = useState([])
    const [categoriesToAdd, setCategoriesToAdd] = useState([])
    const [metricType, setMetricType] = useState('')
    const [newExercise, setNewExercise] = useState('')
    
    useEffect(() => {
        fetch("http://localhost:9292/exercises")
            .then((r) => r.json())
            .then((exercises) => setExercises(exercises));
        fetch(`http://localhost:9292/categories`)
            .then((r) => r.json())
            .then((resp) => setCategories(resp));
        }, []);

    function handleCategoriesToAdd(e){
        if (e.target.value === "Reset"){
            setCategoriesToAdd([])
        } else {setCategoriesToAdd([...categoriesToAdd, e.target.value])}
    }

    function clearExerciseAddContents(){
        setMetricType('')
        setCategoriesToAdd([])
        setNewExercise('')
    }

    function handleExerciseAddSubmit(e){
        e.preventDefault()
        let metric = []
        if (metricType === "for_reps"){
            metric = ["true", "false", "false"]
        } else if (metricType === "for_time"){
            metric = ["false", "true", "false"]
        } else {
            metric = ["false", "false", "true"]
        }

        fetch("http://localhost:9292/exercises", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                exercise: newExercise,
                for_reps: metric[0],
                for_time: metric[1],
                for_weight: metric[2]
            }),
        })
        .then((r) => r.json())
        .then((newEx) => onExerciseAdd(newEx));

        clearExerciseAddContents()
    }

    return(
        <Popup trigger=
                {<button id="add-exercise-btn">Add Exercise</button>}
            modal nested>
            {close => (
                <div>
                <form className="exercise-add-form" onSubmit={(e) => {
                        handleExerciseAddSubmit(e)
                        close()
                    }}>
                    <legend>Add Exercise</legend>
                    <input type="text" value={newExercise} onChange={e => setNewExercise(e.target.value)} placeholder="exercise name..."/>
                    <input id="form-submit" type="submit" value="Add" /><br></br>
                    <select value={metricType} onChange={e => setMetricType(e.target.value)}>
                        <option value="for_reps">For Reps</option>
                        <option value="for_time">For Time</option>
                        <option value="for_weight">For Weight</option>
                    </select><br></br>
                    <CategoryAdd 
                        categories={categories} 
                        categoriesToAdd={categoriesToAdd} 
                        handleCategoriesToAdd={handleCategoriesToAdd}
                    />
                </form>
                <button id="form-clear" onClick={clearExerciseAddContents}>Clear</button>
                </div>
            )}
          </Popup>
    )
}

export default ExerciseAdd;