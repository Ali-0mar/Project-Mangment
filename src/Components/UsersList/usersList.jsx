//Hooks and Components
import { useCollection } from "../../Hooks/useCollection";
import { Avatar } from "../Avatar/avatar";
//Styles
import "./users-list.styles.css";

export const UsersList = () => {
        const { error, documents } = useCollection("users");
        return (
                <div className="parent">
                        <div className="users-list">
                                <h2>All Users </h2>
                                {error && <div className="error">{error}</div>}
                                {documents &&
                                        documents.map((user) => (
                                                <div key={user.id} className="user">
                                                        {user.online && (
                                                                <span className="ON">●</span>
                                                        )}
                                                        <span>{user.displayName} </span>
                                                        <Avatar src={user.photoURL} />
                                                </div>
                                        ))}
                        </div>
                </div>
        );
};
