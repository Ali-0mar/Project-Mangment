//Styles
import "./projectfilter.styles.css";

const FILTERLIST = ["All", "My Projects", "Development", "Design", "Marketing", "Sales"];

export const ProjectFilter = ({ currentFilter, handleFilter }) => {
        const handleClick = (newFilter) => {
                handleFilter(newFilter);
        };
        return (
                <nav className="filter">
                        {FILTERLIST.map((f) => (
                                <button key={f} onClick={() => handleClick(f)} className={currentFilter === f ? "active" : undefined}>
                                        {f}
                                </button>
                        ))}
                </nav>
        );
};
