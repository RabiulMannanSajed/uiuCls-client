// import React, { useContext, useEffect, useState } from "react";
// import { AuthContext } from "../../../Provider/AuthProvider";
// import { NavLink } from "react-router-dom";
// import GroupChat from "../GroupChat/GroupChat";
// import useUser from "../../hooks/useUser";
// import { useForm } from "react-hook-form";

// const GroupName = ({ group }) => {
//   const { user } = useContext(AuthContext);
//   const { groupId, groupName, followerEmails } = group;
//   console.log(followerEmails);
//   const emailFind = followerEmails.find(
//     (followerEmail) => followerEmail == user?.email
//   );
//   const [groupIdHere, setGroupIdHere] = useState("");
//   const handelGroup = (id) => {
//     setGroupIdHere(id);
//     console.log(id);
//   };
//   //  all from groupchat
//   const [users] = useUser();
//   const [groupChat, setGroupChat] = useState([]);
//   const [userGroups, setUserGroups] = useState([]);
//   const [groupMessages, setGroupMessages] = useState([]);
//   useEffect(() => {
//     fetch("https://uiuclsserver.onrender.com/groupChat")
//       .then((res) => res.json())
//       .then((data) => {
//         // Filter the groups where the current user's email exists in followerEmails
//         const matchedGroups = data.filter((group) =>
//           group.followerEmails.includes(user?.email)
//         );
//         setGroupChat(data); // Set the full group chat data
//         setUserGroups(matchedGroups); // Set the matched groups
//       });
//   }, [user?.email]);

//   useEffect(() => {
//     const intervalId = setInterval(() => {
//       fetchMessages();
//     }, 2000); // Adjust the interval as needed

//     return () => clearInterval(intervalId);
//   }, [groupIdHere]);

//   // Helper function to fetch messages
//   const fetchMessages = () => {
//     fetch("https://uiuclsserver.onrender.com/groupMessages")
//       .then((res) => res.json())
//       .then((data) => setGroupMessages(data))
//       .catch((error) => console.error("Error fetching messages:", error));
//   };

//   // Find the group by groupId
//   const groupIdMatch = userGroups.find(
//     (userGroup) => userGroup?.groupId == groupIdHere
//   );
//   const usersEmail = groupIdMatch?.followerEmails;
//   const findUserEmail = usersEmail?.find(
//     (followerEmail) => followerEmail == user?.email
//   );
//   const userInfo = users.find((user) => user?.email == findUserEmail);

//   // Send message to the group
//   const {
//     register,
//     handleSubmit,
//     reset,
//     formState: { errors },
//   } = useForm();

//   const onSubmit = (data) => {
//     const messageInfo = {
//       message: data.message,
//       messageBy: user?.email,
//       messageByName: userInfo?.firstName,
//       groupId: groupIdMatch?.groupId,
//       groupName: groupIdMatch?.groupName,
//     };

//     // Optimistically update the UI
//     const optimisticMessage = {
//       _id: Date.now().toString(), // Temporary unique ID
//       message: data.message,
//       messageBy: user?.email,
//       messageByName: userInfo?.firstName,
//       groupName: groupIdMatch?.groupName,
//     };

//     setGroupMessages((prevMessages) => [...prevMessages, optimisticMessage]); // Add message locally

//     fetch("https://uiuclsserver.onrender.com/groupMessages", {
//       method: "POST",
//       headers: {
//         "Content-Type": "application/json",
//       },
//       body: JSON.stringify(messageInfo),
//     })
//       .then((response) => response.json())
//       .then((responseData) => {
//         fetchMessages(); // Refetch messages after posting
//       })
//       .catch((error) => {
//         console.error("Error during fetch:", error);
//       });

//     reset(); // Reset the input field
//   };
//   return (
//     <div>
//       <button>
//         <h2 onClick={() => handelGroup(groupId)}>{groupName}</h2>
//       </button>

//       {/*  this form groupchat */}
//       <div className="w-[75%] ml-[25%]">
//         <h2>{groupIdMatch?.groupName}</h2>
//         <div className="chat-container scrollable-content">
//           {groupMessages.map((groupMessage) =>
//             groupMessage?.groupName === groupIdMatch?.groupName ? (
//               <div key={groupMessage._id} className="chat-box">
//                 {groupMessage.messageBy === user.email ? (
//                   <div className="message user-message">
//                     <p>{groupMessage.messageByName}</p>
//                     <p>{groupMessage.message}</p>
//                   </div>
//                 ) : (
//                   <div className="message friend-message">
//                     <p>{groupMessage.messageByName}</p>
//                     <p>{groupMessage.message}</p>
//                   </div>
//                 )}
//               </div>
//             ) : null
//           )}
//           <div className="chat-input">
//             <form className="flex" onSubmit={handleSubmit(onSubmit)}>
//               <input
//                 className=" flex-1"
//                 type="text"
//                 {...register("message", { required: true })}
//                 placeholder="Type your message..."
//               />
//               <button type="submit">Send</button>
//             </form>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };
// export default GroupName;
