//Hooks
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { HomePage } from "./Pages/Home/homePage";
import { CreatePage } from "./Pages/Create/createPage";
import { Login } from "./Pages/Login/loginPage";
import { SignUp } from "./Pages/SignUp/signUp";
import { ProjectDetails } from "./Pages/Project-Details/projectDetails";
import { Header } from "./Components/Header/header";
import { SideBar } from "./Components/Sidebar/sidebar";
import { useAuthContext } from "./Hooks/useAuthContext";
import { UsersList } from "./Components/UsersList/usersList";
//Styles
import "./App.css";

function App() {
        const { user, authIsReady } = useAuthContext();
        return (
                // <div className="App">
                <div className={user ? "App-2cols" : "App-1col"}>
                        {authIsReady && (
                                <BrowserRouter>
                                        {user && <SideBar />}
                                        <div className="container">
                                                <Header />
                                                <Routes>
                                                        <Route path="/" element={user ? <HomePage /> : <Navigate to={"/login"} />} />
                                                        <Route path="/login" element={user ? <Navigate to={"/"} /> : <Login />} />
                                                        <Route path="/signup" element={user ? <Navigate to={"/"} /> : <SignUp />} />
                                                        <Route path="/create" element={user ? <CreatePage /> : <Navigate to={"/login"} />} />
                                                        <Route path="/projects/:id" element={user ? <ProjectDetails /> : <Navigate to={"/"} />} />
                                                </Routes>
                                                {user && <UsersList />}
                                        </div>
                                </BrowserRouter>
                        )}
                </div>
        );
}

export default App;
