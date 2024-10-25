// export default NewFeedPostUp;
import React, { useContext, useEffect, useState } from "react";
import { AuthContext } from "../../../Provider/AuthProvider";
import useUser from "../../hooks/useUser";
import { FaUserCircle } from "react-icons/fa";
import "./NewFeedPostUp.css";
import { useForm } from "react-hook-form";
import Swal from "sweetalert2";

const img_hosting_token = import.meta.env.VITE_Image_Upload_token;

const NewFeedPostUp = () => {
  const { user } = useContext(AuthContext);
  const [users, refetch] = useUser(); //* this is hook
  const userEmail = user?.email;
  const [userInfo, setUserInfo] = useState([]);
  const date = new Date().toJSON().slice(0, 10);
  useEffect(() => {
    const currentUserEmail = users.find(
      (userEmail) => userEmail?.email == user?.email
    );
    // console.log("user Email", currentUserEmail?.email);
    setUserInfo(currentUserEmail);
  }, [user?.email, users]);

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedOptions, setSelectedOptions] = useState([]);
  const openModal = () => {
    setIsModalOpen(true);
  };
  const closeModal = () => {
    setIsModalOpen(false);
  };
  const { register, handleSubmit } = useForm({
    defaultValues: {
      uploadedContent: "",
      selectedOptions: [],
    },
  });
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

    //* send data to the data base
    fetch("https://uiuclsserver.onrender.com/contents", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        uploadedContent: data.uploadedContent,
        img: contentImgData?.data?.display_url || null,
        email: userInfo?.email,
        userName: userInfo?.firstName,
        date: date,
        selectedOptions: selectedOptions,
      }),
    })
      .then((response) => response.json())
      .then(async (responseData) => {
        closeModal();
        if (responseData.data) {
          await refetch(); // Refetch the content to update the feed without a page reload

          Swal.fire("Content uploaded", responseData);
        }
      })
      .catch((error) => {
        console.error("Error during fetch:", error);
      });
  };
  const handleCheckboxChange = (option) => {
    if (selectedOptions.includes(option)) {
      // If the option is already selected, remove it
      setSelectedOptions(selectedOptions.filter((item) => item !== option));
    } else {
      // If the option is not selected, add it
      setSelectedOptions([...selectedOptions, option]);
    }
  };
  return (
    <div className=" p-8 ">
      <div className="flex postDiv">
        {userInfo?.image ? (
          <>
            <img className="postImg" src={userInfo?.image} alt="" />
          </>
        ) : (
          <>
            <FaUserCircle className="profileIconPost" />
          </>
        )}

        <p className="postInput" onClick={openModal}>
          Any Queries? Ask a question
        </p>
      </div>
      {isModalOpen && (
        <>
          <div className="modal-overlay" onClick={closeModal}></div>

          <div className="postDetails">
            <p>Post Details</p>
            <form onSubmit={handleSubmit(onSubmit)} className="">
              <textarea
                type="text"
                className="textAreaStyle"
                placeholder=" What's on you mind? "
                {...register("uploadedContent")}
              />
              <br />
              <input {...register("image")} type="file" className=" " />

              <div className="checkbox-group">
                <label>
                  <input
                    type="checkbox"
                    value="Programming"
                    onChange={() => handleCheckboxChange("Programming")}
                  />
                  Programming{" "}
                </label>
                <label>
                  <input
                    type="checkbox"
                    value="Sports"
                    onChange={() => handleCheckboxChange("Sports")}
                  />
                  Sports{" "}
                </label>
                <label>
                  <input
                    type="checkbox"
                    value="Library"
                    onChange={() => handleCheckboxChange("Library")}
                  />
                  Library{" "}
                </label>
                <label>
                  <input
                    type="checkbox"
                    value="Study Room"
                    onChange={() => handleCheckboxChange("Study Room")}
                  />
                  Study Room{" "}
                </label>
              </div>

              <div className="flex gap-4 justify-end">
                <p onClick={closeModal} className="">
                  cancel
                </p>{" "}
                <button type="submit" className="">
                  Submit
                </button>
              </div>
            </form>
          </div>
        </>
      )}
    </div>
  );
};

export default NewFeedPostUp;
