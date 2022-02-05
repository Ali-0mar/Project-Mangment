//Hooks
import Temple from "../../assets/temple.svg";
import { Link } from "react-router-dom";
import { useAuthContext } from "../../Hooks/useAuthContext";
import { useLogout } from "../../Hooks/useLogout";

//Styles
import "./header.styles.css";

export const Header = () => {
        const { user } = useAuthContext();
        const { logout } = useLogout();

        return (
                <header>
                        <div className="logo-container">
                                <Link to={"/"}>
                                        <img src={Temple} alt="The Temple Logo" />
                                </Link>
                                <span className="page-title">Project Mangment</span>
                        </div>
                        <nav>
                                {!user ? (
                                        <>
                                                <li>
                                                        <Link to={"/login"}> Sign In</Link>
                                                </li>
                                                <li>
                                                        <Link to={"/signup"}> Sign Up</Link>
                                                </li>
                                        </>
                                ) : (
                                        <li>
                                                <button className="btn" onClick={logout}>
                                                        {" "}
                                                        Sign Out
                                                </button>
                                        </li>
                                )}
                        </nav>
                </header>
        );
};
