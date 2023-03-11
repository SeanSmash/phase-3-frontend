import React from "react";
import Exercise from "./Exercise";

function ExerciseList (exercises){

    //console.log(exercises.exercises)
    //console.log(Object.keys(exercises.exercises))


    return (
        <div className="exercise_list">
            <ul>
              {exercises.exercises.map((exercise) => (
                <Exercise
                    key={exercise.id}
                    exercise={exercise}
                />
              ))}
            </ul>
        </div>
    )

}

export default ExerciseList;

// {messages.map((message) => (
//     <Message
//       key={message.id}
//       message={message}
//       currentUser={currentUser}
//       onMessageDelete={onMessageDelete}
//       onUpdateMessage={onUpdateMessage}
//     />