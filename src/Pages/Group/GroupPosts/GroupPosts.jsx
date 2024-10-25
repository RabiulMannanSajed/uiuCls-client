import React, { useContext, useEffect, useState } from "react";
import "./GroupPosts.css";
import { useParams } from "react-router-dom";
import useGroups from "../../hooks/useGroups";
import useGroupFollowers from "../../hooks/useGroupFollowers";
import { FaUserCircle } from "react-icons/fa";
import { useForm } from "react-hook-form";
import useUser from "../../hooks/useUser";
import { AuthContext } from "../../../Provider/AuthProvider";
import Swal from "sweetalert2";
import useGroupContents from "../../hooks/useGroupContents";
import GroupContents from "../GroupContents/GroupContents";
const img_hosting_token = import.meta.env.VITE_Image_Upload_token;

const GroupPosts = () => {
  const { user } = useContext(AuthContext);
  const [users, refetch] = useUser();
  const { id } = useParams();
  const [groups] = useGroups();
  const [groupFollowers] = useGroupFollowers();
  const groupInfo = groups.find((groupId) => groupId?._id == id);
  console.log(groupInfo);
  const [userInfo, setUserInfo] = useState([]);
  const date = new Date().toJSON().slice(0, 10);
  //    this is find the user
  useEffect(() => {
    const currentUserEmail = users.find(
      (userEmail) => userEmail?.email == user?.email
    );
    setUserInfo(currentUserEmail);
  }, [user?.email, users]);
  //    this is the img api
  const img_hosting_url = `https://api.imgbb.com/1/upload?key=${img_hosting_token}`;

  //    find all members
  const findGroupId = groupFollowers.filter(
    (groupFollower) => groupFollower?.groupId == groupInfo?._id
  );
  const groupMembers = findGroupId.length;

  console.log("findGroupId", findGroupId.length);
  //    this part is for the post content in group
  const [isModalOpen, setIsModalOpen] = useState(false);
  const openModal = () => {
    setIsModalOpen(true);
  };
  const closeModal = () => {
    setIsModalOpen(false);
  };
  const { register, handleSubmit } = useForm({
    defaultValues: {
      uploadedContent: "",
    },
  });
  const onSubmit = async (data) => {
    const formData = new FormData();
    formData.append("image", data.image[0]);

    // Upload restaurant image
    const contentImgRes = await fetch(img_hosting_url, {
      method: "POST",
      body: formData,
    });
    console.log(contentImgRes);
    const contentImgData = await contentImgRes.json();
    const contentImgUrl = contentImgData.success
      ? contentImgData.data.display_url
      : null;

    //* send data to the data base
    fetch("https://uiuclsserver.onrender.com/groupContents", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      //* here we send the to the data base
      body: JSON.stringify({
        uploadedContent: data.uploadedContent,
        img: contentImgData?.data?.display_url || null,
        email: userInfo?.email,
        userName: userInfo?.firstName,
        date: date,
        groupId: groupInfo?._id,
        groupInfo: groupInfo?.groupName,
      }),
    })
      .then((response) => response.json())
      .then(async (responseData) => {
        closeModal();
        if (responseData.insertedId) {
          await refetch(); // Refetch the content to update the feed without a page reload
          Swal.fire("Content uploaded");
        }
      })
      .catch((error) => {
        console.error("Error during fetch:", error);
      });
  };
  const [activeTab, setActiveTab] = useState("discussion");

  //  this part is show post of group content
  // const [groupContents] = useGroupContents();
  const [groupContents, setGroupMessages] = useState([]);
  useEffect(() => {
    const intervalId = setInterval(() => {
      fetchMessages();
    }, 2000);

    return () => clearInterval(intervalId);
  }, [groupContents]);
  const fetchMessages = () => {
    fetch("https://uiuclsserver.onrender.com/groupContents")
      .then((res) => res.json())
      .then((data) => setGroupMessages(data))
      .catch((error) => console.error("Error fetching messages:", error));
  };
  const groupContentPosts = groupContents.filter(
    (groupContent) => groupContent?.groupId == id
  );
  console.log(groupContentPosts);
  const renderContent = () => {
    // You can map through members here
    switch (activeTab) {
      case "about":
        return (
          <h1 className="bg-slate-700 p-5 rounded-xl">
            {groupInfo?.groupDetails}
          </h1>
        );
      case "discussion":
        return (
          <div className="contentUpdateScroll">
            <div className="flex ">
              <FaUserCircle className="profileIconPost" />
              <p className="groupPostInput" onClick={openModal}>
                Any Queries? Ask a question
              </p>
            </div>
            {isModalOpen && (
              <>
                <div className="modal-overlay" onClick={closeModal}></div>

                <div className="groupPostDetails">
                  <p>Post Details</p>
                  <form onSubmit={handleSubmit(onSubmit)} className="">
                    <textarea
                      type="text"
                      className="textAreaStyle text-black"
                      placeholder=" What's on you mind? "
                      {...register("uploadedContent")}
                    />
                    <br />
                    <input {...register("image")} type="file" className=" " />

                    <div className="flex gap-4 justify-end">
                      <p onClick={closeModal} className="cursor-pointer">
                        cancel
                      </p>{" "}
                      <button type="submit" className="cursor-pointer">
                        Submit
                      </button>
                    </div>
                  </form>
                </div>
              </>
            )}
            {/*  here show all the post of the group by use the props  */}
            {groupContentPosts.map((groupContentPost) => (
              <GroupContents
                key={groupContentPost._id}
                groupContentPost={groupContentPost}
              />
            ))}
          </div>
        ); // You can implement discussion logic here
      case "members":
        return (
          <div>
            <h1 className="bg-slate-700 p-4 rounded-xl">
              Members. {groupMembers}
            </h1>
          </div>
        );
      default:
        return null;
    }
  };

  return (
    <div className="w-[60%] m-auto ">
      <h2>{groupInfo?.groupName}</h2>
      {/*  this is navbar of a group  */}
      <div className="flex justify-around">
        <p
          className={activeTab === "about" ? "font-bold text-gray-700" : ""}
          onClick={() => setActiveTab("about")}
        >
          About
        </p>
        <p
          className={
            activeTab === "discussion" ? "font-bold text-gray-700" : ""
          }
          onClick={() => setActiveTab("discussion")}
        >
          Discussion
        </p>
        <p
          className={activeTab === "members" ? "font-bold text-gray-700" : ""}
          onClick={() => setActiveTab("members")}
        >
          Members
        </p>
      </div>
      <hr className="w-[75%] m-auto " />
      <div className="w-[75%] m-auto">
        <div className=" discussionCss text-white mt-5 p-5 rounded-t-md ">
          {renderContent()}
        </div>
      </div>
    </div>
  );
};

export default GroupPosts;
