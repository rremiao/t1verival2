import React from "react";
import { BrowserRouter, Route, Switch, Redirect } from "react-router-dom";
import { isAuthenticated } from "./services/auth";
import CreateOperator from "./pages/CreateOperator";
import CreateUser from "./pages/CreateUser";
import HomePage from "./pages/HomePage";
import ListOperator from "./pages/ListOperator";
import ListUser from "./pages/ListUser";
import MakeDeliveries from "./pages/MakeDeliveries"
 
const PrivateRoute = ({ component: Component, ...rest }) => (
  <Route
    {...rest}
    render={props =>
      isAuthenticated() ? (
        <Component {...props} />
      ) : (
        <Redirect to={{ pathname: "/", state: { from: props.location } }} />
      )
    }
  />
);

const Routes = () => (
  <BrowserRouter>
    <Switch>
      <Route exact path="/" component={HomePage} />
      <Route path="/createOperator" component={CreateOperator}/>
      <Route path="/createUser" component={CreateUser}/>
      <Route path="/listOperator" component={ListOperator}/>
      <Route path="/listUser" component={ListUser}/>
      <Route path="/makeDeliveries" component={MakeDeliveries}/>
      <Route path="*" component={() => <h1>Page not found</h1>} />
    </Switch>
  </BrowserRouter>
);

export default Routes;
