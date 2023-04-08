import React, { useEffect, useState, useContext } from 'react';
import { CurrentUserContext } from './UserInfo';
import RecordList from "./RecordList";
import Filter from './Filter';
import RecordAdd from './RecordAdd';
import ExerciseAdd from './ExerciseAdd';

function PersonalRecords({ isLoggedIn }) {
    const [userRecords, setUserRecords] = useState([])
    const [exercises, setExercises] = useState([])
    const [categories, setCategories] = useState([])
    const [currentUser, setCurrentUser ] = useContext(CurrentUserContext)
    const [exerciseSearchTerm, setExerciseSearchTerm ] = useState('')
    const [categorySearchTerm, setCategorySearchTerm ] = useState('')

    useEffect(() => {
        if (isLoggedIn){
            fetch(`http://localhost:9292/personal_records/${currentUser.id}`)
                .then((r) => r.json())
                .then((records) => setUserRecords(records));
            fetch("http://localhost:9292/exercises")
                .then((r) => r.json())
                .then((exercises) => setExercises(exercises));
            fetch(`http://localhost:9292/categories`)
                .then((r) => r.json())
                .then((resp) => setCategories(resp));
        }
    }, []);

    function handleDeleteRecord(id){
        const updatedRecords = userRecords.filter((record) => record.id !== id);
        setUserRecords(updatedRecords)
    }
    
    function handleRecordUpdate(updatedRecord){
        const updatedRecords = userRecords.map(record =>{
            if (record.id === updatedRecord.id){
                return updatedRecord
            } else {
                return record
            }
        })
        setUserRecords(updatedRecords)
    }

    function handleExerciseFilter(exerciseSearchInput){
        setExerciseSearchTerm(exerciseSearchInput)
    }

    function handleCategoryFilter(categorySearchInput){
        setCategorySearchTerm(categorySearchInput)
    }

    function handleNewRecordAdd(newRecord){
        setUserRecords([newRecord, ...userRecords])
    }

    function handleExerciseAdd(newExercise){
        setExercises([...exercises, newExercise])
        alert("New exercise added!")
    }

    function handleDisplay(){
        if (isLoggedIn){
            return(
                <>
                <span className="subtitle">Personal Records</span>
                <RecordAdd 
                    exercises={exercises}
                    onNewRecordAdd={handleNewRecordAdd} 
                    currentUser={currentUser} />
                <ExerciseAdd
                    categories={categories}
                    onExerciseAdd={handleExerciseAdd} />
                <Filter 
                    onExerciseFilter={handleExerciseFilter}
                    onCategoryFilter={handleCategoryFilter} />
                <RecordList 
                    records={userRecords}
                    onRecordDelete={handleDeleteRecord}
                    onRecordUpdate={handleRecordUpdate}
                    exerciseSearchTerm={exerciseSearchTerm}
                    categorySearchTerm={categorySearchTerm} />
                </>
            )
        }
    }

    return (
        <>
        {handleDisplay()}
        </>
    )

}

export default PersonalRecords;