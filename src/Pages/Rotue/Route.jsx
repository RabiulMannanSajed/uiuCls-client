import { createBrowserRouter } from "react-router-dom";
import Main from "../../Layout/Main";
import Login from "../Home/Login/Login";
import SignUp from "../Home/SignUp/SignUp";
import Navbar from "../Navbar/Navbar";
import NewFeedHome from "../NewsFeed/NewFeedHome/NewFeedHome";
import CreateGroup from "../Group/CreateGroup/CreateGroup";
import GroupHome from "../Group/GroupHome/GroupHome";
import UserProfile from "../UserInfo/UserProfile/UserProfile";
import UserProfileInfo from "../UserInfo/userProfileInfo/userProfileInfo";
import GroupPosts from "../Group/GroupPosts/GroupPosts";
import ChatHome from "../ChatSystem/ChatHome/chatHome";
import ProfileSetting from "../UserInfo/ProfileSetting/ProfileSetting";
import Programming from "../../SideNavItem/Programming/Programming";

export const route = createBrowserRouter([
  {
    path: "/",
    element: <Main></Main>,
    children: [
      {
        path: "/",
        index: true,
        element: <Login></Login>,
      },
      {
        path: "/signUp",
        element: <SignUp></SignUp>,
      },
      {
        path: "/home",
        element: <NewFeedHome></NewFeedHome>,
      },
      {
        path: "/groups",
        element: <GroupHome></GroupHome>,
      },
      {
        path: "/userProfile",
        element: <UserProfileInfo></UserProfileInfo>,
      },
      {
        path: "/groupPosts/:id",
        element: <GroupPosts></GroupPosts>,
      },
      {
        path: "/profileSetting",
        element: <ProfileSetting></ProfileSetting>,
      },
      {
        path: "/chatHome",
        element: <ChatHome></ChatHome>,
      },
      {
        path: "/category",
        element: <Programming></Programming>,
      },
    ],
  },
]);
