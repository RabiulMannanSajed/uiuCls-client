import React from "react";
import NewFeedPostUp from "../NewFeedPostUp/NewFeedPostUp";
import NewFeedPosts from "../NewFeedPosts/NewFeedPosts";
import "./FeedCss.css";
const NewFeedHome = () => {
  return (
    <div className=" w-[60%] m-auto contentUpdate">
      <NewFeedPostUp></NewFeedPostUp>
      <NewFeedPosts></NewFeedPosts>
    </div>
  );
};

export default NewFeedHome;
