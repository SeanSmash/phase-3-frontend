import React, { useEffect, useState } from 'react';
import Exercise from './Exercise';
import CategoryAdd from './CategoryAdd';
import Popup from 'reactjs-popup';
import { clear } from '@testing-library/user-event/dist/clear';

function RecordAdd({ onNewRecordAdd, currentUser }){
    const [exercises, setExercises] = useState([])
    const [exerciseSelection, setExerciseSelection] = useState('');
    const [categories, setCategories] = useState([])
    const [metric, setMetric] = useState('')
    const [date, setDate] = useState('')
    const [categoriesToAdd, setCategoriesToAdd] = useState([])
    const [minutes, setMinutes] = useState('')
    const [seconds, setSeconds] = useState('')

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

    function clearRecordAddContents(){
        setExerciseSelection('')
        setMetric('')
        setDate('')
        setCategoriesToAdd([])
        setMinutes('')
        setSeconds('')
    }

    function handleRecordAddSubmit(e){
        e.preventDefault()
        const exercise = exercises.filter(e =>{
            return (e.exercise === exerciseSelection)
        })
        const dateConvert = new Date(date)
        let newMetric = 0
        if (exercise[0].for_time){
            newMetric = Number((minutes * 60)) + Number(seconds)
        } else newMetric = metric

        fetch("http://localhost:9292/personal_records", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                user_profile_id: currentUser.id,
                exercise_id: exercise[0].id,
                metric: newMetric,
                date_created: dateConvert
            }),
        })
        .then((r) => r.json())
        .then((newRecord) => onNewRecordAdd(newRecord));

        //clearRecordAddContents()
  
    }

    function handleAddRecord(){
        if (exerciseSelection !== ""){
            const exerciseToAdd = exercises.filter(e =>{
                return (e.exercise === exerciseSelection)
            })

            if (!exerciseToAdd[0].for_time){
                return(
                    <form>
                        <legend>{exerciseSelection}: </legend>
                        <label>Metric</label>
                        <input type="text" 
                            placeholder={(exerciseToAdd[0].for_weight) ? "200..." : "15..."}
                            value={metric} onChange={e => setMetric(e.target.value)}
                        /><span>{(exerciseToAdd[0].for_weight) ? "lbs" : "reps"}</span><br></br>
                        <label>Date</label>
                        <input type="date" value={date} onChange={e => setDate(e.target.value)}/><br></br>
                        <label>Category</label>
                        <CategoryAdd 
                            categories={categories} 
                            categoriesToAdd={categoriesToAdd} 
                            handleCategoriesToAdd={handleCategoriesToAdd}
                        />
                    </form>
                )
            } else {
                return(
                    <form>
                        <legend>{exerciseSelection}: </legend>
                        <label>Metric</label>
                        <input type="number" placeholder="minutes..." 
                            value={minutes} onChange={e => setMinutes(e.target.value)}
                        /><span>minutes</span>
                        <input type="number" placeholder="seconds..." 
                            value={seconds} onChange={e => setSeconds(e.target.value)}
                        /><span>seconds</span><br></br>
                        <label>Date</label>
                        <input type="date" value={date} onChange={e => setDate(e.target.value)}/><br></br>
                        <label>Category</label>
                        <CategoryAdd 
                            categories={categories} 
                            categoriesToAdd={categoriesToAdd} 
                            handleCategoriesToAdd={handleCategoriesToAdd}
                        />
                    </form>
                ) 
            }
        }
    }

    return(
            <Popup trigger=
                {<button>Add Record</button>}
            modal nested>
            {close => (
              <div className="record-add">
              <form className="record-add-form" onSubmit={(e) => {
                handleRecordAddSubmit(e)
                close()
              }}>
                <legend>Add Record</legend>
                <select value={exerciseSelection} onChange={e => setExerciseSelection(e.target.value)}>
                    <option>--Choose Exercise--</option>
                    {exercises.map((exercise) => (
                            <Exercise
                                key={exercise.id}
                                exercise={exercise}
                            />
                        ))}
                    <option>--Create New--</option>
                </select>
                <input type="submit" value="Add" />
                <input type="submit" value="Clear" />
              </form>
              {handleAddRecord()}
              
              </div>
            )}
          </Popup>
    )
}

export default RecordAdd;