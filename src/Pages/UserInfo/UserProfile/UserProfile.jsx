import React, { useContext, useEffect, useState } from "react";
import useContent from "../../hooks/useContent";
import { AuthContext } from "../../../Provider/AuthProvider";
import useUser from "../../hooks/useUser";
import { FaUserCircle } from "react-icons/fa";
import useFriends from "../../hooks/useFriends";
import "./UserProfile.css";
const UserProfile = ({ userContentInfo, activeTab }) => {
  const { _id, uploadedContent, img, userName, date, selectedOptions } =
    userContentInfo;

  const { user } = useContext(AuthContext);
  const [contents] = useContent();
  const [users] = useUser();

  // * this part is for the frnd data base
  const handelFriend = (email, firstName, lastName) => {
    const friendInfo = {
      sendToEmail: email,
      sendToFirstName: firstName,
      sendToLastName: lastName,
      sendByEmail: userInfo?.email,
      role: "friend",
    };
    fetch("https://uiuclsserver.onrender.com/friends", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(friendInfo),
    })
      .then((response) => response.json())
      .then(async (responseData) => {
        if (responseData.insertedId) {
          await refetch(); // Refetch the content to update the feed without a page reload
          Swal.fire("Friend Request send ");
          setFriendReq("Cancel Request");
        }
      })
      .catch((error) => {
        console.error("Error during fetch:", error);
      });
    console.log(friendInfo);
  };
  // show those people u send them req by sendByEmail
  const [friends] = useFriends();

  // const friendEmail = friends.find(friend => friend?.sendToEmail == user?.)

  const renderContent = () => {
    switch (activeTab) {
      case "post":
        return (
          <>
            <div key={_id}>
              <div className="flex items-center mb-5">
                <div>
                  <FaUserCircle className="profileIcon text-2xl mr-2" />
                </div>
                <div>
                  <p>{userName}</p>
                  <p>{date}</p>
                </div>
              </div>
              {img ? (
                <img
                  className="w-[10%] h-[10%] mb-6 m-auto bg-white rounded-xl"
                  src={img}
                  alt=""
                />
              ) : null}
              <h1>{uploadedContent}</h1>
              <div className="flex justify-between mt-2">
                <div>
                  {Array.isArray(selectedOptions) && (
                    <div className="flex gap-5 items-center">
                      {selectedOptions.map((option, index) => (
                        <div
                          key={index}
                          className="bg-[#E1ECF4] p-2 rounded text-[#39739D]"
                        >
                          {option}
                        </div>
                      ))}
                    </div>
                  )}
                </div>
                {/*  this is ans Part */}
                <div className="flex items-center">
                  {" "}
                  <button
                    className="mr-5"
                    //TODO  onClick={() => handleLike(_id)}
                  >
                    {/* TODO 
              {like} */}
                    Vote
                    {/*add the like count*/}
                  </button>
                  <div>
                    <button
                    //TODO onClick={() => handleSeeComment(_id)}
                    >
                      Comment
                    </button>
                  </div>
                  {/*  this is for comment  */}
                </div>
              </div>
              {/* TODO:  here add a comment filed this is post  */}
              <div>
                {/* //TODO  */}
                {/* <form
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
          </form> */}
              </div>{" "}
              {/* {visibleComments[_id] &&
          visibleComments[_id].map((cPComment) => (
            <div className="mt-3 bg-[#e4e6eb]" key={cPComment._id}>
              <p className="">{cPComment?.userName}</p>
              <p>{cPComment?.comment}</p>
            </div>
          ))}  */}
            </div>
          </>
        );
      case "Groups":
        return (
          <>
            <h1>ur all group posts</h1>
          </>
        );
    }
  };

  return (
    <div>
      <div className="w-[90%] m-auto">
        <div className=" discussionCss text-white mt-5 p-5 rounded-t-md ">
          {renderContent()}
        </div>
      </div>
    </div>
  );
};

export default UserProfile;
