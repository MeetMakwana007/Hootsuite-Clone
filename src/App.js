import React, { useEffect, useState } from "react";
import LandingPage from "./frontend/LandingPage/LandingPage";
import "./App.css";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import Dashboard from "./frontend/Dashboard/Dashboard";
import AccountSetup from "./frontend/Account-setup/AccountSetup";
import Signup from "./frontend/SignUp/Signup";
import Login from "./frontend/Login/Login";
import PrivateRoute from "./frontend/Routing/PrivateRoute"; 
import { loadUser } from "./frontend/actions/loginAction";
import { useDispatch } from "react-redux";
import FBUSer from "./frontend/FBDashboard/FBUser/FBUSer";
import CreateFBPost from "./frontend/FBDashboard/CreatePost/CreateFBPost";
import {ScheduledPost} from "./frontend/FBDashboard/ScheduledPosts/ScheduledPost";

function App() {
  const dispatch = useDispatch();
  
  useEffect(() => {
    dispatch(loadUser());
  }, []);

  return (
    <div className="App">
      <BrowserRouter>
        <Switch>
          <Route exact path="/" component={LandingPage} />
          <Route exact path="/signup" component={Signup} />
          <Route exact path="/login" component={Login} />
          <Route exact path="/fbUser" component={FBUSer} />
          <Route exact path="/createFbPost" component={CreateFBPost} />
          <Route exact path='/scheduledPosts' component={ScheduledPost}/>
          <PrivateRoute exact path="/dashboard" component={Dashboard} />
          <PrivateRoute exact path="/accSetup" component={AccountSetup} />
        </Switch>
      </BrowserRouter>
    </div>
  );
}

export default App;
