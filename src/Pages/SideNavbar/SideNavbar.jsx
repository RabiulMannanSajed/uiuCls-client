import { NavLink } from "react-router-dom";
import "./SideNavbar.css";
import useContent from "../hooks/useContent";
import { FaCode } from "react-icons/fa";
import { FcSportsMode } from "react-icons/fc";
import { LuLibrary } from "react-icons/lu";
import { SiGoogleclassroom } from "react-icons/si";

const SideNavbar = () => {
  const [contents, refetch] = useContent();
  const countPostsByCategory = (category) => {
    refetch();
    return contents.filter((content) =>
      content.selectedOptions.includes(category)
    ).length;
  };
  return (
    <div className="bg-slate-700 sideNavbar min-h-screen flex  flex-col">
      <div className="flex-1">
        <p className="text-xl text-[#ffffff] mb-4">Top Categories</p>
        <div className="flex flex-col gap-2">
          <NavLink
            to="/category?name=Programming"
            className="flex items-center mt-5"
          >
            <FaCode className="mr-2" />
            Programming {countPostsByCategory("Programming")}
          </NavLink>
          <NavLink
            to="/category?name=Sports"
            className="flex items-center mt-5"
          >
            <FcSportsMode className="mr-2" />
            Sports {countPostsByCategory("Sports")}
          </NavLink>
          <NavLink
            to="/category?name=Library"
            className="flex items-center mt-5"
          >
            <LuLibrary className="mr-2" />
            Library {countPostsByCategory("Library")}
          </NavLink>
          <NavLink
            to="/category?name=Study Room"
            className="flex items-center mt-5"
          >
            <SiGoogleclassroom className="mr-2" />
            Study Room {countPostsByCategory("Study Room")}
          </NavLink>
        </div>
      </div>
      <div className="flex-1">{/* <p>Groups</p> */}</div>
    </div>
  );
};

export default SideNavbar;
