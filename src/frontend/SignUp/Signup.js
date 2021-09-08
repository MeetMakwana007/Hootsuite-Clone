import React, { useState } from "react";
import "./Signup.css";
import image from "../../image/success.svg";
import { useHistory } from "react-router-dom";
import { Alert } from "@material-ui/lab";
import axios from "../axios";

function Signup() {
  const history = useHistory();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [cpassword, setCpassword] = useState("");

  //email validation
  let errors = {};
  if (email) {
    var pattern = new RegExp(
      /^(("[\w-\s]+")|([\w-]+(?:\.[\w-]+)*)|("[\w-\s]+")([\w-]+(?:\.[\w-]+)*))(@((?:[\w-]+\.)*\w[\w-]{0,66})\.([a-z]{2,6}(?:\.[a-z]{2})?)$)|(@\[?((25[0-5]\.|2[0-4][0-9]\.|1[0-9]{2}\.|[0-9]{1,2}\.))((25[0-5]|2[0-4][0-9]|1[0-9]{2}|[0-9]{1,2})\.){2}(25[0-5]|2[0-4][0-9]|1[0-9]{2}|[0-9]{1,2})\]?$)/i
    );
    if (!pattern.test(email)) {
      errors["email"] = "Please enter valid email address.";
    }
  }

  //password strength check

  if (password) {
    let strongPassword = new RegExp(
      "(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[^A-Za-z0-9])(?=.{8,})"
    );
    if (!strongPassword.test(password)) {
      errors["password"] =
        "Password Must have atleast 8 characters along with 1 special character,1 number and must contain atleast one small and capital Alphabet";
    }
  }

  // submitting userdata
  const submitData = async (e) => {
    e.preventDefault();
    const registered = {
      email: email,
      password: password,
    };

    console.log(registered);

    if (password === cpassword) {
      await axios
        .post("/signup", registered)
        .then((response) => {
          console.log(response.data);
          history.push("/login");
        })
        .catch((err) => console.log(err));
    } else {
      alert("Both Password must be matched, Try again");
      setCpassword("");
    }
  };

  return (
    <>
      <div
        style={{
          backgroundColor: "rgb(226,135,67)",
          color: "whitesmoke",
          height: "100vh",
          display: "flex",
          overflow: "hidden",
        }}
      >
        <img
          src="data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHZpZXdCb3g9IjAgMCAzNjAuNSA4NyI+PHBhdGggZD0iTTg4LjE5IDE3Ljc1djE2LjcxaDE2LjE0VjE3Ljc1aDkuNzd2NDMuMzNoLTkuNzdWNDMuMDFIODguMTl2MTguMDdoLTkuNzdWMTcuNzVoOS43N3ptNDUuOTIgMzcuMDNjMy44NiAwIDYuMjQtMy44IDYuMjQtOS40NSAwLTQuNjMtMS44LTkuMzktNi4yNC05LjM5LTQuNjMgMC02LjQzIDQuNzYtNi40MyA5LjQ1IDAgNS4zMyAyLjI1IDkuMzkgNi4zNiA5LjM5em0tLjE5IDdjLTkuMTkgMC0xNi4yNy02LTE2LjI3LTE2LjJzNi42OS0xNi42NSAxNi44NC0xNi42NWM5LjU4IDAgMTYgNi42MiAxNiAxNi4xNCAwIDExLjQ0LTguMTYgMTYuNzEtMTYuNTIgMTYuNzF6bTM2LjMyLTdjMy44NiAwIDYuMjQtMy44IDYuMjQtOS40NSAwLTQuNjMtMS44LTkuMzktNi4yNC05LjM5LTQuNjMgMC02LjQzIDQuNzYtNi40MyA5LjQ1IDAgNS4zMyAyLjI1IDkuMzkgNi4zNyA5LjM5em0tLjE5IDdjLTkuMTkgMC0xNi4yNi02LTE2LjI2LTE2LjJzNi42OS0xNi42NSAxNi44NC0xNi42NWM5LjU4IDAgMTYgNi42MiAxNiAxNi4xNCAwIDExLjQ0LTguMTcgMTYuNzEtMTYuNTMgMTYuNzF6bTIwLjE1LTI0Ljk0djEyLjkyYzAgNC40NC45IDcuNDYgMi43IDkuMzJhMTAuNDEgMTAuNDEgMCAwMDcuMzkgMi43IDIwLjU4IDIwLjU4IDAgMDA2LjMtLjg0bC0uMDctNy4zOWExMS44NSAxMS44NSAwIDAxLTIuODkuMjZjLTIuODkgMC0zLjg2LTEuNzQtMy44Ni01LjUzVjM2Ljg0aDd2LTcuMmgtN3YtOS41M2E5LjUzIDkuNTMgMCAwMC05LjU0IDkuNTN6bTEwMC4xIDB2MTIuOTJjMCA0LjQ0LjkgNy40NiAyLjcgOS4zMmExMC40MiAxMC40MiAwIDAwNy4zOSAyLjcgMjAuNiAyMC42IDAgMDA2LjMtLjg0bC0uMDctNy4zOWExMS44OCAxMS44OCAwIDAxLTIuODkuMjZjLTIuODkgMC0zLjg2LTEuNzQtMy44Ni01LjUzVjM2Ljg0aDd2LTcuMmgtN3YtOS41M2E5LjUzIDkuNTMgMCAwMC05LjU0IDkuNTN6bS03OC4zNiAxNS43NWExOS4wOSAxOS4wOSAwIDAwOC40MiAyLjMxYzMgMCA0LjE4LTEgNC4xOC0yLjU3cy0xLTIuNDUtNC41Ny0zLjY3Yy02LjU2LTIuMTItOS4wNy01LjcyLTktOS4zOCAwLTUuOTIgNS0xMC4zNSAxMi43OS0xMC4zNWEyMC42NSAyMC42NSAwIDAxOC44MSAxLjg2bC0xLjY3IDYuNjlhMTYuNzIgMTYuNzIgMCAwMC02LjgyLTEuNzRjLTIuMzggMC0zLjcyIDEtMy43MiAyLjUxczEuMjIgMi4zMiA1LjA4IDMuNjdjNiAyIDguNDIgNS4wNyA4LjQ5IDkuNjQgMCA1LjkyLTQuNTYgMTAuMjItMTMuNTYgMTAuMjJhMjIuMjEgMjIuMjEgMCAwMS0xMC4xNi0yLjI1em01NS4zLTEuNTljMCA0LjExLjEzIDcuNDYuMjYgMTAuMDlIMjU5bC0uNDUtNC40NGgtLjE5YTExLjIxIDExLjIxIDAgMDEtOS44MyA1LjE0Yy02LjQzIDAtMTEuMDYtNC0xMS4wNi0xMy42OVYyOS42NGg5Ljc3djE2LjkxYzAgNC41NiAxLjQ4IDcuMzIgNSA3LjMyYTUuNDIgNS40MiAwIDAwNS4yNy01LjUzdi0xOC43aDkuNzd6bTYuNjgtMjEuMzZoOS43OHYzMS40NGgtOS43OHptNC44My00LjEyYTUuMTIgNS4xMiAwIDAxLTUuNC01LjIxYzAtMyAyLjE5LTUuMjEgNS41My01LjIxYTUuMjIgNS4yMiAwIDExLS4wNiAxMC40MnptNTEuOTYgMTYuMmMwLTIuMzEtMS02LjM3LTUuNDctNi4zNy00LjE4IDAtNS44NSAzLjc5LTYuMTEgNi4zN3ptLTExLjUxIDYuNjljLjMyIDQuMTIgNC4zMSA2IDguODcgNmEyNS45IDI1LjkgMCAwMDguNjgtMS4zNWwxLjI1IDYuNjdhMjkuNzcgMjkuNzcgMCAwMS0xMS4zOCAyYy0xMC42NyAwLTE2Ljc4LTYuMTctMTYuNzgtMTYuMDcgMC04IDUtMTYuNzggMTUuODgtMTYuNzggMTAuMTYgMCAxNCA3LjkxIDE0IDE1LjY5YTI1LjI0IDI1LjI0IDAgMDEtLjMyIDMuOTJ6TTQzLjkyIDguMzJhMjUuMjMgMjUuMjMgMCAwMC0yNS4zMyAwQTI1IDI1IDAgMDA2IDV2MjUuMjNhNTAuNTEgNTAuNTEgMCAwMDUwLjUxIDUwLjUyVjVhMjUgMjUgMCAwMC0xMi41OSAzLjMyeiIvPjxwYXRoIGQ9Ik00Mi4xMyAxNC4xMWExMC44MyAxMC44MyAwIDAwLTEwLjgxIDkuODR2LS4wNy4wN2ExMC44NSAxMC44NSAwIDEwLTUgMTAuMWw1IDUuMDYgNS4wNy01YTEwLjgzIDEwLjgzIDAgMTA1Ljg0LTIwem0tMjEuNzEgMThBNy4yMiA3LjIyIDAgMTEyMi41OSAxOGEzLjYxIDMuNjEgMCAxMDQuNzUgNC43OCA3LjIzIDcuMjMgMCAwMS02LjkzIDkuMzR6bTIxLjY2LjA2YTcuMjIgNy4yMiAwIDAxLTYuODctOS4zN0EzLjYxIDMuNjEgMCAxMDQwIDE4YTcuMjIgNy4yMiAwIDExMi4xIDE0LjEyeiIgZmlsbD0iI2ZmZiIvPjxwYXRoIGQ9Ik0zNDQuMTggMzUuMTRhNS43IDUuNyAwIDAxLjc3LTIuODggNS42MiA1LjYyIDAgMDEyLjExLTIuMTIgNS43OCA1Ljc4IDAgMDE1Ljc3IDAgNS42MyA1LjYzIDAgMDEyLjEyIDIuMTEgNS43NyA1Ljc3IDAgMTEtMTAuNzYgMi44OXptLjgxIDBhNSA1IDAgMDA1IDUgNC44MiA0LjgyIDAgMDAyLjQ4LS42NyA1IDUgMCAwMDEuODEtMS44MSA0Ljk0IDQuOTQgMCAwMDAtNSA1IDUgMCAwMC0xLjgxLTEuODEgNC45NCA0Ljk0IDAgMDAtNSAwIDUgNSAwIDAwLTEuODEgMS44MSA0LjgxIDQuODEgMCAwMC0uNjYgMi40OHptNy4zLTEuNGExLjg2IDEuODYgMCAwMS0uMzMgMS4wOCAxLjkzIDEuOTMgMCAwMS0uOTIuN2wxLjgyIDNoLTEuMjlMMzUwIDM1Ljg1aC0xdjIuNzFoLTEuMTN2LTYuODNoMmEyLjg4IDIuODggMCAwMTEuODcuNSAxLjg3IDEuODcgMCAwMS41NCAxLjUxek0zNDkgMzQuOWguODNhMS40NiAxLjQ2IDAgMDAxLS4zMiAxIDEgMCAwMC4zNy0uODEgMSAxIDAgMDAtLjMzLS44MiAxLjc0IDEuNzQgMCAwMC0xLS4yNUgzNDl6Ii8+PC9zdmc+"
          alt=""
          className="img"
        />
        <div className="left" style={{ width: "90%", marginLeft: "420px" }}>
          <div className="signin-form">
            <h1 id="registerText">Register</h1>
            <form action="post" onSubmit={submitData}>
              <div className="email">
                <label className="labelEmail" style={{ marginLeft: "-210px" }}>
                  Email:
                </label>
                <br />
                <input
                  required
                  style={{ outline: "none" }}
                  type="email"
                  onChange={(e) => {
                    setEmail(e.target.value);
                  }}
                  value={email}
                  id=""
                />
              </div>

              {errors.email ? (
                <Alert severity="error">{errors.email}</Alert>
              ) : null}

              <div className="password">
                <label
                  className="labelPassword"
                  style={{ marginLeft: "-180px" }}
                >
                  Password:
                </label>
                <br />
                <input
                  required
                  style={{ outline: "none" }}
                  type="password"
                  onChange={(e) => {
                    setPassword(e.target.value);
                  }}
                  value={password}
                  id=""
                />
              </div>
              {errors.password ? (
                <Alert severity="error">{errors.password}</Alert>
              ) : null}

              <div className="cpassword">
                <label
                  className="labelCPassword"
                  style={{ marginLeft: "-115px" }}
                >
                  Confirm Password:
                </label>
                <br />
                <input
                  required
                  style={{ outline: "none" }}
                  type="password"
                  onChange={(e) => {
                    setCpassword(e.target.value);
                  }}
                  value={cpassword}
                  id=""
                />
              </div>
              <div>
                <button className="btn btn-success registerBtn" type="submit">
                  Register
                </button>
              </div>
            </form>
            <button className="btn btn-primary troubleshootBtn">
              Need Help? Troubleshoot
            </button>
          </div>
        </div>

        <div className="right">
          <img src="" alt="" />
        </div>
      </div>
    </>
  );
}

export default Signup;
