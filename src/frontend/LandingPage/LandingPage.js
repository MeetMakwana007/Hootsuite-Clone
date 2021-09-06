import React, { useEffect, useState } from "react";
import NavbarHome from "./navbarHome/NavbarHome";
import InfoSection from "./InfoSection";
import homeFirst from "../../image/homefirst.png";
import homeSecond from "../../image/homesecond.png";
import "./LandingPage.css";
import MiddleSection from "./middleSection/MiddleSection";

import { NavLink } from "reactstrap";
import Footer from "./footer/Footer";
import Login from "../Login/Login";
import { Route, Router, Switch, useHistory } from "react-router-dom";
import Signup from "../SignUp/Signup";
import AccountSetup from "../Account-setup/AccountSetup";
import Dashboard from "../Dashboard/Dashboard";

function LandingPage() {
  const history = useHistory();
  const [user, setUser] = useState(false);

  const loggedInUser = localStorage.getItem("setKey");

  useEffect(() => {
    if (loggedInUser) {
      setUser(true);
    }
  }, [loggedInUser]);
  return (
    // <Switch>
    //   <Route path="/dashboard" component={Dashboard} />
    //   <Route path="/accSetup" component={AccountSetup} />
    //   <Route path="/signup" component={Signup} />
    //   <Route path="/login" component={Login} />
    //   {loggedInUser ? <Dashboard/> : "njnjnj"}

    //   <Route path="/" >
    <>
      <NavbarHome />
      <InfoSection
        image={homeFirst}
        firstContent="Social is "
        secondContent=" your superpower."
        contentBelowOne="Easily manage all your social media and "
        contentBelowTwo="get results with Hootsuite."
        btnText="Start Trial Now"
        classes='stnow'
      />
      <InfoSection
        image={homeSecond}
        firstContent="Hootsuite has "
        secondContent="acquired Heyday 🎉"
        contentBelowOne="Heyday is a customer messaging platform that combines the power of Conversational AI with the human touch of your team, so you can deliver 5-star customer experiences scale."
        contentBelowTwo="Together, Hootsuite and Heyday are building the future of social commerce, with conversations and relationships at the core."
        btnText="Learn More"
        
      />
      <MiddleSection />
      <Footer />
    </>
    //   </Route>
    // </Switch>
  );
}

export default LandingPage;
