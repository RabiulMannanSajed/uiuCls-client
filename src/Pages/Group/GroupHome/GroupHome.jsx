import React from "react";
import CreateGroup from "../CreateGroup/CreateGroup";
import GroupsName from "../GroupsName/GroupsName";
import GroupsNames from "../GroupNames/GroupsNames";

const GroupHome = () => {
  return (
    <div className="w-[75%] ml-[25%] ">
      <div className="pt-5">
        <GroupsNames></GroupsNames>
      </div>
      <div className="mt-8">
        <CreateGroup></CreateGroup>
      </div>
    </div>
  );
};

export default GroupHome;
