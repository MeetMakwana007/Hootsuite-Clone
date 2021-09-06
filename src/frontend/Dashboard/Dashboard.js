import { Alert } from "reactstrap";
import React, { Fragment, useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import AccountSetup from "../Account-setup/AccountSetup";

import Login from "../Login/Login";

function Dashboard() {
  const history = useHistory();
  const [user, setUser] = useState(false);
  const loggedInUser = localStorage.getItem("setKey");
  useEffect(() => {
    // const loggedInUser = localStorage.getItem("setKey");
    // history.replace({ pathname: "dashboard" });
    console.log(loggedInUser, "========================");
    if (loggedInUser) {
      setUser(true);
    }
  }, []);
  return (
    <>
   {/* <AccountSetup /> */}
      {loggedInUser && <AccountSetup /> }
      {/* {!loggedInUser  && history.push('/login') } */}
    </>
  );
}

export default Dashboard;
