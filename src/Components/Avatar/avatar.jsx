//Styles
import "./avatar.css";

export const Avatar = ({ src }) => {
        return (
                <div className="avatar">
                        <img src={src} alt="Avatar" />
                </div>
        );
};
