import React from 'react';

function Filter ({ onExerciseFilter, onCategoryFilter }) {

    function handleExerciseFilter(e){
        onExerciseFilter(e.target.value)
    }

    function handleCategoryFilter(e){
        onCategoryFilter(e.target.value)
    }
    return(
        <form className="filter-form">
            <label>Filter:</label>
            <label>Exercise</label>
            <input type="text" onChange={handleExerciseFilter} placeholder="ex. Bench Press"/>
            <label>Category</label>
            <input type="text" onChange={handleCategoryFilter} placeholder="ex. Upper body"/>
        </form>
    )
}

export default Filter;