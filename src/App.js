import React from "react";
import { Route, Routes } from "react-router-dom";
import InputForm from "./components/InputForm";
import ViewCard from "./components/ViewCard";

const App = () => {
  return (
    <Routes>
      <Route path="/" element={<InputForm />} />
      <Route path="/get-card/:cardId" element={<ViewCard />} />
    </Routes>
  );
};

export default App;
