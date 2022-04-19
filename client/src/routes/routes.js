import React from "react";

import { Switch, Route, BrowserRouter as Router } from "react-router-dom";

import Login from "../Containers/Login";
import Register from "../Containers/Register";
import Home from "../Containers/Home";
import RegisterAndDeleteTests from "../Containers/Register and delete Tests";
import RegisterAndDeleteMachines from "../Containers/Register and delete Machines";
import UpdateAndDeleteUsers from "../Containers/Update and delete Users";
import PlanCalendar from "../Containers/Create Plan";

import PrivateRoute from "./private-route";
import PrivateAdmRoute from "./private-ADM-route";

function Routes() {
  return (
    <Router>
      <Switch>
        <Route component={Login} path="/login" />
        <Route component={Register} path="/cadastro" />

        <PrivateRoute exact component={Home} path="/" />
        <PrivateRoute exact component={PlanCalendar} path="/createPlan" />

        <PrivateAdmRoute
          exact
          component={RegisterAndDeleteTests}
          path="/cadDelTestes"
        />
        <PrivateAdmRoute
          exact
          component={RegisterAndDeleteMachines}
          path="/cadDelMachines"
        />
        <PrivateAdmRoute
          exact
          component={UpdateAndDeleteUsers}
          path="/upDelUsers"
        />
      </Switch>
    </Router>
  );
}

export default Routes;
