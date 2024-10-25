import React, { useContext, useEffect, useState } from "react";
import useGroups from "../../hooks/useGroups";
import { AuthContext } from "../../../Provider/AuthProvider";
import useUser from "../../hooks/useUser";
import Swal from "sweetalert2";
import useGroupFollowers from "../../hooks/useGroupFollowers";
import { NavLink } from "react-router-dom";

const GroupsName = ({ group }) => {
  const { _id, groupName, followerEmail } = group;

  const { user } = useContext(AuthContext);
  const [users] = useUser();

  const [groups] = useGroups();

  const [groupFollowers, refetch] = useGroupFollowers();
  //  here find the current user info
  const userInfo = users.find((userEmail) => userEmail?.email == user?.email);
  const [isFollowing, setIsFollowing] = useState([]);
  const [loading, setLoading] = useState(false);

  // TODO : make the group part okk
  useEffect(() => {
    const userFollowGroup = groupFollowers.filter(
      (groupFollower) => groupFollower?.followerEmail === user?.email
    );
    setLoading(true);
    setIsFollowing(userFollowGroup);
  }, [groupFollowers, user]);
  console.log("isFollowing", isFollowing);

  const handleFollow = (id) => {
    const groupInfo = groups.find((groupId) => groupId._id == id);
    // console.log(id);
    //  send the details to the database
    fetch("https://uiuclsserver.onrender.com/groupFollowers", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        groupId: id,
        groupName: groupInfo.groupName,
        followerName: userInfo?.firstName,
        followerEmail: userInfo?.email,
        followerDepartment: userInfo?.subject,
      }),
    })
      .then((res) => res.json())
      .then(async (resData) => {
        if (resData.insertedId) {
          // this is use for navbar
          await refetch();
          Swal.fire(`You are following the group ${groupInfo.groupName}`);
        }
      })
      .catch((error) => {
        console.log("Error during fetch");
      });
  };

  //  here Unfollow is handle
  //  delete the user form the data base
  const handleUnFollow = (id) => {
    const groupInfo = groupFollowers.find((groupId) => groupId.groupId === id);

    fetch(`https://uiuclsserver.onrender.com/groupFollowers/${groupInfo._id}`, {
      method: "DELETE",
    })
      .then((res) => res.json())
      .then(async (data) => {
        if (data.deletedCount > 0) {
          await refetch();
          Swal.fire(`${userInfo.firstName} You Unfollow this group`);
        }
      });
    console.log(groupInfo.groupId);
  };
  return (
    <div className="  ">
      <div className="border-2 p-4 flex justify-between">
        <NavLink to={`/groupPosts/${_id}`}>
          <p>{groupName}</p>{" "}
        </NavLink>

        {isFollowing && isFollowing?.groupId === _id ? (
          <p
            onClick={() => handleUnFollow(_id)}
            className="cursor-pointer bg-red-500 p-2 rounded"
          >
            UnFollow
          </p>
        ) : (
          <p
            onClick={() => handleFollow(_id)}
            className="cursor-pointer bg-blue-400 p-2 rounded"
          >
            Follow
          </p>
        )}
      </div>
    </div>
  );
};

export default GroupsName;
