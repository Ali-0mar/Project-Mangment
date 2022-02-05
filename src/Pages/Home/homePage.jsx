//Hooks and Components
import { useState } from "react";
import { useCollection } from "../../Hooks/useCollection";
import { ProjectList } from "../../Components/ProjectList/projectList";
import { ProjectFilter } from "./projectsFilter";
import { useAuthContext } from "../../Hooks/useAuthContext";

//Styles
import "./homePage.styles.css";

export const HomePage = () => {
        const { documents, error } = useCollection("Projects");
        const [currentFilter, setCurrentFilter] = useState("All");
        const { user } = useAuthContext();
        const handleFilter = (newFilter) => {
                setCurrentFilter(newFilter);
        };
        const filteredProjects = documents
                ? documents.filter((document) => {
                          switch (currentFilter) {
                                  case "All":
                                          return true;
                                  case "My Projects":
                                          let filteredUser = false;
                                          document.assignedUsersList &&
                                                  document.assignedUsersList.forEach((u) => {
                                                          if (u.id === user.uid) {
                                                                  filteredUser = true;
                                                          }
                                                  });
                                          return filteredUser;
                                  case "Development":
                                  case "Design":
                                  case "Marketing":
                                  case "Sales":
                                          console.log(currentFilter, document.category);
                                          return document.category === currentFilter.toLowerCase();
                                  default:
                                          return true;
                          }
                  })
                : null;
        return (
                <div className="dash-board">
                        <h2 className="dashboard-title">Dashboard</h2>
                        {error && <p className="error">{error} </p>}
                        {document && <ProjectFilter currentFilter={currentFilter} handleFilter={handleFilter} />}
                        {documents && <ProjectList projects={filteredProjects} />}
                </div>
        );
};
