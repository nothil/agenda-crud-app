import React from "react";
// import "./App.css";
import Header from "./components/Header/header";
import { Switch, Link, Routes, Route, BrowserRouter } from "react-router-dom";
import Calendar from "./components/Calendar/Calendar";
import AddEvents from "./components/AddEvents/AddEvents";

function App() {
  return (
    <>
      <Header />

      <BrowserRouter>
        <Routes>
          <Route exact path="/" element={<Calendar />} />
          <Route path="/events/add" element={<AddEvents />} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
