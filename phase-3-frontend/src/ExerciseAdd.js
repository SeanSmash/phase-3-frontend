import React, { useState } from "react";
import Popup from "reactjs-popup";
import CategoryAdd from "./CategoryAdd";

function ExerciseAdd({ categories, onExerciseAdd }){
    const [categoriesToAdd, setCategoriesToAdd] = useState([])
    const [metricType, setMetricType] = useState('for_reps')
    const [newExercise, setNewExercise] = useState('')

    function handleCategoriesToAdd(e){
        if (e.target.value === "reset"){
            setCategoriesToAdd([])
        } else if (e.target.value === "category"){
            setCategoriesToAdd([...categoriesToAdd])
        } else {setCategoriesToAdd([...categoriesToAdd, e.target.value])}
    }

    function clearExerciseAddContents(){
        setMetricType('')
        setCategoriesToAdd([])
        setNewExercise('')
    }

    function handleExerciseAddSubmit(e){
        e.preventDefault()
        let ex
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
        .then((newEx) => {
            onExerciseAdd(newEx)
            ex = newEx;
            categoriesToAdd.map(cat =>{
                categories.map(category =>{
                    if (category.category === cat){
                        fetch("http://localhost:9292/exercise_categories", {
                            method: "POST",
                            headers: {
                            "Content-Type": "application/json",
                            },
                            body: JSON.stringify({
                                category_id: category.id,
                                exercise_id: ex.id
                            }),
                        })  
                        .then((r) => r.json())
                        //.then((newCatEx) => console.log(newCatEx));
                    }
                })
                
            })
        })
             
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