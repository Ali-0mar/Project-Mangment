//Styles
import "./projectfilter.styles.css";

const FILTERLIST = ["All", "My Projects", "Development", "Design", "Marketing", "Sales"];

export const ProjectFilter = ({ currentFilter, handleFilter }) => {
        const handleClick = (newFilter) => {
                handleFilter(newFilter);
        };
        return (
                <div className="project-filter">
                        <nav>
                                <p>Filter by: </p>
                                {FILTERLIST.map((f) => (
                                        <button key={f} onClick={() => handleClick(f)} className={currentFilter === f ? "active" : undefined}>
                                                {f}
                                        </button>
                                ))}
                        </nav>
                </div>
        );
};
