import React from "react";
import { Button } from "bootstrap";

import { NavLink } from "reactstrap";
import "./InfoSection.css";
import { useHistory } from "react-router-dom";

function InfoSection(props) {
  const history = useHistory();
  return (
    <div>
      <div className="main-div">
        <div >
          <img className="image" src={props.image} alt="" />
        </div>
        <div className="content-main">
          <div className="content">
            <h1>{props.firstContent} </h1>

            <h1 className={props.classes}> {props.secondContent}</h1>
          </div>

          <div className="content-below">
            <p>{props.contentBelowOne}</p>
            <br />
            <p> {props.contentBelowTwo}</p>
          </div>
          {props.btnText ? (
            props.btnText === "Start Trial Now" ? (
              <div className="trial-button">
                <button
                  className={`btn btn-primary btn-lg`}
                  onClick={() => history.push("/login")}
                >
                  <span className={`btnText `}>{props.btnText}</span>
                </button>
              </div>
            ) : (
              <div className="learn-more">
                <button
                  className={`btn btn-primary  btn-lg`}
                  onClick={() => history.push("/signup")}
                >
                  <span className={`btnText `}>{props.btnText}</span>
                </button>
              </div>
            )
          ) : null}
        </div>
      </div>
    </div>
  );
}

export default InfoSection;
