import React from "react";
import { BrowserRouter, Switch, Route } from "react-router-dom";
import Home from "./core/commonComponents/Home";
import Signup from "./user/Signup";

const Routes = () => {
  return (
    <div>
      <BrowserRouter>
        <Switch>
          <Route path="/" exact component={Home} />
          <Route path="/signup" exact component={Signup} />
        </Switch>
      </BrowserRouter>
    </div>
  );
};
export default Routes;
