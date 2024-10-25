import { HiMiniUserGroup } from "react-icons/hi2";
import "./Navbar.css";
import { GoHomeFill } from "react-icons/go";
import { LuMessagesSquare } from "react-icons/lu";
import { IoMdNotificationsOutline } from "react-icons/io";
import { FaRegUserCircle, FaSearch, FaUserCircle } from "react-icons/fa";
import { NavLink, useNavigate } from "react-router-dom";
import { useContext, useEffect, useRef, useState } from "react";
import { AuthContext } from "../../Provider/AuthProvider";
import useUser from "../hooks/useUser";
import Swal from "sweetalert2";
import profileImg from "../../assets/navimg.png";
import { IoSettingsSharp } from "react-icons/io5";
import { FiLogOut } from "react-icons/fi";
const Navbar = () => {
  // ! find the current user
  //* find the user id and then send the id to the click fnc and work on that

  const { user, logOut } = useContext(AuthContext);
  const [users] = useUser();

  const userInfo = users.find((userEmail) => userEmail?.email == user?.email);
  console.log(userInfo);
  const fullName = userInfo?.firstName + " " + userInfo?.lastName;
  const [isModalOpen, setIsModalOpen] = useState(false);
  const openModal = () => {
    setIsModalOpen(true);
  };
  const closeModal = () => {
    setIsModalOpen(false);
  };
  const navigate = useNavigate();
  const modalRef = useRef(null);
  const handleLogOut = () => {
    logOut()
      .then(() => {
        Swal.fire(`${user?.email} LogOut`);
        navigate("/");
      })
      .catch((error) => alert(error));
  };
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (modalRef.current && !modalRef.current.contains(event.target)) {
        closeModal();
      }
    };

    // Add event listener if the modal is open
    if (isModalOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    } else {
      document.removeEventListener("mousedown", handleClickOutside);
    }

    // Clean up the event listener on component unmount
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isModalOpen]);
  const [searchTerm, setSearchTerm] = useState("");
  const [filteredUsers, setFilteredUsers] = useState(users);
  //  this is per key search
  useEffect(() => {
    if (searchTerm) {
      const result = users.filter((user) =>
        user.firstName.toLowerCase().includes(searchTerm.toLowerCase())
      );
      setFilteredUsers(result);
    } else {
      setFilteredUsers([]); // If the search term is empty, show no users
    }
  }, [searchTerm, users]);
  const handleClickid = (id) => {
    console.log(id);
  };
  return (
    <div>
      <div className="bg-slate-700 flex  justify-between  p-5">
        {/* TODO: here UIU Cls and search field  */}
        <div>
          <div className="flex items-center">
            <div>
              <img className="w-[200px]" src={profileImg} alt="" />
            </div>
            <div>
              <input
                className="search__field"
                type="text"
                placeholder="Looking For some one"
                onChange={(e) => setSearchTerm(e.target.value)}
              />
              {
                filteredUsers.length > 0 ? (
                  filteredUsers.map((user) => (
                    <li className="searchModel" key={user._id}>
                      <NavLink to={`/friendProfile/${user._id}`}>
                        {user?.firstName} {user?.lastName}
                      </NavLink>
                    </li>
                  ))
                ) : (
                  <></>
                ) // Show message if no users match
              }
            </div>
          </div>
        </div>

        {/* //*here all nav option/icon  */}
        <div className="flex-1">
          <div className="flex   justify-end items-center">
            <div className="flex flex-col items-center mr-8">
              <NavLink to="/home">
                <GoHomeFill className="iconDesign" />
              </NavLink>
            </div>{" "}
            <NavLink to="/groups" className="mr-8">
              <HiMiniUserGroup className="iconDesign" />
            </NavLink>
            <NavLink to={"/chatHome"} className="mr-8">
              <LuMessagesSquare className="iconDesign" />
            </NavLink>
            {/*  here you can add the notification  */}{" "}
            <div onClick={openModal}>
              {userInfo?.image ? (
                <>
                  <img className="imgSizenav" src={userInfo?.image} alt="" />
                </>
              ) : (
                <>
                  <FaUserCircle className="profileIcon cursor-pointer" />
                </>
              )}
            </div>
          </div>
        </div>
      </div>

      {isModalOpen && (
        <div ref={modalRef} className="list-none profileModal bg-white border">
          <div className="flex text-xl mt-2 mb-2">
            <FaUserCircle className="profileIcon mr-2"></FaUserCircle>
            <p>{fullName}</p>
          </div>
          <div className="bg-white">
            <hr />
            <NavLink to="/userProfile">
              <div className="flex items-center  mb-2 mt-2 text-xl">
                <FaRegUserCircle className="mr-2 " />
                <li onClick={closeModal}>Profile</li>
              </div>
            </NavLink>
            <hr />

            <NavLink to={"/profileSetting"}>
              <div className="flex items-center mt-2 mb-2 text-xl">
                <IoSettingsSharp className="mr-2" />
                <li>Settings</li>
              </div>
            </NavLink>

            <hr />
            <div className="flex items-center mt-2 mb-2  text-xl">
              <FiLogOut className=" mr-2 " />
              <li onClick={closeModal}>
                <button onClick={handleLogOut}>Logout </button>
              </li>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Navbar;
