import React from "react";
import { IoIosSend } from "react-icons/io";
import useGroupContents from "../../hooks/useGroupContents";

const GroupContents = ({ groupContentPost }) => {
  const { _id, img, uploadedContent, userName, date } = groupContentPost;
  const [groupContents, refetch] = useGroupContents();
  const contentId = groupContents.find((content) => content._id === _id);
  const handleComment = (id) => {};
  const handleLike = (id) => {
    const like = {
      like: 0,
    };
    fetch(`https://uiuclsserver.onrender.com/groupContents/${id}/like`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(like),
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.modifiedCount) {
          refetch();
        }
      });
  };
  const handleSeeComment = () => {};
  return (
    <div className="mt-3 mb-3  bg-slate-700 p-5 rounded-xl">
      <div>
        <h1>{userName}</h1>
        <p>{date}</p>
      </div>
      <p>{uploadedContent}</p>
      {/*  if the img here then show it  */}
      {img ? (
        <>
          <img src={img} alt="" />
        </>
      ) : (
        <></>
      )}
      <div className="flex items-center">
        {" "}
        <button className="mr-5" onClick={() => handleLike(_id)}>
          {contentId?.like} Vote
          {/*add the like count*/}
        </button>
        <div>
          <button onClick={() => handleSeeComment(_id)}>Comment</button>
        </div>
        {/*  this is for comment  */}
      </div>
      {/* TODO:  here add a comment filed this is post  */}
      <div>
        <form
          onSubmit={(e) => handleComment(e, _id)}
          className="flex items-center"
        >
          <input
            type="name"
            placeholder="Comment "
            name="comment"
            className="postInput mt-5"
            required
          />
          <div>
            <button type="submit" className="text-2xl mt-3 ml-2 ">
              <IoIosSend className="text-yellow-600" />
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default GroupContents;
