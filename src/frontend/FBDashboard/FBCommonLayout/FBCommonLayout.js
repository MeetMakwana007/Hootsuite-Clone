import React from "react";
import { Button } from "react-bootstrap";
import "./FBCommonLayout.css";

function FBCommonLayout(props) {
  return (
    <div>
      <div className="mainDiv">
        <div style={{ textAlign: "center" }}>
          <div style={{padding: "10px 0",
              backgroundColor: 'lightgrey'}}>
          <div
            style={{
              display: "flex",
              justifyContent: "center",
              
            }}
          >
            <div className="imgClass">
              <img classname="profile_pic" src={props.profilePic} />
            </div>
            <div className="PageName">{props.pagename}</div>
          
          </div>
          <div style={{fontSize:'14px'}}>{props.createdTime}</div>
          </div>
          <div className="text">{props.message}</div>

          {props.postImage ? (
            
              <div className="img">
                <img src={props.postImage} />
              </div>
           
          ) : null}
          <div
            className="buttons"
            style={{ marginTop: "100px", display: "flex" }}
          >
            <div style={{ marginRight: "15px" }}>
              <Button variant="primary" size="">
                Like
              </Button>
            </div>
            <div style={{ marginRight: "15px" }}>
              <Button variant="light">Comment</Button>
            </div>
            <Button variant="outline-secondary">Share</Button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default FBCommonLayout;
