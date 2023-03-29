import './App.css';
import React from "react";
import Login from "./Login";
import ExerciseList from "./ExerciseList";
import PersonalRecords from "./PersonalRecords";
 

function App() {
  //const [search, setSearch] = useState("");

  return (
    <main>
      <header>
      <h1 className='title'>Personal Record Tracker</h1>
      </header>
      <Login />
      <ExerciseList />
      <h2>Personal Records</h2>
      <PersonalRecords />
    </main>
  );
}

export default App;
