import React from "react";
import useContent from "../Pages/hooks/useContent";
import useCommentsOnPost from "../Pages/hooks/useCommentsOnPost";

const CodeProvider = () => {
  const [contents, refetch] = useContent();
  const [commentsOnPost] = useCommentsOnPost();

  return <div></div>;
};

export default CodeProvider;
