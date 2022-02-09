//Hooks and Components
import { Avatar } from "../../Components/Avatar/avatar";
import { useAuthContext } from "../../Hooks/useAuthContext";
import { useFirestore } from "../../Hooks/useFireStore";
import { useNavigate } from "react-router-dom";

//Styles
import "./projectsummury.styles.css";

export const ProjectSummury = ({ project }) => {
        const { user } = useAuthContext();
        const { delDocument, response } = useFirestore("Projects");
        const navigate = useNavigate();
        const handleClick = async (e) => {
                await delDocument(project.id);
                if (!response.error) {
                        navigate("/");
                }
        };
        return (
                <div className="project-summury">
                        <h2>{project.prjName}</h2>
                        <p> By: {project.createdBy.displayName} </p>
                        <p className="date">Due date: {project.dueDate.toDate().toDateString()}</p>
                        <p className="project-overview">{project.prjDetails} </p>
                        <h4>Assigned to :</h4>
                        <div className="users">
                                {project.assignedUsersList &&
                                        project.assignedUsersList.map((user) => (
                                                <div key={user.id} className="assigned-users">
                                                        <Avatar src={user.photoURL} />
                                                        <p>{user.displayName} </p>
                                                </div>
                                        ))}
                        </div>
                        {user.uid === project.createdBy.id ? (
                                <button className="btn" onClick={handleClick}>
                                        Mark as complete
                                </button>
                        ) : null}
                </div>
        );
};
