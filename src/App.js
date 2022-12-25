import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import { Switch, Route, Router, useHistory } from "react-router-dom";
import { checkUserSession } from "./redux/User/user.actions";
import { AuthProvider } from "./redux/User/user.sagas";

import PrivateRoute from "./PrivateRoute";

// components
import Login from "./components/Login";
import Signup from "./components/Signup";
import DashBoard from "./components/Dashboard/Dashboard";
import Reset from "./components/Reset";
import UpdatePassword from "./components/UpdatePassword";

const App = () => {

  const history = useHistory();
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(checkUserSession());
  }, [dispatch]);

  return (
    <div className="App">
      <Router history={history}>
      <AuthProvider>
        <Switch>
          
          <PrivateRoute exact path="/" component={DashBoard} />

          <PrivateRoute path="/update" component={UpdatePassword} />

          <Route path="/signup" component={Signup} />

          <Route path="/login" component={Login} />

          <Route path="/recovery" component={Reset} />

        </Switch>
      </AuthProvider>
      </Router>
    </div>
  );
};

export default App;
