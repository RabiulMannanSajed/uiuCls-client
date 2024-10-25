import React from "react";
import useContent from "../../hooks/useContent";
import NewFeedPosts from "../NewFeedPosts/NewFeedPosts";

const NewFeedPost = () => {
  const [contents, refetch] = useContent();
  return (
    <div>
      {contents.map((job) => (
        <NewFeedPosts key={job._id} job={job} />
      ))}
    </div>
  );
};

export default NewFeedPost;
