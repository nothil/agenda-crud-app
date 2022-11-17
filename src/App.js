import React from "react";
// import "./App.css";
import Header from "./components/Header/header";
import { Routes, Route, BrowserRouter } from "react-router-dom";
import Calendar from "./components/Calendar/Calendar";
import Update from "./components/UpdateData/UpdateData";
import AddEvents from "./components/AddEvents/AddEvents";

function App() {
  return (
    <>
      <Header />

      <BrowserRouter>
        <Routes>
          <Route exact path="/" element={<Calendar />} />
          <Route path="/events/add" element={<AddEvents />} />
          <Route path="/events/update:id/update" element={<Update />} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
