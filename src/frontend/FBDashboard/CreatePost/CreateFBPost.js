import { React, useCallback, useEffect, useRef, useState } from "react";
import { useHistory } from "react-router-dom";
import { useInitFbSDK } from "./useInitFbSDK";
import InputEmoji from "react-input-emoji";
import Picker from "emoji-picker-react";
import DateTimePicker from "react-datetime-picker";

import "./CreateFBPost.css";

const PAGE_ID = localStorage.getItem("pageID");
const PAGE_TOKEN = localStorage.getItem("pageAccessToken");
const USER_TOKEN = localStorage.getItem("FBUser_Token");
const USR_ID = localStorage.getItem("FBUser_Id");

function CreateFBPost() {
  // Initializes the Facebook SDK
  const isFbSDKInitialized = useInitFbSDK();
  const history = useHistory();
  const [value, setValue] = useState(new Date());
  const [v1, setV1] = useState(new Date());

  const [text, setText] = useState("");

  function handleOnEnter(text) {
    console.log("enter", text);
  }
  // const ref = useRef(null);
  // const onEmojiClick = (event, emojiObject) => {
  //   const cursor = ref.current.selectionStart;
  //   const text = postText.slice(0, cursor) + emojiObject.emoji + postText.slice(cursor);
  //   setPostText(text);
  // };

  // console.log("---------------->", value, "v1111", v1);

  function onChange(e) {
    console.log("onCHange......", e);
    setV1(e);
  }

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

  // Publishes a post on the Facebook page
  const sendPostToPage = () => {
    console.log("UseCallBack set Time", v1);

    const time = Math.round(
      (new Date(v1).getTime() - new Date().getTime()) / 1000
    );
    // console.log(
    //   "old",
    //   v1,
    //   "current",
    //   new Date(),
    //   "diff",
    //   new Date(v1).getTime() - new Date().getTime(),
    //   "new",
    //   time
    // );
    setIsPublishing(true);
    const payload = {
      message: postText,
      access_token: fbPageAccessToken,
    };

    console.log("iffff", time);
    if (time > 0) {
      // console.log("timeasdasdas",time);
      payload.scheduled_publish_time =
        Math.round(new Date().getTime() / 1000) + time;
      payload.published = false;
      console.log("Final Payload-----------", payload);
    }

    window.FB.api(`/${PAGE_ID}/feed`, "POST", payload, (response) => {
      console.log("Api res", response);
      if (response?.error?.message) {
        setV1(new Date());
        alert("Specify Scheduled Time between 10 Minutes to 6 Months");

        setIsPublishing(false);
      } else {
        console.log("this is.......In suceesss", response);
        setPostText("");
        setIsPublishing(false);
        history.push("/fbUser");
        setV1(new Date());
      }
    });
  };

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
            {/* <textarea
           
              value={postText}
              onChange={(e) => setPostText(e.target.value)}
              placeholder="Message..."
              rows="8"
              disabled={isPublishing}
            /> */}
            <div style={{ marginTop: "20px" }}>
              <InputEmoji
                value={postText}
                onChange={setPostText}
                cleanOnEnter
                onEnter={handleOnEnter}
                placeholder="Type a message"
              />

              {/* <div>
             
              <Picker onEmojiClick={onEmojiClick} />
            </div> */}
              <div style={{ marginTop: "20px" }} title="Schedule time to Post">
                <DateTimePicker
                  amPmAriaLabel
                  style={{ backgroundColor: "white" }}
                  onChange={onChange}
                  value={v1}
                />
              </div>

             
              <button
                onClick={sendPostToPage}
                className="btn confirm-btn"
                disabled={!postText || isPublishing}
                style={{
                  marginTop: "20px",
                  color: "rgb(255,255,255)",
                  backgroundColor: "rgb(24, 119, 242)",
                  fontWeight: 900,
                  borderRadius: "10px",
                  cursor: "pointer",

                  width: "30%",
                }}
              >
                {isPublishing ? "Publishing..." : "Publish"}
              </button>
            </div>
          </section>
        ) : (
          <h2 className="placeholder-container">Welcome!</h2>
        )}
      </main>
    </div>
  );
}

export default CreateFBPost;
