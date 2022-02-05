//Hooks and Components
import { useEffect, useState } from "react";
import { useSignup } from "../../Hooks/useSignup";
//Styles
import "./signUp.styles.css";

export const SignUp = () => {
        const [email, setEmail] = useState("");
        const [password, setPassword] = useState("");
        const [displayName, setDisplayName] = useState("");
        const [profilePic, setProfilePic] = useState("");
        const [profilePicErr, setProfilePicErr] = useState(null);
        const { error, isLoading, signUp } = useSignup();
        const handleSubmit = async (e) => {
                e.preventDefault();

                signUp(email, password, displayName, profilePic);
        };
        const handleFileChange = (e) => {
                setProfilePic("");
                let selected = e.target.files[0];
                if (!selected) {
                        setProfilePicErr("Please Choose a profile image");
                        return;
                }
                if (!selected.type.includes("image")) {
                        setProfilePicErr("Please Choose a valid image");
                        return;
                }
                if (!selected.size > 100000) {
                        setProfilePicErr("Profile image shouldn't be larger than 100kb");
                        return;
                }
                setProfilePicErr(null);
                setProfilePic(selected);
        };
        useEffect(() => {
                if (!isLoading) {
                        setEmail("");
                        setPassword("");
                        setDisplayName("");
                        setProfilePic("");
                }
        }, [isLoading]);
        return (
                <form className="from-up" onSubmit={handleSubmit}>
                        <h2>Sign Up</h2>
                        <label>
                                <span>Email</span>
                                <input
                                        type="email"
                                        onChange={(e) => setEmail(e.target.value)}
                                        value={email}
                                        required
                                />
                        </label>
                        <label>
                                <span>Password</span>
                                <input
                                        type="password"
                                        onChange={(e) => setPassword(e.target.value)}
                                        value={password}
                                        required
                                />
                        </label>
                        <label>
                                <span>Display Name</span>
                                <input
                                        type="text"
                                        onChange={(e) => setDisplayName(e.target.value)}
                                        value={displayName}
                                        required
                                />
                        </label>
                        <label>
                                <span>Profile Image</span>
                                <input type="file" onChange={handleFileChange} />
                                {profilePicErr && <div className="error">{profilePicErr} </div>}
                        </label>
                        {isLoading ? (
                                <button className="btn" disabled>
                                        Loading...
                                </button>
                        ) : (
                                <button className="btn">Sign Up</button>
                        )}
                        {error && <div className="error">Please check network connection</div>}
                </form>
        );
};
