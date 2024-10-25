import React, { useContext, useState } from "react";
import loginImg from "../../../assets/login.png";
import loginImg2 from "../../../assets/loginimg2.png";
import "./Login.css";
import { NavLink, useNavigate } from "react-router-dom";
import { AuthContext } from "../../../Provider/AuthProvider";
import Swal from "sweetalert2";
const Login = () => {
  //*  this auth is coming from authProvider
  const { signIn } = useContext(AuthContext);
  const [firebaseErrorMessage, setFirebaseErrorMessage] = useState(null);
  const navigate = useNavigate();
  const handleLogin = (e) => {
    e.preventDefault(); //* this is stop the reload the page
    const form = e.target;
    const email = form.email.value;
    const password = form.password.value;
    //*  value send to the firebase
    signIn(email, password)
      .then((result) => {
        const user = result.user;
        console.log(user);
        Swal.fire("Successfully Login");
        navigate("/home");
      })
      .catch((error) => {
        const errorMessage = error.errorMessage;
        setFirebaseErrorMessage(errorMessage);
      });
  };
  return (
    <div className="p-10 flex items-end bg-white">
      <div className="flex-1 ">
        <img src={loginImg2} alt="" />
        <h1 className="textColor mb-[10%] mt-[7%]">UiU CLS</h1>
        <p className="textColor">
          Empowering Minds, <br /> Transforming Futures
        </p>
        <p>Welcome back! Please login to your account.</p>

        <form onSubmit={handleLogin}>
          <div className="mt-[5%] divOfSignUp">
            <label htmlFor="">Email Address</label>
            <br />
            <input
              type="email"
              name="email"
              placeholder="Enter Your Email"
              className="input-bgRemove"
            />
          </div>

          <div className="divOfSignUp mt-[2%] mb-[5%]">
            <label htmlFor=""> Password</label>
            <br />
            <input
              type="password"
              name="password"
              placeholder="Enter Your password"
              className="input-bgRemove"
            />
          </div>
          <p className="text-red-500">{firebaseErrorMessage}</p>
          <button className="signUpBtn ">Login</button>
        </form>
        <p className="mt-4">
          Don't have an Account.
          <NavLink to="/signUp" className={"text-blue-500"}>
            Create an account
          </NavLink>
        </p>
      </div>
      <div className="flex-1">
        <img className="w-[100%]" src={loginImg} alt="" />
      </div>
    </div>
  );
};

export default Login;
