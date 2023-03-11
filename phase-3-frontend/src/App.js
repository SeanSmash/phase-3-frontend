import './App.css';
import React, { useEffect, useState } from "react";
import ExerciseList from "./ExerciseList";

function App() {
  const [exercises, setExercises] = useState([]);
  //const [search, setSearch] = useState("");

  useEffect(() => {
    fetch("http://localhost:9292/exercises")
      .then((r) => r.json())
      .then((exercises) => setExercises(exercises));
  }, []);

  return (
    <main>
      <header>
        <h1>Personal Record Tracker</h1>
        <p>Login</p>
      </header>
      <div className="App">
        <p>Test site </p>
      </div>
      <ExerciseList exercises={exercises}/>
    </main>
  );
}

export default App;
