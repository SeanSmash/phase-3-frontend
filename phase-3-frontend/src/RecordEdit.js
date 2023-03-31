import React, { useState } from 'react';
import Popup from 'reactjs-popup';

function RecordEdit({ record, exercise, onRecordUpdate }){
    const [metric, setMetric] = useState(record.metric)
    const [recordDate, setRecordDate] = useState(record.date_created.slice(0,10))
    const [minutes, setMinutes] = useState(Math.floor(record.metric / 60))
    const [seconds, setSeconds] = useState(record.metric % 60)

    const [metricDisplay, setMetricDisplay] = useState('')

    function handleMetricDisplay(){
        if (exercise.for_weight){
            return(
                <>
                <label>Metric</label>
                <input type="text" value={metric} onChange={handleMetricChange} placeholder={record.metric}/>
                <label>lbs</label>
                </>
            )
        } else if (exercise.for_reps){
            return(
                <>
                <label>Metric</label>
                <input type="text" value={metric} onChange={handleMetricChange} placeholder={record.metric}/>
                <label>reps</label>
                </>
            ) 
        } else if (exercise.for_time){
            return(
                <>
                <label>Metric</label>
                <input type="number" value={minutes} onChange={handleMinuteChange} placeholder={minutes}/>
                <label>mins</label>
                <input type="number" value={seconds} onChange={handleSecondChange} placeholder={seconds}/>
                <label>secs</label>
                </>
            ) 
        }
    }

    function handleMetricChange(e){
        e.preventDefault()
        setMetric(e.target.value)
    }

    function handleRecordDateChange(e){
        e.preventDefault()
        setRecordDate(e.target.value)
    }

    function handleMinuteChange(e){
        e.preventDefault()
        setMinutes(e.target.value)
    }

    function handleSecondChange(e){
        e.preventDefault()
        setSeconds(e.target.value)
    }
    
    function handleRecordEditSubmit(e){
        console.log(minutes)
        console.log(seconds)
        const dateConvert = new Date(recordDate)
        let newMetric = 0

        if (exercise.for_time){
            newMetric = Number((minutes * 60)) + Number(seconds)
        } else newMetric = metric

        console.log(newMetric)

        e.preventDefault()
        fetch(`http://localhost:9292/personal_records/${record.id}`, {
            method: "PATCH",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                metric: newMetric,
                date_created: dateConvert
            }),
        })
        .then((r) => r.json())
        .then((updatedRecord) => onRecordUpdate(updatedRecord));
    }

    return(
        <td>
            <Popup trigger=
                {<button>edit</button>}
            modal nested>
            {close => (
              <>
              <form className="record-edit" onSubmit={(e) => {
                handleRecordEditSubmit(e)
                close()
              }}>
                <legend>{exercise.exercise}</legend>
                {handleMetricDisplay()}<br></br>
                <label>Date</label>
                <input type="text" value={recordDate} onChange={handleRecordDateChange} placeholder={record.date_created.slice(0,10)}/><br></br>
                <input type="submit" value="Update" />
              </form>
              </>
            )}
          </Popup>
        </td>
    )
}

export default RecordEdit;

//{user_profile_id: 1, exercise_id: 1, metric: 275, date_created: "20230228"},

// function categoriesButtons(){
//     return(
//         categories.map(category =>{
//             return(
//                 <button key={category.id}>{category.category}</button>
//             )
//         })
//     )
// }

// function handleCategoryDisplay(){
//     const categoryArray = categories.map(category => {
//         return category.category
//     })
//     return (
//         <>
//         <input type="text" value={recordCategory} onChange={handleRecordCategoryChange} placeholder="--add new category--"/><br></br>
//         {categoriesButtons()}
//         </>
//     )
// }