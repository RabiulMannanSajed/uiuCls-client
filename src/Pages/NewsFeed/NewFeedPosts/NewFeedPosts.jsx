import React, { useContext, useEffect, useState } from "react";
import useContent from "../../hooks/useContent";
import { AuthContext } from "../../../Provider/AuthProvider";
import { FaUserCircle } from "react-icons/fa";
import { IoIosSend } from "react-icons/io";
import useUser from "../../hooks/useUser";
import useCommentsOnPost from "../../hooks/useCommentsOnPost";
import { NavLink } from "react-router-dom";
import Swal from "sweetalert2";
import useUserLike from "../../hooks/useUserLike";

const NewFeedPosts = () => {
  const { user } = useContext(AuthContext);
  const [users] = useUser();
  const userInfo = users.find((user) => user?.email === user?.email);
  // const [contents, refetch] = useContent();
  const [contents, setContents] = useState([]);
  //  this is call the data base after 2 sec
  useEffect(() => {
    const intervalId = setInterval(() => {
      fetchMessages();
    }, 2000);
    return () => clearInterval(intervalId);
  }, [contents]);
  const fetchMessages = () => {
    fetch("https://uiuclsserver.onrender.com/contents")
      .then((res) => res.json())
      .then((data) => setContents(data))
      .catch((error) => console.error("Error fetching messages:", error));
  };
  const friendEmails = contents.find(
    (contentEmail) => contentEmail?.email == user?.email
  );

  const date = new Date().toJSON().slice(0, 10);
  // TODO : if can make the like
  const handleLikeInfo = (id) => {
    //  take the info of the user
    const userLikeInfo = {
      postId: id,
      userEmail: userInfo?.email,
      userName: userInfo?.firstName,
    };

    fetch("https://uiuclsserver.onrender.com/userLikes", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(userLikeInfo),
    })
      .then((res) => res.json())
      .then((data) => {});

    // this is for the
  };
  const [userLikes] = useUserLike();
  const handleLike = (id) => {
    const contentId = contents.find((content) => content._id === id);

    console.log(contentId);
    const like = {
      like: 0,
    };

    fetch(`https://uiuclsserver.onrender.com/contents/${contentId._id}/like`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(like),
    })
      .then((res) => res.json())
      .then((data) => {
        handleLikeInfo(contentId._id);
        if (data.modifiedCount) {
        }
      });
  };

  const deleteLikePost = (id) => {
    const findLikePost = userLikes.find((userLike) => userLike?.postId == id);
    fetch(`https://uiuclsserver.onrender.com/userLikes/${findLikePost?._id}`, {
      method: "DELETE",
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.modifiedCount) {
          console.log("Dislike delete");
        }
      });
  };
  const handleDislike = (id) => {
    const contentId = contents.find((content) => content._id === id);

    if (contentId.like > 0) {
      // Only decrease if like count is greater than 0
      const dislike = {
        like: contentId.like - 1, // Decrement the like count
      };

      fetch(
        `https://uiuclsserver.onrender.com/contents/${contentId._id}/dislike`,
        {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(dislike),
        }
      )
        .then((res) => res.json())
        .then((data) => {
          deleteLikePost(contentId._id);
          if (data.modifiedCount) {
            console.log("Dislike updated");
          }
        });
    } else {
      console.log("Like count cannot be negative");
    }
  };
  //   this is ans Part
  const handleComment = (event, id) => {
    event.preventDefault();
    const form = event.target;
    const comment = form.comment.value;
    const commentInfo = {
      comment: comment,
      postId: id,
      userEmail: user?.email,
      userName: userInfo.firstName,
      userImg: userInfo?.image || null,
      date: date,
    };

    fetch(`https://uiuclsserver.onrender.com/commentsOnPost`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(commentInfo),
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.modifiedCount) {
          refetch();
        }
      });
  };
  // if the user like this post then show downVote

  // const
  //! if user click the Ans btn then show the comment of all user
  const [visibleComments, setVisibleComments] = useState([]); // Store comments for specific posts
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [commentsOnPost] = useCommentsOnPost();
  const handleSeeComment = (id) => {
    console.log("this is comment see id", id);
    const commentId = commentsOnPost.filter(
      (commentsOfPost) => commentsOfPost.postId == id
    );
    const lengthOfArray = commentId.length;
    setVisibleComments((prevState) => ({
      ...prevState,
      [id]: commentId, // Store comments only for the clicked post ID
    }));
    setIsModalOpen(true);
  };
  const closeModal = () => {
    setIsModalOpen(false); // Close the modal
  };
  // return (
  //   <div>
  //     {contents.map((content) => (
  //       <div key={content._id} className="postDiv ">
  //         <div className="flex items-center justify-between mb-5">
  //           <div>
  //             <div>
  //               {/* If the post's user has an image, display it. Otherwise, show the default icon */}
  //               {postUserInfo?.image ? (
  //                 <img
  //                   className="imgSizenav"
  //                   src={postUserInfo.image}
  //                   alt="User profile"
  //                 />
  //               ) : (
  //                 <FaUserCircle className="profileIcon text-2xl mr-2" />
  //               )}
  //             </div>
  //             <div>
  //               <p>{content.userName}</p>
  //               <p>{content.date}</p>
  //             </div>
  //           </div>
  //         </div>
  //         {content.img ? (
  //           <img
  //             className="w-[10%] h-[10%] mb-6 m-auto"
  //             src={content.img}
  //             alt=""
  //           />
  //         ) : null}
  //         <h1>{content.uploadedContent}</h1>
  //         <div className="flex justify-between mt-2">
  //           <div>
  //             {Array.isArray(content.selectedOptions) && (
  //               <div className="flex gap-5 items-center">
  //                 {content.selectedOptions.map((option, index) => (
  //                   <div
  //                     key={index}
  //                     className="bg-[#E1ECF4] p-2 rounded text-[#39739D]"
  //                   >
  //                     {option}
  //                   </div>
  //                 ))}
  //               </div>
  //             )}
  //           </div>
  //           {/*  this is ans Part */}
  //           <div className="flex items-center">
  //             {/* Check if content._id matches any postId in userLikes */}
  //             {content.like}
  //             {/* Check if content._id matches any postId in userLikes */}
  //             {userLikes.some((like) => like.postId === content._id) ? (
  //               <button
  //                 className="ml-2 mr-2"
  //                 onClick={() => handleDislike(content._id)}
  //               >
  //                 DownVote
  //               </button>
  //             ) : (
  //               <button
  //                 className="mr-5"
  //                 onClick={() => handleLike(content._id)}
  //               >
  //                 Vote
  //               </button>
  //             )}
  //             {/*add the like count*/}
  //             <div>
  //               <button onClick={() => handleSeeComment(content._id)}>
  //                 Answer
  //               </button>
  //             </div>
  //             {/*  this is for comment  */}
  //           </div>
  //         </div>
  //         {/* TODO:  here add a comment filed this is post  */}
  //         <div>
  //           <form
  //             onSubmit={(e) => handleComment(e, content._id)}
  //             className="flex items-center"
  //           >
  //             <input
  //               type="name"
  //               placeholder="Comment "
  //               name="comment"
  //               className="postInput mt-5"
  //               required
  //             />
  //             <div>
  //               <button type="submit" className="text-2xl mt-3 ml-2 ">
  //                 <IoIosSend className="text-yellow-600" />
  //               </button>
  //             </div>
  //           </form>
  //         </div>{" "}
  //         {/* This part  is showing the comment  */}
  //         {visibleComments[content._id] &&
  //           visibleComments[content._id].map((cPComment) => (
  //             <div className="mt-3 bg-[#e4e6eb]" key={cPComment._id}>
  //               <p className="">{cPComment?.userName}</p>
  //               <p>{cPComment?.comment}</p>
  //             </div>
  //           ))}
  //       </div>
  //     ))}
  //   </div>
  // );
  return (
    <div>
      {contents.map((content) => {
        // Find the user information for the current post based on the email
        const postUserInfo = users.find(
          (user) => user?.email === content?.email
        );

        return (
          <div key={content._id} className="postDiv">
            <div className="flex items-center justify-between mb-5">
              <div>
                <div>
                  {/* If the post's user has an image, display it. Otherwise, show the default icon */}
                  {postUserInfo?.image ? (
                    <img
                      className="imgSizenav"
                      src={postUserInfo.image}
                      alt="User profile"
                    />
                  ) : (
                    <FaUserCircle className="profileIcon text-2xl mr-2" />
                  )}
                </div>
                <div>
                  <p>{content.userName}</p>
                  <p>{content.date}</p>
                </div>
              </div>
            </div>
            {content.img ? (
              <img
                className="w-[10%] h-[10%] mb-6 m-auto"
                src={content.img}
                alt="Post content"
              />
            ) : null}
            <h1>{content.uploadedContent}</h1>
            <div className="flex justify-between mt-2">
              <div>
                {Array.isArray(content.selectedOptions) && (
                  <div className="flex gap-5 items-center">
                    {content.selectedOptions.map((option, index) => (
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
              <div className="flex items-center">
                {content.like}
                {userLikes.some((like) => like.postId === content._id) ? (
                  <button
                    className="ml-2 mr-2"
                    onClick={() => handleDislike(content._id)}
                  >
                    DownVote
                  </button>
                ) : (
                  <button
                    className="mr-5"
                    onClick={() => handleLike(content._id)}
                  >
                    Vote
                  </button>
                )}
                <div>
                  <button onClick={() => handleSeeComment(content._id)}>
                    Answer
                  </button>
                </div>
              </div>
            </div>
            <div>
              <form
                onSubmit={(e) => handleComment(e, content._id)}
                className="flex items-center"
              >
                <input
                  type="name"
                  placeholder="Comment"
                  name="comment"
                  className="postInput mt-5"
                  required
                />
                <div>
                  <button type="submit" className="text-2xl mt-3 ml-2">
                    <IoIosSend className="text-yellow-600" />
                  </button>
                </div>
              </form>
            </div>
            {visibleComments[content._id] &&
              visibleComments[content._id].map((cPComment) => (
                <div className="mt-3 bg-[#e4e6eb]" key={cPComment._id}>
                  <p className="">{cPComment?.userName}</p>
                  <p>{cPComment?.comment}</p>
                </div>
              ))}
          </div>
        );
      })}
    </div>
  );
};

export default NewFeedPosts;
