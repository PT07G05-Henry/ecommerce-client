import React from "react";
import { Routes, Route } from "react-router-dom";
import Welcome from "./containers/welcome/Welcome";

function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<Welcome />} />
      </Routes>
    </>
  );
}

export default App;