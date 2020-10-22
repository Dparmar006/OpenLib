import React from "react";
import { BrowserRouter, Switch, Route } from "react-router-dom";
import PrivateRoutes from "./auth/helper/privateRouters";
import uploadBook from "./core/books/CRUD/UploadBook";
import Home from "./core/commonComponents/Home";
import Signin from "./user/Signin";
import Signup from "./user/Signup";

const Routes = () => {
  return (
    <div>
      <BrowserRouter>
        <Switch>
          <Route path="/signup" exact component={Signup} />
          <Route path="/signin" exact component={Signin} />

          <PrivateRoutes path="/" exact component={Home} />
          <PrivateRoutes path="/uploadBook" exact component={uploadBook} />
        </Switch>
      </BrowserRouter>
    </div>
  );
};
export default Routes;
