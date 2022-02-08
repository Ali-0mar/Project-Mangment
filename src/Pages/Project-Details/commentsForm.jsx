//Hooks and components
import { useState } from "react";
import { Avatar } from "../../Components/Avatar/avatar";
import { useFirestore } from "../../Hooks/useFireStore";
import { useAuthContext } from "../../Hooks/useAuthContext";
import { timeStamp } from "../../Firebase/config";
import formatDistanceToNow from "date-fns/formatDistanceToNow";
//Styles
import "./commentforms.styles.css";

export const CommentsForm = ({ project }) => {
        const [newComment, setNewComment] = useState("");
        const { user } = useAuthContext();
        const { updateDocument, response } = useFirestore("Projects");
        const handleSubmit = async (e) => {
                e.preventDefault();
                const comment = {
                        displayName: user.displayName,
                        photoURL: user.photoURL,
                        content: newComment,
                        createdAt: timeStamp.fromDate(new Date()),
                        id: Math.random(),
                };
                await updateDocument(project.id, {
                        comments: [...project.comments, comment],
                });
                if (!response.error) {
                        setNewComment("");
                }
        };
        return (
                <div className="comments">
                        <h2>Comments:</h2>
                        <div className="comments-list">
                                {project.comments.length > 0 &&
                                        project.comments.map((comment) => {
                                                return (
                                                        <div className="comment" key={comment.id}>
                                                                <div className="comment-owner">
                                                                        <Avatar src={comment.photoURL} />
                                                                        <div>
                                                                                <p>{comment.displayName} </p>
                                                                                <span className="comment-date">
                                                                                        {formatDistanceToNow(comment.createdAt.toDate(), {
                                                                                                addSuffix: true,
                                                                                        })}
                                                                                </span>
                                                                        </div>
                                                                </div>
                                                                <p className="comment-body">{comment.content} </p>
                                                        </div>
                                                );
                                        })}
                        </div>
                        <form className="comments-form" onSubmit={handleSubmit}>
                                <label>
                                        <span>Add a new Comment</span>
                                        <input required onChange={(e) => setNewComment(e.target.value)} value={newComment} />
                                </label>
                                <button className="btn">Comment</button>
                        </form>
                </div>
        );
};
