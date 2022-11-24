import React from "react";
import Router from "./components/Routes";
import "./index.scss";
// import "./App.css";
// import Header from "./components/Header/header";
// import { Routes, Route, BrowserRouter } from "react-router-dom";
// // import Calendar from "./components/Calendar/Calendar";
// import Update from "./components/UpdateData/UpdateData";
// import AddEvents from "./components/AddEvents/AddEvents";
// import Agenda from "./components/Agenda/agenda.jsx";

function App() {
  return (
    <>
      <Router />
      {/* <Route exact path="/" element={<Calendar />} /> */}
      {/* <Route exact path="/" element={<Agenda />} /> */}
      {/* <Route path="/events/add" element={<AddEvents />} />
          <Route path="/events/update:id/update" element={<Update />} /> */}
      {/* </Router> */}
    </>
  );
}

export default App;
