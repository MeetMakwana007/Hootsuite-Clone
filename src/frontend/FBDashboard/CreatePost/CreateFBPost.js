import { React, useCallback, useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import { useInitFbSDK } from "./useInitFbSDK";
import dayjs from "dayjs";

import DateTimePicker from 'react-datetime-picker';

import "./CreateFBPost.css";

const PAGE_ID = localStorage.getItem("pageID");
const PAGE_TOKEN = localStorage.getItem("pageAccessToken");
const USER_TOKEN = localStorage.getItem("FBUser_Token");
const USR_ID = localStorage.getItem("FBUser_Id");

function CreateFBPost() {
  // Initializes the Facebook SDK
  const isFbSDKInitialized = useInitFbSDK();
  const history = useHistory();
  const [value, onChange] = useState(new Date());

  console.log("---------------->",value)

  // App state
  const [fbUserAccessToken, setFbUserAccessToken] = useState();
  const [fbPageAccessToken, setFbPageAccessToken] = useState();
  const [postText, setPostText] = useState();
  const [isPublishing, setIsPublishing] = useState(false);

  // Logs in a Facebook user
  //   const logInToFB = useCallback(() => {
  //     window.FB.login((response) => {
  //       setFbUserAccessToken(response.authResponse.accessToken);
  //     });
  //   }, []);

  // Logs out the current Facebook user
  //   const logOutOfFB = useCallback(() => {
  //     window.FB.logout(() => {
  //       setFbUserAccessToken(null);
  //       setFbPageAccessToken(null);
  //     });
  //   }, []);

  // Checks if the user is logged in to Facebook
  useEffect(() => {
    if (isFbSDKInitialized) {
      window.FB.getLoginStatus(() => {
        setFbUserAccessToken(USER_TOKEN);
      });
    }
  }, [isFbSDKInitialized]);

  // Fetches an access token for the page
  useEffect(() => {
    if (fbUserAccessToken) {
      window.FB.api(
        `/${PAGE_ID}?fields=access_token&access_token=${fbUserAccessToken}`,
        () => setFbPageAccessToken(PAGE_TOKEN)
      );
    }
  }, [fbUserAccessToken]);


  const time = Math.round((new Date(value).getTime() - new Date().getTime()) / 1000);
  console.log("difffff",time);
  // Publishes a post on the Facebook page
  const sendPostToPage = useCallback(() => {
    setIsPublishing(true);

    window.FB.api(
      `/${PAGE_ID}/feed`,
      "POST",
      {
        message: postText,
        access_token: fbPageAccessToken,
        scheduled_publish_time: Math.round(new Date().getTime() / 1000) + time ,
        published: false
        //new Date(value).getTime()/1000
      },
      (response) => {
        console.log("this is.......",response);
        setPostText("");
        setIsPublishing(false);
        history.push("/fbUser");
      }
    );
  }, [postText, fbPageAccessToken]);

  // UI with custom styling from ./styles.css`
  return (
    <div id="app">
      <header id="app-header">
        <p id="logo-text">Create Post</p>
        {fbUserAccessToken ? null : (
          <button
            className="btn confirm-btn"
            style={{ backgroundColor: "white" }}
          >
            Login with Facebook
          </button>
        )}
      </header>
      <main id="app-main">
        {fbPageAccessToken ? (
          <section className="app-section">
            <h3>Write something for Post</h3>
            <textarea
              value={postText}
              onChange={(e) => setPostText(e.target.value)}
              placeholder="Message..."
              rows="8"
              disabled={isPublishing}
            />
            <div style={{backgroundColor:'white'}} title="Schedule time to Post">
            <DateTimePicker amPmAriaLabel onChange={onChange} value={value}  />
            </div>
            <button
              onClick={sendPostToPage}
              className="btn confirm-btn"
              disabled={!postText || isPublishing}
              style={{ backgroundColor: "white" }}
            >
              {isPublishing ? "Publishing..." : "Publish"}
            </button>
          </section>
        ) : (
          <h2 className="placeholder-container">Welcome!</h2>
        )}
      </main>
    </div>
  );
}

export default CreateFBPost;
