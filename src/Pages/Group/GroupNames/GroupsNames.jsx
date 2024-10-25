import React, { useContext } from "react";
import useGroups from "../../hooks/useGroups";
import { AuthContext } from "../../../Provider/AuthProvider";
import useUser from "../../hooks/useUser";
import GroupsName from "../GroupsName/GroupsName";

const GroupsNames = () => {
  const { user } = useContext(AuthContext);
  const [users] = useUser();

  const [groups, refetch] = useGroups();
  return (
    <div className="bg-white  w-[75%]">
      <h1 className="text-2xl  p-4 border-2">Following Groups</h1>
      {groups.map((group) => (
        <div>
          <GroupsName group={group}></GroupsName>
        </div>
      ))}
    </div>
  );
};

export default GroupsNames;
