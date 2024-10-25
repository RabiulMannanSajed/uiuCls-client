import React, { useContext, useEffect, useState } from "react";
import { AuthContext } from "../../../Provider/AuthProvider";
import { DiCelluloid } from "react-icons/di";
import { useForm } from "react-hook-form";
import useUser from "../../hooks/useUser";
import "./ChatHome.css";
const ChatHome = () => {
  const { user } = useContext(AuthContext);
  const [users] = useUser();
  const [groupsChat, setGroupsChat] = useState([]);
  const [userGroups, setUserGroups] = useState([]);
  const [groupMessages, setGroupMessages] = useState([]);
  useEffect(() => {
    fetch("https://uiuclsserver.onrender.com/groupChat")
      .then((res) => res.json())
      .then((data) => {
        // Filter the groups where the current user's email exists in followerEmails
        const matchedGroups = data.filter((group) =>
          group.followerEmails.includes(user?.email)
        );
        setGroupsChat(data); // Set the full group chat data
        setUserGroups(matchedGroups); // Set the matched groups
      });
  }, [user?.email]);
  console.log(userGroups);
  // ToDO : all from new file
  const [groupIdHere, setGroupIdHere] = useState("");
  const handelGroup = (id) => {
    setGroupIdHere(id);
    console.log(id);
  };
  useEffect(() => {
    const intervalId = setInterval(() => {
      fetchMessages();
    }, 2000);

    return () => clearInterval(intervalId);
  }, [groupIdHere]);
  const fetchMessages = () => {
    fetch("https://uiuclsserver.onrender.com/groupMessages")
      .then((res) => res.json())
      .then((data) => setGroupMessages(data))
      .catch((error) => console.error("Error fetching messages:", error));
  };
  const groupIdMatch = userGroups.find(
    (userGroup) => userGroup?.groupId == groupIdHere
  );
  const usersEmail = groupIdMatch?.followerEmails;
  const findUserEmail = usersEmail?.find(
    (followerEmail) => followerEmail == user?.email
  );
  const userInfo = users.find((user) => user?.email == findUserEmail);
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();
  const onSubmit = (data) => {
    const messageInfo = {
      message: data.message,
      messageBy: user?.email,
      messageByName: userInfo?.firstName,
      groupId: groupIdMatch?.groupId,
      groupName: groupIdMatch?.groupName,
    };

    // Optimistically update the UI
    const optimisticMessage = {
      _id: Date.now().toString(), // Temporary unique ID
      message: data.message,
      messageBy: user?.email,
      messageByImg: userInfo?.image || null,
      messageByName: userInfo?.firstName,
      groupName: groupIdMatch?.groupName,
    };

    setGroupMessages((prevMessages) => [...prevMessages, optimisticMessage]); // Add message locally

    fetch("https://uiuclsserver.onrender.com/groupMessages", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(messageInfo),
    })
      .then((response) => response.json())
      .then((responseData) => {
        fetchMessages(); // Refetch messages after posting
      })
      .catch((error) => {
        console.error("Error during fetch:", error);
      });

    reset(); // Reset the input field
  };

  return (
    <div className="w-[75%] ml-[20%] flex justify-center p-10">
      <div className=" w-[20%] bg-slate-400  rounded-l-xl p-3 text-white">
        <p>All Groups</p>
        {userGroups.length > 0 ? (
          userGroups.map((group) => (
            <div className="bg-slate-400 p-5 mt-3">
              {/* <GroupName key={group._id} group={group}></GroupName> */}
              <h2 onClick={() => handelGroup(group?.groupId)}>
                {group?.groupName}{" "}
              </h2>
              <hr />
            </div>
          ))
        ) : (
          <p>No groups found for the current user.</p>
        )}
      </div>
      {/*  this is the chat part */}
      <div className="flex-1">
        <h2 className="bg-slate-400 text-white">{groupIdMatch?.groupName}</h2>
        <div className="chat-container ">
          <div className="scrollable-content max-h-[100vh] overflow-y-auto">
            {groupMessages.map((groupMessage) =>
              groupMessage?.groupName === groupIdMatch?.groupName ? (
                <div key={groupMessage._id} className="chat-box">
                  {groupMessage.messageBy === user.email ? (
                    <div className="message user-message">
                      <p>{groupMessage.messageByName}</p>
                      <p>{groupMessage.message}</p>
                    </div>
                  ) : (
                    <div className="message friend-message">
                      <p>{groupMessage.messageByName}</p>
                      <p>{groupMessage.message}</p>
                    </div>
                  )}
                </div>
              ) : null
            )}
          </div>

          <form className="chat-input" onSubmit={handleSubmit(onSubmit)}>
            <input
              className=" flex-1"
              type="text"
              {...register("message", { required: true })}
              placeholder="Type your message..."
            />
            <button type="submit">Send</button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default ChatHome;
