import React from "react";
import { Outlet, useLocation } from "react-router-dom";
import Navbar from "../Pages/Navbar/Navbar";
import SideNavbar from "../Pages/SideNavbar/SideNavbar";

const Main = () => {
  const location = useLocation();
  const noNavbar = location.pathname === "/" || location.pathname === "/signUp";
  return (
    <>
      {noNavbar || <Navbar></Navbar>}
      {noNavbar || <SideNavbar></SideNavbar>}
      <div className="bg-[#EFF0F6]">
        <Outlet></Outlet>
      </div>
    </>
  );
};

export default Main;
