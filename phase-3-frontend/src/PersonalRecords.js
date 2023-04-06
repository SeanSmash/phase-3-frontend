import React, { useEffect, useState, useContext } from 'react';
import { CurrentUserContext } from './UserInfo';
import RecordList from "./RecordList";
import Filter from './Filter';
import RecordAdd from './RecordAdd';
import ExerciseAdd from './ExerciseAdd';

function PersonalRecords() {
    const [userRecords, setUserRecords] = useState([])
    const [currentUser, setCurrentUser ] = useContext(CurrentUserContext)
    const [exerciseSearchTerm, setExerciseSearchTerm ] = useState('')
    const [categorySearchTerm, setCategorySearchTerm ] = useState('')

    useEffect(() => {
        fetch(`http://localhost:9292/personal_records/${currentUser.id}`)
          .then((r) => r.json())
          .then((records) => setUserRecords(records));
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


    function handleExerciseAdd(){
        //need to send new Exercise data to Recod add
    }

    return ( 
        <>
        <span className="subtitle">Personal Records</span>
        <RecordAdd 
            onNewRecordAdd={handleNewRecordAdd} 
            currentUser={currentUser} />
        <ExerciseAdd
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

export default PersonalRecords;