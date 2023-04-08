import React, { useState } from 'react';
import Exercise from './Exercise';
import Popup from 'reactjs-popup';

function RecordAdd({ exercises, onNewRecordAdd, currentUser }){
    const dateToday = new Date().toISOString().slice(0,10)
    const [exerciseSelection, setExerciseSelection] = useState('');
    const [metric, setMetric] = useState('')
    const [date, setDate] = useState(dateToday)
    const [minutes, setMinutes] = useState('')
    const [seconds, setSeconds] = useState('')

    function clearRecordAddContents(){
        setExerciseSelection('')
        setMetric('')
        setDate(dateToday)
        setMinutes('')
        setSeconds('')
    }

    function handleRecordAddSubmit(e){
        e.preventDefault()
        const exercise = exercises.filter(e =>{
            return (e.exercise === exerciseSelection)
        })

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
                date_created: date
            }),
        })
        .then((r) => r.json())
        .then((newRecord) => onNewRecordAdd(newRecord));
        clearRecordAddContents()
  
    }

    function handleAddRecord(){
        if (exerciseSelection !== ""){
            const exerciseToAdd = exercises.filter(e =>{
                return (e.exercise === exerciseSelection)
            })

            if (!exerciseToAdd[0].for_time){
                return(
                    <form id="record-add-form-details">
                        <legend>{exerciseSelection}: </legend>
                        <label>Metric</label>
                        <input type="number"   
                            placeholder={(exerciseToAdd[0].for_weight) ? "200..." : "15..."}
                            value={metric} onChange={e => setMetric(e.target.value)}
                        /><span>{(exerciseToAdd[0].for_weight) ? "lbs" : "reps"}</span><br></br>
                        <label>Date</label>
                        <input id="record-add-form-date" type="date" value={date} onChange={e => setDate(e.target.value)}/><br></br>
                    </form>
                )
            } else {
                return(
                    <form className="record-add-form-details-time">
                        <legend>{exerciseSelection}: </legend>
                        <label>Metric</label>
                        <input type="number" placeholder="minutes..." 
                            value={minutes} onChange={e => setMinutes(e.target.value)}
                        /><span id="minutes-span">minutes</span>
                        <input id="seconds-input" type="number" placeholder="seconds..." 
                            value={seconds} onChange={e => setSeconds(e.target.value)}
                        /><span id="seconds-span">seconds</span><br></br>
                        <label>Date</label>
                        <input id="record-add-form-date" type="date" value={date} onChange={e => setDate(e.target.value)}/><br></br>
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
                    <option>--choose exercise--</option>
                    {exercises.map((exercise) => (
                            <Exercise
                                key={exercise.id}
                                exercise={exercise}
                            />
                        ))}
                </select>
                <input id="form-submit" type="submit" value="Add" />
              </form>
              {handleAddRecord()}
              <button id="form-clear" onClick={clearRecordAddContents}>Clear</button>
              </div>
            )}
          </Popup>
    )
}

export default RecordAdd;