//Hooks and Components
import { useCollection } from "../../Hooks/useCollection";
import { Avatar } from "../Avatar/avatar";
//Styles
import "./users-list.styles.css";

export const UsersList = () => {
        const { error, documents } = useCollection("users");
        return (
                <div className="users-list">
                        {error && <div className="error">{error}</div>}
                        {documents &&
                                documents.map((user) => (
                                        <div key={user.id} className="user">
                                                {user.online && <span className="ON">●</span>}
                                                <Avatar src={user.photoURL} />
                                                <span>{user.displayName} </span>
                                        </div>
                                ))}
                </div>
        );
};
