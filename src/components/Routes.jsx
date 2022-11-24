import * as React from "react";
import { Switch, Route } from "react-router-dom";
import "../App.scss";

import Header from "../components/Header/header";
import Agenda from "../components/agenda/agenda";

const Routes = () => {
  return (
    <>
      <Header />

      <Agenda />
    </>
  );
};

export default Routes;
