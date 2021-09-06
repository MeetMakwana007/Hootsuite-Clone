import React, { useCallback, useEffect, useState } from "react";
import FacebookLogin from "react-facebook-login";
import { useHistory } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { logout } from "../actions/loginAction";

import "./AccountSetup.css";

function AccountSetup() {
  const history = useHistory();
  const [email, setEmail] = useState();
  const [password, setPassword] = useState();
  var logindata = useSelector((state) => state.loginReducer);
  const dispatch = useDispatch();

  const authenticate = async (response) => {
    // setUserName(response.name);
    // setUserIMG(response.picture.data.url);

    console.log(response);
    localStorage.setItem("FBUser_Id", response.userID);
    localStorage.setItem("FBUser_Token", response.accessToken);
    // dispatch(fbUserData(response));
    console.log(history);
    history.push("/fbUser");  

    // Api call to server so we can validate the token

    // const api = 'https://graph.facebook.com/v11.0/1238300463307590/feed?fields=created_time,picture,story_tags&access_token=EAAKZB4SobvT8BAJq0Ic66aTnXlam9QOYrh2e3hzsFEElKlPZCT6LQL9o9QFnJuvJGZATprHvKu8dUMWZAuZBhcAZBqvrflcz5ZAtjbFLvWp0XdTazRQiVzy9onYRNXSqe2sC82VCQ40XYHVrkFiNf4zIu7Xh1KfFbZBDVc2QbzopgQZDZD';
    // const api = 'https://graph.facebook.com/v11.0/{1076855879134868}/feed?fields=created_time,picture,story_tags&access_token=EAAKZB4SobvT8BAD3qrwwhnk3WZBdluthOHuiglasZC1V5YexZAgvuc6v6GJhvLMdmNMHdC8EaJEZCeSGHY3pm84AJhhEYajsNelnZCZBb2TP9eR27xlaMYMiae8zIORMtLhM3wGi9oZAdOgZA0bPeSebsYKVJNpxIEIpw67qBGAgue2bfkbkGDl4L';
  };

  // action for logout
  const logoutHandler = () => {
    setEmail("");
    setPassword("");
    dispatch(logout());
    history.push("/");
  };

  return (
    <div style={{ backgroundColor: "#f4f1ef" }}>
      <div className="navbar">
        <div className="imgdiv">
          <img
            src="data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHZpZXdCb3g9IjAgMCAzNjAuNSA4NyI+PHBhdGggZD0iTTg4LjE5IDE3Ljc1djE2LjcxaDE2LjE0VjE3Ljc1aDkuNzd2NDMuMzNoLTkuNzdWNDMuMDFIODguMTl2MTguMDdoLTkuNzdWMTcuNzVoOS43N3ptNDUuOTIgMzcuMDNjMy44NiAwIDYuMjQtMy44IDYuMjQtOS40NSAwLTQuNjMtMS44LTkuMzktNi4yNC05LjM5LTQuNjMgMC02LjQzIDQuNzYtNi40MyA5LjQ1IDAgNS4zMyAyLjI1IDkuMzkgNi4zNiA5LjM5em0tLjE5IDdjLTkuMTkgMC0xNi4yNy02LTE2LjI3LTE2LjJzNi42OS0xNi42NSAxNi44NC0xNi42NWM5LjU4IDAgMTYgNi42MiAxNiAxNi4xNCAwIDExLjQ0LTguMTYgMTYuNzEtMTYuNTIgMTYuNzF6bTM2LjMyLTdjMy44NiAwIDYuMjQtMy44IDYuMjQtOS40NSAwLTQuNjMtMS44LTkuMzktNi4yNC05LjM5LTQuNjMgMC02LjQzIDQuNzYtNi40MyA5LjQ1IDAgNS4zMyAyLjI1IDkuMzkgNi4zNyA5LjM5em0tLjE5IDdjLTkuMTkgMC0xNi4yNi02LTE2LjI2LTE2LjJzNi42OS0xNi42NSAxNi44NC0xNi42NWM5LjU4IDAgMTYgNi42MiAxNiAxNi4xNCAwIDExLjQ0LTguMTcgMTYuNzEtMTYuNTMgMTYuNzF6bTIwLjE1LTI0Ljk0djEyLjkyYzAgNC40NC45IDcuNDYgMi43IDkuMzJhMTAuNDEgMTAuNDEgMCAwMDcuMzkgMi43IDIwLjU4IDIwLjU4IDAgMDA2LjMtLjg0bC0uMDctNy4zOWExMS44NSAxMS44NSAwIDAxLTIuODkuMjZjLTIuODkgMC0zLjg2LTEuNzQtMy44Ni01LjUzVjM2Ljg0aDd2LTcuMmgtN3YtOS41M2E5LjUzIDkuNTMgMCAwMC05LjU0IDkuNTN6bTEwMC4xIDB2MTIuOTJjMCA0LjQ0LjkgNy40NiAyLjcgOS4zMmExMC40MiAxMC40MiAwIDAwNy4zOSAyLjcgMjAuNiAyMC42IDAgMDA2LjMtLjg0bC0uMDctNy4zOWExMS44OCAxMS44OCAwIDAxLTIuODkuMjZjLTIuODkgMC0zLjg2LTEuNzQtMy44Ni01LjUzVjM2Ljg0aDd2LTcuMmgtN3YtOS41M2E5LjUzIDkuNTMgMCAwMC05LjU0IDkuNTN6bS03OC4zNiAxNS43NWExOS4wOSAxOS4wOSAwIDAwOC40MiAyLjMxYzMgMCA0LjE4LTEgNC4xOC0yLjU3cy0xLTIuNDUtNC41Ny0zLjY3Yy02LjU2LTIuMTItOS4wNy01LjcyLTktOS4zOCAwLTUuOTIgNS0xMC4zNSAxMi43OS0xMC4zNWEyMC42NSAyMC42NSAwIDAxOC44MSAxLjg2bC0xLjY3IDYuNjlhMTYuNzIgMTYuNzIgMCAwMC02LjgyLTEuNzRjLTIuMzggMC0zLjcyIDEtMy43MiAyLjUxczEuMjIgMi4zMiA1LjA4IDMuNjdjNiAyIDguNDIgNS4wNyA4LjQ5IDkuNjQgMCA1LjkyLTQuNTYgMTAuMjItMTMuNTYgMTAuMjJhMjIuMjEgMjIuMjEgMCAwMS0xMC4xNi0yLjI1em01NS4zLTEuNTljMCA0LjExLjEzIDcuNDYuMjYgMTAuMDlIMjU5bC0uNDUtNC40NGgtLjE5YTExLjIxIDExLjIxIDAgMDEtOS44MyA1LjE0Yy02LjQzIDAtMTEuMDYtNC0xMS4wNi0xMy42OVYyOS42NGg5Ljc3djE2LjkxYzAgNC41NiAxLjQ4IDcuMzIgNSA3LjMyYTUuNDIgNS40MiAwIDAwNS4yNy01LjUzdi0xOC43aDkuNzd6bTYuNjgtMjEuMzZoOS43OHYzMS40NGgtOS43OHptNC44My00LjEyYTUuMTIgNS4xMiAwIDAxLTUuNC01LjIxYzAtMyAyLjE5LTUuMjEgNS41My01LjIxYTUuMjIgNS4yMiAwIDExLS4wNiAxMC40MnptNTEuOTYgMTYuMmMwLTIuMzEtMS02LjM3LTUuNDctNi4zNy00LjE4IDAtNS44NSAzLjc5LTYuMTEgNi4zN3ptLTExLjUxIDYuNjljLjMyIDQuMTIgNC4zMSA2IDguODcgNmEyNS45IDI1LjkgMCAwMDguNjgtMS4zNWwxLjI1IDYuNjdhMjkuNzcgMjkuNzcgMCAwMS0xMS4zOCAyYy0xMC42NyAwLTE2Ljc4LTYuMTctMTYuNzgtMTYuMDcgMC04IDUtMTYuNzggMTUuODgtMTYuNzggMTAuMTYgMCAxNCA3LjkxIDE0IDE1LjY5YTI1LjI0IDI1LjI0IDAgMDEtLjMyIDMuOTJ6TTQzLjkyIDguMzJhMjUuMjMgMjUuMjMgMCAwMC0yNS4zMyAwQTI1IDI1IDAgMDA2IDV2MjUuMjNhNTAuNTEgNTAuNTEgMCAwMDUwLjUxIDUwLjUyVjVhMjUgMjUgMCAwMC0xMi41OSAzLjMyeiIvPjxwYXRoIGQ9Ik00Mi4xMyAxNC4xMWExMC44MyAxMC44MyAwIDAwLTEwLjgxIDkuODR2LS4wNy4wN2ExMC44NSAxMC44NSAwIDEwLTUgMTAuMWw1IDUuMDYgNS4wNy01YTEwLjgzIDEwLjgzIDAgMTA1Ljg0LTIwem0tMjEuNzEgMThBNy4yMiA3LjIyIDAgMTEyMi41OSAxOGEzLjYxIDMuNjEgMCAxMDQuNzUgNC43OCA3LjIzIDcuMjMgMCAwMS02LjkzIDkuMzR6bTIxLjY2LjA2YTcuMjIgNy4yMiAwIDAxLTYuODctOS4zN0EzLjYxIDMuNjEgMCAxMDQwIDE4YTcuMjIgNy4yMiAwIDExMi4xIDE0LjEyeiIgZmlsbD0iI2ZmZiIvPjxwYXRoIGQ9Ik0zNDQuMTggMzUuMTRhNS43IDUuNyAwIDAxLjc3LTIuODggNS42MiA1LjYyIDAgMDEyLjExLTIuMTIgNS43OCA1Ljc4IDAgMDE1Ljc3IDAgNS42MyA1LjYzIDAgMDEyLjEyIDIuMTEgNS43NyA1Ljc3IDAgMTEtMTAuNzYgMi44OXptLjgxIDBhNSA1IDAgMDA1IDUgNC44MiA0LjgyIDAgMDAyLjQ4LS42NyA1IDUgMCAwMDEuODEtMS44MSA0Ljk0IDQuOTQgMCAwMDAtNSA1IDUgMCAwMC0xLjgxLTEuODEgNC45NCA0Ljk0IDAgMDAtNSAwIDUgNSAwIDAwLTEuODEgMS44MSA0LjgxIDQuODEgMCAwMC0uNjYgMi40OHptNy4zLTEuNGExLjg2IDEuODYgMCAwMS0uMzMgMS4wOCAxLjkzIDEuOTMgMCAwMS0uOTIuN2wxLjgyIDNoLTEuMjlMMzUwIDM1Ljg1aC0xdjIuNzFoLTEuMTN2LTYuODNoMmEyLjg4IDIuODggMCAwMTEuODcuNSAxLjg3IDEuODcgMCAwMS41NCAxLjUxek0zNDkgMzQuOWguODNhMS40NiAxLjQ2IDAgMDAxLS4zMiAxIDEgMCAwMC4zNy0uODEgMSAxIDAgMDAtLjMzLS44MiAxLjc0IDEuNzQgMCAwMC0xLS4yNUgzNDl6Ii8+PC9zdmc+"
            alt=""
          />
        </div>
        <button
          className="btn-primary logout"
          style={{ marginRight: "10px  " }}
          onClick={() => logoutHandler()}
        >
          Logout
        </button>
      </div>
      <br />
      <div className="h2Text">
        <p>Connect your social accounts to get started</p>
      </div>
      <div className="main-container">
        <h5 style={{ paddingTop: "10px" }}>
          Add 2 profiles, pages, groups, or channels.
          <br />
          Choose a social network to get started:
        </h5>
        <div className="sub">
          <FacebookLogin
            appId="772824236801343"
            textButton="LOGIN WITH FACEBOOK"
            size="medium"
            fields="name,email,picture"
            callback={authenticate}
          />
        </div>
      </div>
    </div>
  );
}

export default AccountSetup;
