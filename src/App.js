import React from "react";
import { Routes, Route } from "react-router-dom";
import NavBar from "./components/NavBar/NavBar";
import Welcome from "./containers/welcome/Welcome";


function App() {
  return (
    <>
    <NavBar/>
      <Routes>
        <Route path="/" element={<Welcome />} />
      </Routes>
    </>
  );
}

export default App;