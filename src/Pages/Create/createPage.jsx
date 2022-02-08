//Hooks and Components
import { useState, useEffect } from "react";
import { useCollection } from "../../Hooks/useCollection";
import { useAuthContext } from "../../Hooks/useAuthContext";
import { timeStamp } from "../../Firebase/config";
import { useFirestore } from "../../Hooks/useFireStore";
import { useNavigate } from "react-router-dom";
import Select from "react-select";

//Styles
import "./createPage.styles.css";

const catagories = [
        { value: "development", label: "Development" },
        { value: "design", label: "Design" },
        { value: "sales", label: "Sales" },
        { value: "marketing", label: "Marketing" },
];

export const CreatePage = () => {
        const { addDocument, response } = useFirestore("Projects");
        const [prjName, setPrjName] = useState("");
        const [prjDetails, setPrjDetails] = useState("");
        const [dueDate, setDueDate] = useState("");
        const [category, setCategory] = useState("");
        const [assignedUsers, setAssignedUsers] = useState([]);
        const [users, setUsers] = useState([]);
        const [error, setError] = useState(null);
        const { documents } = useCollection("users");
        const { user } = useAuthContext();
        const navigate = useNavigate();

        const handleSubmit = async (e) => {
                e.preventDefault();
                setError(null);

                if (!category) {
                        setError("Please Select a project category ");
                        return;
                }
                if (assignedUsers.length < 1) {
                        setError("Please assign the project to at least 1 user");
                        return;
                }
                const createdBy = {
                        displayName: user.displayName,
                        photoURL: user.photoURL,
                        id: user.uid,
                };
                const assignedUsersList = assignedUsers.map((u) => ({
                        displayName: u.value.displayName,
                        photoURL: u.value.photoURL,
                        id: u.value.id,
                }));
                const project = {
                        prjName,
                        prjDetails,
                        category: category.value,
                        dueDate: timeStamp.fromDate(new Date(dueDate)),
                        comments: [],
                        createdBy,
                        assignedUsersList,
                };
                await addDocument(project);
                if (!response.error) {
                        navigate("/");
                }
        };
        useEffect(() => {
                if (!response.error) {
                        setPrjName("");
                        setPrjDetails("");
                        setDueDate("");
                        setCategory("");
                        setAssignedUsers([]);
                }
        }, [response]);
        useEffect(() => {
                if (documents) {
                        let options = documents.map((user) => ({
                                value: user,
                                label: user.displayName,
                        }));
                        setUsers(options);
                }
        }, [documents]);
        return (
                <form className="create-form" onSubmit={handleSubmit}>
                        <label>
                                <span>Project Name</span>
                                <input type="text" onChange={(e) => setPrjName(e.target.value)} value={prjName} required />
                        </label>
                        <label>
                                <span>Project Details</span>
                                <textarea type="text" onChange={(e) => setPrjDetails(e.target.value)} value={prjDetails} required />
                        </label>
                        <label>
                                <span>Set due date</span>
                                <input type="date" onChange={(e) => setDueDate(e.target.value)} value={dueDate} required />
                        </label>
                        <label>
                                <span>Project category:</span>
                                <Select options={catagories} required onChange={(option) => setCategory(option)} />
                        </label>
                        <label>
                                <span>Assign to: </span>
                                <Select
                                        options={users}
                                        isMulti
                                        className="basic-multi-select"
                                        classNamePrefix="select"
                                        required
                                        onChange={(option) => setAssignedUsers(option)}
                                />
                        </label>
                        <button className="btn">Add Project</button>
                        {error && <p className="error">{error} </p>}
                </form>
        );
};
