import React, { useContext, useEffect } from "react";
import { useForm } from "react-hook-form";
import { AuthContext } from "../../../Provider/AuthProvider";
import useUser from "../../hooks/useUser";
import { FaPlus } from "react-icons/fa";
import Swal from "sweetalert2";
import "./ProfileSetting.css";
const img_hosting_token = import.meta.env.VITE_Image_Upload_token;

const ProfileSetting = () => {
  const { user } = useContext(AuthContext);
  const [users] = useUser();

  const userEmail = users.find((userEmail) => userEmail?.email == user?.email);

  // TODO : here we update the user profile
  const { register, handleSubmit, refetch } = useForm({});
  const img_hosting_url = `https://api.imgbb.com/1/upload?key=${img_hosting_token}`;
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

    const updatedUserData = {
      firstName: data.firstName,
      lastName: data.lastName,
      password: data.password, // make sure to hash this on the backend
      image: contentImgUrl, // keep the existing image if no new one is uploaded
    };
    console.log(updatedUserData);
    //    TODO : Use the patch
    fetch(`https://uiuclsserver.onrender.com/users/update/${userEmail?._id}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json", // Add the content type header
      },
      body: JSON.stringify({
        firstName: data.firstName,
        lastName: data.lastName,
        password: data.password, // make sure to hash this on the backend
        image: contentImgUrl,
      }),
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.modifiedCount > 0) {
          refetch(); // Refetch the user data to get the updated profile
          Swal.fire("Profile updated successfully!"); // Show success message
        } else {
          Swal.fire("No changes were made."); // Show message if nothing was updated
        }
      });
  };
  return (
    <div>
      <div className="w-[40%] m-auto profileBorder">
        <p className="text-2xl mt-2">Edit Profile</p>
        <form onSubmit={handleSubmit(onSubmit)} className="">
          <div className="flex ">
            <div className="mt-[2%] mr-5 divOfSignUpName">
              <label>First Name </label>
              <br />
              <input
                type="text"
                {...register("firstName")}
                required={true}
                name="firstName"
                defaultValue={userEmail?.firstName || ""}
                className="input-bgRemove"
              />
            </div>
            {/* here the other info  */}
            <div className="mt-[2%] divOfSignUpName">
              <label>Last Name</label>
              <br />
              <input
                type="text"
                {...register("lastName")}
                required={true}
                name="lastName"
                defaultValue={userEmail?.lastName || ""}
                className="input-bgRemove"
              />
            </div>
          </div>

          <div className="prodivOfSignUpName mt-[2%] mb-[5%]">
            <label> Password</label>
            <br />
            <input
              type="password"
              {...register("password", {
                required: true,
              })}
              name="password"
              defaultValue={userEmail?.password || ""}
              placeholder="Enter Your password"
              className="input-bgRemove"
            />
          </div>
          <div className="prodivOfSignUpName mt-[2%] mb-[5%]">
            <label> Image</label>
            <br />
            <input {...register("image")} type="file" className=" " />
          </div>
          <button
            type="submit"
            className=" bg-slate-500 p-4 rounded-md  cursor-pointer"
          >
            <p>Update Profile</p>
          </button>
        </form>
      </div>
    </div>
  );
};

export default ProfileSetting;
