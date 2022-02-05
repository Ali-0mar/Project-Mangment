//Hooks and Components
import { useParams } from "react-router-dom";
import { useDocument } from "../../Hooks/useDocument";
import { ProjectSummury } from "./projectSummury";
import { CommentsForm } from "./commentsForm";

//Styles
import "./projectDetails.styles.css";

export const ProjectDetails = () => {
        const { id } = useParams();
        const { document, error } = useDocument("Projects", id);
        // console.log(document);

        if (error) {
                return <div className="error">{error} </div>;
        }
        if (!document) {
                return <div className="loading">Loading...</div>;
        }
        return (
                <div className="project-details">
                        <ProjectSummury project={document} />
                        <CommentsForm project={document} />
                </div>
        );
};
