import React from "react";
import { Link } from "react-router-dom";

const App: React.FC = () => {
  return (
    <div className="App">
      <h2>Questions App</h2>
      <Link to={"/questions"}>List</Link>
      <Link to={"/questions/create"}>New Question</Link>
    </div>
  );
};

export default App;
