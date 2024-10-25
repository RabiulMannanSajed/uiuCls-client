import React, { useContext, useEffect, useState } from "react";
import { AuthContext } from "../../../Provider/AuthProvider";
import useUser from "../../hooks/useUser";
import useContent from "../../hooks/useContent";
import UserProfile from "../UserProfile/UserProfile";

const UserProfileInfo = () => {
  const { user } = useContext(AuthContext);
  const [users] = useUser();
  const [contents] = useContent();
  const [userContentInfos, setUserContentInfos] = useState([]);
  const userInfo = users.find((userEmail) => userEmail?.email == user?.email);
  console.log("profile", userInfo);
  useEffect(() => {
    const userContentEmail = contents.filter(
      (userContents) => userContents?.email == userInfo?.email
    );
    setUserContentInfos(userContentEmail);
    console.log(userContentEmail);
  }, []);
  const [activeTab, setActiveTab] = useState("post");
  return (
    <div className="w-[75%] ml-[25%] scrollable-content max-h-[100vh] overflow-y-auto">
      {userInfo?.image ? (
        <>
          <div className="ml-[35%] ">
            <img
              className="imgSize  rounded-full"
              src={userInfo?.image}
              alt=""
            />
            <p className="font-bold text-2xl ml-[5%]">
              {userInfo?.firstName} {userInfo?.lastName}
            </p>
          </div>
        </>
      ) : (
        <></>
      )}
      <div className=" text-gray-500 mb-10 ">
        <div className="flex justify-around">
          <p
            className={activeTab === "post" ? "font-bold text-gray-700" : ""}
            onClick={() => setActiveTab("post")}
          >
            Post
          </p>

          <p
            className={activeTab === "Groups" ? "font-bold text-gray-700" : ""}
            onClick={() => setActiveTab("Groups")}
          >
            Groups
          </p>
        </div>
        <hr className=" text-gray-700" />
      </div>
      {userContentInfos.map((userContentInfo) => (
        <UserProfile
          key={userContentInfo._id}
          userContentInfo={userContentInfo}
          activeTab={activeTab}
        ></UserProfile>
      ))}
    </div>
  );
};

export default UserProfileInfo;
