import React, { useEffect } from "react";
import FBCommonLayout from "../FBCommonLayout/FBCommonLayout";

export const ScheduledPost = () => {
  const pageID = localStorage.getItem("pageID");
  const pageAccessToken = localStorage.getItem("pageAccessToken");

  const getScheduledPostsAPI = () => {
     fetch(
      `https://graph.facebook.com/v11.0/${pageID}/scheduled_posts?access_token=${pageAccessToken}`,

    )
    .then((resp) => console.log("resp",resp)).catch(err=>console.log(err));
  };

  useEffect(() => {
    getScheduledPostsAPI();
  }, [getScheduledPostsAPI])

  return (
    <div>
      {/* <FBCommonLayout
            
            
            
            /> */}
    </div>
  );
};
