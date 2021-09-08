import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fbUserData } from "../../actions/fbuserdataAction";
import NavigationBar from "../../NavigationBar";
import FBCommonLayout from "../FBCommonLayout/FBCommonLayout";
import "./FBUser.css";
import dayjs from "dayjs";

function FBUSer() {
  const dispatch = useDispatch();
  const [groupOfNamePage, setGroupOfNamePage] = useState([]);
  const [selectedPage, setSelectedPage] = useState("");
  const [pageAllPosts, setPageAllPosts] = useState([]);
  const [onConfirmPage, setOnConfirmPage] = useState("");
  const [pageProfile, setPageProfile] = useState("");

  var fbuserdata = useSelector((state) => state.fbuserdataReducer);

  useEffect(() => {
    console.log(selectedPage);
  }, [selectedPage]);

  useEffect(() => {
    var findUserData = async (id, token) => {
      console.log(fbuserdata);
      dispatch(fbUserData(fbuserdata));

      //user feed start

      // const api =
      //   await `https://graph.facebook.com/v11.0/${id}/feed?fields=created_time,picture,story_tags&access_token=${token}`;

      // const resp = await fetch(api);
      // const data = resp.json();

      // data.then((res) => {
      //   console.log(res);
      //   for (const i in res.data) {
      //     if (res.data[i].picture) {
      //       var elem = document.createElement("img");
      //       elem.setAttribute("src", res.data[i].picture);
      //       elem.setAttribute("height", 200);
      //       elem.setAttribute("width", 200);
      //       document.getElementById("imgdiv").appendChild(elem);
      //     }

      //   }

      // });

      //user feed end

      //   function getPageName(){
      //          fetch(`https://graph.facebook.com/v11.0/${id}/accounts?access_token=${token}`)
      //         .then(results=> results.json())
      //         .then(results => setgroupOfNamePage( arr => [...arr, `${arr.length}`])
      //   }
      var api2 =
        await `https://graph.facebook.com/v11.0/${id}/accounts?access_token=${token}`;

      var response = await fetch(api2);
      var dataOfPageName = response.json();

      dataOfPageName.then((ans) => {
        console.log(ans);
        let data = [];
        for (var i in ans.data) {
          data.push(ans.data[i].name);
          console.log(ans.data[i].name);
          console.log(ans.data[i].id, ans.data[i].access_token);
          // localStorage.setItem(
          //   `Page-Name${ans.data[i].name}`,
          //   ans.data[i].name
          // );
          // localStorage.setItem(
          //   `tokenOF${ans.data[i].name}`,
          //   ans.data[i].access_token
          // );
        }

        setGroupOfNamePage(data);
        console.log(groupOfNamePage);

        localStorage.setItem("new-data", JSON.stringify(ans.data));
      });
    };

    findUserData(
      localStorage.getItem("FBUser_Id"),
      localStorage.getItem("FBUser_Token")
    );
  }, []);

  // page data
  const pageDetails = async (item) => {
    const pageArrayDataString = JSON.parse(localStorage.getItem("new-data"));
    const pageDataInObject = pageArrayDataString.find(
      (elem) => elem.name === selectedPage
    );
    setOnConfirmPage(pageDataInObject.name);
    console.log("pageinfo", pageDataInObject.access_token);
    localStorage.setItem("pageAccessToken", pageDataInObject.access_token);
    localStorage.setItem("pageID", pageDataInObject.id);

    //getting page profile picture
    const pageProfilePicture = `http://graph.facebook.com/${pageDataInObject.id}/picture?access_token=${pageDataInObject.access_token}`;
    setPageProfile(pageProfilePicture);

    //getting page post
    const getPagePostsAPI = `https://graph.facebook.com/v11.0/${pageDataInObject.id}/feed?fields=full_picture,message,created_time&access_token=${pageDataInObject.access_token}`;
    console.log("details of page is here--->", getPagePostsAPI);

    const pageAllPostResponse = fetch(getPagePostsAPI);

    (await pageAllPostResponse).json().then((e) => {
      setPageAllPosts(e.data);
      console.log("pagedata", e.data);
    });
  };

  return (
    <>
      <div style={{ minHeight: "100vh", backgroundColor: "#252526" }}>
        <NavigationBar
          firstLink="Get Posts"
          secondLink="Create/Schedule Post"
          thirdLink="Scheduled Posts"
        />
        <button
          type="button"
          className="btn btn-danger"
          data-toggle="modal"
          data-target="#exampleModalCenter"
          style={{ margin: "20px" }}
        >
          Grab the Page
        </button>

        <div
          className="modal fade"
          id="exampleModalCenter"
          tabIndex="-1"
          role="dialog"
          aria-labelledby="exampleModalCenterTitle"
          aria-hidden="true"
        >
          <div className="modal-dialog modal-dialog-centered" role="document">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title" id="exampleModalLongTitle">
                  Select the Page that you want:
                </h5>
                <button
                  type="button"
                  className="close"
                  data-dismiss="modal"
                  aria-label="Close"
                >
                  <span aria-hidden="true">&times;</span>
                </button>
              </div>
              <div className="modal-body">
                {groupOfNamePage?.map((item) => (
                  <div>
                    <input
                      type="radio"
                      id=""
                      name=""
                      defaultChecked={selectedPage}
                      checked={selectedPage === item}
                      onChange={() => {
                        setSelectedPage(item);
                      }}
                    />
                    <label
                      htmlFor="page-name"
                      style={{ marginLeft: "5px" }}
                      value={item}
                    >
                      {item}
                    </label>
                  </div>
                ))}
              </div>
              <div className="modal-footer">
                <button
                  type="button"
                  className="btn btn-primary"
                  onClick={pageDetails}
                  data-dismiss="modal"
                >
                  Confirm
                </button>
                <button
                  type="button"
                  className="btn btn-secondary"
                  data-dismiss="modal"
                >
                  Close
                </button>
              </div>
            </div>
          </div>
        </div>
        <div className="post-container">
          {pageAllPosts?.map((e) => (
            <>
              <FBCommonLayout
                profilePic={pageProfile}
                createdTime={dayjs(e.created_time).format("D/MMM/YYYY h:mm A")}
                pagename={onConfirmPage}
                postImage={e.full_picture}
                message={e.message}
              />
            </>
          ))}
        </div>
      </div>
    </>
  );
}

export default FBUSer;
