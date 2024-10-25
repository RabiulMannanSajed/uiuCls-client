import React, { useContext, useState } from "react";
import { AuthContext } from "../../../Provider/AuthProvider";
import { useForm } from "react-hook-form";
import { FaPlus } from "react-icons/fa";
import "./CreateGroup.css";
import useUser from "../../hooks/useUser";
import Swal from "sweetalert2";
import GroupsName from "../GroupsName/GroupsName";
import useGroups from "../../hooks/useGroups";
import GroupsNames from "../GroupNames/GroupsNames";
// const img_hosting_token = import.meta.env.VITE_Image_Upload_token;

const CreateGroup = () => {
  const { user } = useContext(AuthContext);
  const [users] = useUser();
  const userInfo = users.find((userEmail) => userEmail?.email == user?.email);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const openModal = () => {
    setIsModalOpen(true);
  };
  const closeModal = () => {
    setIsModalOpen(false);
  };
  // const img_hosting_url = `https://api.imgbb.com/1/upload?key=${img_hosting_token}`;

  const { register, handleSubmit } = useForm({
    defaultValues: {
      groupName: "",
      groupDetails: "",
    },
  });
  const onSubmit = async (data) => {
    // const contentImgRes = await fetch(img_hosting_url, {
    //   method: "POST",
    //   body: formData,
    // });
    // console.log(contentImgRes);
    // const contentImgData = await contentImgRes.json();
    // const contentImgUrl = contentImgData.success
    //   ? contentImgData.data.display_url
    //   : null;
    console.log(data.groupName, data.groupDetails);
    fetch("https://uiuclsserver.onrender.com/groups", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        groupName: data.groupName,
        groupDetails: data.groupDetails,
        email: user?.email,
        firstName: userInfo?.firstName,
        lastName: userInfo.lastName,
        // groupImage: contentImgUrl,
      }),
    })
      .then((response) => response.json())
      .then((responseData) => {
        Swal.fire("Group Created  successfully");
      })
      .catch((error) => {
        console.error("Error during fetch:", error);
      });
  };
  //  this is send data tot the groupName
  const [groups, refetch] = useGroups();
  return (
    <div>
      <div className="w-[200px] text-white bg-[#3987CE] text-xl p-4 flex items-center rounded  cursor-pointer">
        <p onClick={openModal}>Create Group</p>
        <FaPlus className="ml-2" />
      </div>
      {isModalOpen && (
        <>
          <div className="modal-overlay" onClick={closeModal}></div>
          <div className=" p-10  groupModal">
            <p
              className="text-2xl ml-auto cursor-pointer text-[#3987CE] w-[20px]"
              onClick={closeModal}
            >
              ✕
            </p>
            <form onSubmit={handleSubmit(onSubmit)} className="bg-white">
              <label>Group Name</label>
              <br />
              <input
                type="text"
                className="groupInput"
                {...register("groupName")}
              />
              <br />
              <label htmlFor="">Group Description:</label>
              <textarea
                type="text"
                className="textAreaStyle"
                {...register("groupDetails")}
              />
              {/* <div className=" mt-[2%] mb-[5%]">
                <label> Image</label>
                <br />
                <input {...register("image")} type="file" className=" " />
              </div> */}
              <button
                type="submit"
                className="w-[200px] text-white bg-[#3987CE] text-xl p-4 flex ml-auto items-center rounded  cursor-pointer"
              >
                <p>Create Group</p>
                <FaPlus className="ml-2" />
              </button>
            </form>
          </div>
        </>
      )}
    </div>
  );
};

export default CreateGroup;
