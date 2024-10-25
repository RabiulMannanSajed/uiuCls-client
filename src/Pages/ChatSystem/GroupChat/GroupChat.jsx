// // import React, { useContext, useEffect, useState } from "react";
// // import { useParams } from "react-router-dom";
// // import { AuthContext } from "../../../Provider/AuthProvider";
// // import useUser from "../../hooks/useUser";
// // import "./GroupChat.css";
// // import { useForm } from "react-hook-form";
// // import useMessages from "../../hooks/useMessages";
// // const GroupChat = () => {
// //   const { user } = useContext(AuthContext);
// //   const [users] = useUser();
// //   const { groupId } = useParams();
// //   const [groupChat, setGroupChat] = useState([]);
// //   const [userGroups, setUserGroups] = useState([]);
// //   useEffect(() => {
// //     fetch("https://uiuclsserver.onrender.com/groupChat")
// //       .then((res) => res.json())
// //       .then((data) => {
// //         // Filter the groups where the current user's email exists in followerEmails
// //         const matchedGroups = data.filter((group) =>
// //           group.followerEmails.includes(user?.email)
// //         );
// //         setGroupChat(data); // Set the full group chat data
// //         setUserGroups(matchedGroups); // Set the matched groups
// //       });
// //   }, [user?.email]);
// //   //   find the group
// //   const groupIdMatch = userGroups.find(
// //     (userGroup) => userGroup?.groupId == groupId
// //   );
// //   console.log(groupIdMatch);
// //   const usersEmail = groupIdMatch?.followerEmails;
// //   //   find out the email
// //   const findUserEmail = usersEmail?.find(
// //     (followerEmail) => followerEmail == user?.email
// //   );
// //   //    find the user
// //   const userInfo = users.find((user) => user?.email == findUserEmail);

// //   //  this part is send message to the group
// //   const {
// //     register,
// //     handleSubmit,
// //     reset,
// //     formState: { error },
// //   } = useForm();
// //   const onSubmit = (data) => {
// //     const messageInfo = {
// //       message: data.message,
// //       messageBy: user?.email,
// //       messageByName: userInfo?.firstName,
// //       groupId: groupIdMatch?.groupId,
// //       groupName: groupIdMatch?.groupName,
// //     };
// //     fetch("https://uiuclsserver.onrender.com/groupMessages", {
// //       method: "POST",
// //       headers: {
// //         "Content-Type": "application/json",
// //       },
// //       body: JSON.stringify(messageInfo),
// //     })
// //       .then((response) => response.json())
// //       .then((responseData) => {})
// //       .catch((error) => {
// //         console.error("Error during fetch:", error);
// //       });
// //     reset();
// //   };
// //   const [groupMessages, refetch] = useMessages();
// //   return (
// //     <div className="w-[75%] ml-[25%]">
// //       <h2>{groupIdMatch?.groupName}</h2>
// //       <div className="chat-container scrollable-content">
// //         {groupMessages.map((groupMessage) =>
// //           groupMessage?.groupName === groupIdMatch?.groupName ? (
// //             <div key={groupMessage._id} className="chat-box">
// //               {groupMessage.messageBy === user.email ? (
// //                 <div className="message user-message">
// //                   <p>{groupMessage.messageByName}</p>
// //                   <p>{groupMessage.message}</p>
// //                 </div>
// //               ) : (
// //                 <div className="message friend-message">
// //                   <p>{groupMessage.messageByName}</p>
// //                   <p>{groupMessage.message}</p>
// //                 </div>
// //               )}
// //             </div>
// //           ) : (
// //             <></>
// //           )
// //         )}
// //         <div className="chat-input ">
// //           <form className="flex" onSubmit={handleSubmit(onSubmit)}>
// //             <input
// //               className=" flex-1"
// //               type="text"
// //               {...register("message", { required: true })}
// //               placeholder="Type your message..."
// //             />
// //             <button type="submit">Send</button>
// //           </form>
// //         </div>
// //       </div>
// //     </div>
// //   );
// // };

// // export default GroupChat;
// import React, { useContext, useEffect, useState } from "react";
// import { useParams } from "react-router-dom";
// import { AuthContext } from "../../../Provider/AuthProvider";
// import useUser from "../../hooks/useUser";
// import "./GroupChat.css";
// import { useForm } from "react-hook-form";
// import useMessages from "../../hooks/useMessages";

// const GroupChat = () => {
//   const idOfGroup = id;
//   const { user } = useContext(AuthContext);
//   const [users] = useUser();
//   const { groupId } = useParams();
//   // const [groupChat, setGroupChat] = useState([]);
//   // const [userGroups, setUserGroups] = useState([]);
//   const [groupMessages, setGroupMessages] = useState([]); // Store messages locally

//   // useEffect(() => {
//   //   fetch("https://uiuclsserver.onrender.com/groupChat")
//   //     .then((res) => res.json())
//   //     .then((data) => {
//   //       // Filter the groups where the current user's email exists in followerEmails
//   //       const matchedGroups = data.filter((group) =>
//   //         group.followerEmails.includes(user?.email)
//   //       );
//   //       setGroupChat(data); // Set the full group chat data
//   //       setUserGroups(matchedGroups); // Set the matched groups
//   //     });
//   // }, [user?.email]);

//   // useEffect(() => {
//   //   const intervalId = setInterval(() => {
//   //     fetchMessages();
//   //   }, 2000); // Adjust the interval as needed

//   //   return () => clearInterval(intervalId);
//   // }, [groupId]);

//   // Helper function to fetch messages
//   // const fetchMessages = () => {
//   //   fetch("https://uiuclsserver.onrender.com/groupMessages")
//   //     .then((res) => res.json())
//   //     .then((data) => setGroupMessages(data))
//   //     .catch((error) => console.error("Error fetching messages:", error));
//   // };

//   // Find the group by groupId
//   // const groupIdMatch = userGroups.find(
//   //   (userGroup) => userGroup?.groupId == groupId
//   // );
//   // const usersEmail = groupIdMatch?.followerEmails;
//   // const findUserEmail = usersEmail?.find(
//   //   (followerEmail) => followerEmail == user?.email
//   // );
//   // const userInfo = users.find((user) => user?.email == findUserEmail);

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
//     <div className="w-[75%] ml-[25%]">
//       <h2>{groupIdMatch?.groupName}</h2>
//       <div className="chat-container scrollable-content">
//         {groupMessages.map((groupMessage) =>
//           groupMessage?.groupName === groupIdMatch?.groupName ? (
//             <div key={groupMessage._id} className="chat-box">
//               {groupMessage.messageBy === user.email ? (
//                 <div className="message user-message">
//                   <p>{groupMessage.messageByName}</p>
//                   <p>{groupMessage.message}</p>
//                 </div>
//               ) : (
//                 <div className="message friend-message">
//                   <p>{groupMessage.messageByName}</p>
//                   <p>{groupMessage.message}</p>
//                 </div>
//               )}
//             </div>
//           ) : null
//         )}
//         <div className="chat-input">
//           <form className="flex" onSubmit={handleSubmit(onSubmit)}>
//             <input
//               className=" flex-1"
//               type="text"
//               {...register("message", { required: true })}
//               placeholder="Type your message..."
//             />
//             <button type="submit">Send</button>
//           </form>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default GroupChat;
