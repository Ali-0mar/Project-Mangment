import { NavLink } from "react-router-dom";
import DashboardIcon from "../../assets/dashboard_icon.svg";
import AddIcon from "../../assets/add_icon.svg";
import { useAuthContext } from "../../Hooks/useAuthContext";
import { Avatar } from "../Avatar/avatar";
//Styles
import "./sidebar.style.css";

export const SideBar = () => {
        const { user } = useAuthContext();
        // const { displayName, photoURL } = user;
        // console.log(displayName, photoURL);
        return (
                <div className="sidebar">
                        <div className="welcome">
                                <Avatar src={user.photoURL} />
                                <span className="userName">{user.displayName}</span>
                        </div>
                        <nav className="side-links">
                                <ul>
                                        <li>
                                                <NavLink to={"/"}>
                                                        <img src={DashboardIcon} alt="Dashboard Icon" />
                                                        <span>Dashboard</span>
                                                </NavLink>
                                        </li>
                                        <li>
                                                <NavLink to={"/create"}>
                                                        <img src={AddIcon} alt="Add Project Icon" />
                                                        <span>New Project</span>
                                                </NavLink>
                                        </li>
                                </ul>
                        </nav>
                        <span className="users-bar">Users</span>
                </div>
        );
};
