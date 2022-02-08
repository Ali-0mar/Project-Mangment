import { Avatar } from "../Avatar/avatar";
import { Link } from "react-router-dom";
import "./projectlist.style.css";

export const ProjectList = ({ projects }) => {
        return (
                <div className="projects-list">
                        {projects.length === 0 && <p>No Projects Pending</p>}
                        {projects.map((project) => {
                                return (
                                        <Link to={`/projects/${project.id}`} key={project.id} className="project-link-details">
                                                <h4>{project.prjName}</h4>
                                                <p className="duedate">{project.dueDate.toDate().toDateString()}</p>
                                                <div className="assigned-to">
                                                        <ul>
                                                                {project.assignedUsersList.map((user) => (
                                                                        <li key={user.id}>
                                                                                <Avatar src={user.photoURL} />
                                                                        </li>
                                                                ))}
                                                        </ul>
                                                </div>
                                        </Link>
                                );
                        })}
                </div>
        );
};
