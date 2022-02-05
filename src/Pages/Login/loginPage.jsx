//Hooks
import { useEffect, useState } from "react";
import { useLogin } from "../../Hooks/useLogin";
//Styles
import "./loginPage.styles.css";

export const Login = () => {
        const [email, setEmail] = useState("");
        const [password, setPassword] = useState("");
        const { error, isLoading, login } = useLogin();
        const handleSubmit = (e) => {
                e.preventDefault();
                login(email, password);
        };
        useEffect(() => {
                if (!isLoading) {
                        setEmail("");
                        setPassword("");
                }
        }, [isLoading]);
        return (
                <form onSubmit={handleSubmit} className="form-in">
                        <h2>Sign In</h2>
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
                        {isLoading ? (
                                <button className="btn">Proccesing..</button>
                        ) : (
                                <button className="btn">Sign In</button>
                        )}

                        {error && <div className="error">{error}</div>}
                </form>
        );
};
