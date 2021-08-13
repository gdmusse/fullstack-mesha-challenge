import React from "react";
import { BrowserRouter, Switch, Route } from "react-router-dom";
import AdministratorPage from "../pages/AdministratorPage/AdministratorPage";
import SignUpPage from "../pages/SignUpPage/SignUpPage";

const Router = () => {
  return (
    <BrowserRouter>
      <Switch>
        <Route exact path="/registrar">
          <SignUpPage />
        </Route>
        <Route exact path="/registros">
          <AdministratorPage />
        </Route>

      </Switch>
    </BrowserRouter>
  );
};

export default Router;
