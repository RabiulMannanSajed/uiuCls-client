import React, { useContext } from "react";
import loginImg from "../../../assets/login.png";
import { useForm } from "react-hook-form";
import { NavLink, useNavigate } from "react-router-dom";
import { AuthContext } from "../../../Provider/AuthProvider";
import Swal from "sweetalert2";

// TODO add the firebase here
// ! and also add the data base

const SignUp = () => {
  //* this is from hook form
  const {
    register,
    handleSubmit,
    reset,
    formState: { error },
  } = useForm();
  const { createUser, UpdateUserProfile } = useContext(AuthContext);
  const navigate = useNavigate();
  const onSubmit = (data) => {
    //  this is for signUp a user
    createUser(data.email, data.password).then((result) => {
      const loggedUser = result.user;
      // console.log(loggedUser);

      //  this is for update the user Data
      UpdateUserProfile(data.name, data.email)
        .then(() => {
          const saveUser = {
            firstName: data.firstName,
            lastName: data.lastName,
            email: data.email,
            uiuId: data.uiuId,
            subject: data.subject,
            password: data.password,
          };

          //  this is foe send data to the database
          fetch("https://uiuclsserver.onrender.com/users", {
            method: "POST",
            headers: {
              "COntent-Type": "application/json",
            },
            body: JSON.stringify(saveUser),
          })
            .then((res) => res.json())
            .then((data) => {
              if (data.insertedId) {
                reset();
                Swal.fire("User Created Successfully");
                navigate("/home");
              }
            });
        })
        //  this is for catch the error of user
        .catch((error) => console.log(error));
    });
  };

  return (
    <div className="p-10 bg-white flex items-center">
      <div className="flex-1">
        <h1 className="textColor mb-[10%] ">UiU CLS</h1>
        <p className="textColor ml-[65%]">
          <u>Sign Up</u>
        </p>
        <p>Create Your Account To Explore The Wisdom</p>
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="mt-[5%] divOfSignUp">
            <label>First Name </label>
            <br />
            <input
              type="text"
              {...register("firstName")}
              required={true}
              name="firstName"
              placeholder="Enter Your First Name "
              className="input-bgRemove"
            />
          </div>
          {/* here the other info  */}
          <div className="mt-[5%] divOfSignUp">
            <label>Last Name</label>
            <br />
            <input
              type="text"
              {...register("lastName")}
              required={true}
              name="lastName"
              placeholder="Enter Your Last Name "
              className="input-bgRemove"
            />
          </div>
          <div className="mt-[5%] divOfSignUp">
            <label>Email</label>
            <br />
            <input
              {...register("email", {
                required: true,
                pattern: {
                  /* TODO : cnage the bscse */
                  // value: /\S+@bscse\.uiu\.ac\.bd$/,
                  message: "Entered value does not match email format",
                },
              })}
              name="email"
              placeholder="email"
              className="input-bgRemove"
              type="email"
            />
            {/* {errors.email && (
              <span className="text-red-600">This field is required</span>
            )} */}
          </div>
          <div className="mt-[5%] divOfSignUp">
            <label>University ID</label>
            <br />
            <input
              type="number"
              {...register("uiuId")}
              required={true}
              // name="uiuId"
              placeholder="Enter Your ID"
              className="input-bgRemove"
            />
          </div>{" "}
          <div className="mt-[5%] divOfSignUp">
            <label>Department Name</label>
            <br />
            <select
              {...register("subject", { required: true })}
              name="subject"
              className="input-bgRemove"
              defaultValue="CSE"
            >
              <option value="CSE">CSE</option>
              <option value="EEE">EEE</option>
              <option value="BBA">BBA</option>
              <option value="CE">CE</option>
              <option value="ECONOMICS">ECONOMICS</option>
            </select>
          </div>
          <div className="divOfSignUp mt-[2%] mb-[5%]">
            <label> Password</label>
            <br />
            <input
              type="password"
              {...register("password", {
                required: true,
              })}
              name="password"
              placeholder="Enter Your password"
              className="input-bgRemove"
            />
          </div>
          {/* this is submit btn */}
          <div className="form-control mt-6 mb-9 w-[80%]">
            <input className="signUpBtn" type="submit" value="Create Account" />
          </div>
        </form>

        <p>
          Already have an account{" "}
          <NavLink to="/" className={"text-blue-500"}>
            {" "}
            Login
          </NavLink>{" "}
        </p>
      </div>
      <div className="flex-1">
        <img className="w-[100%]" src={loginImg} alt="" />
      </div>
    </div>
  );
};

export default SignUp;
