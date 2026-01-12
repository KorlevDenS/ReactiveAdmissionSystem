import { Link } from "react-router-dom";

export function NavBar() {
    return (
        <nav style={{
            display: "flex",
            gap: "20px",
            padding: "10px",
            background: "#f0f0f0",
            borderBottom: "1px solid #ccc"
        }}>
            <Link to="/">Applicants</Link>
            <Link to="/statistics">Statistics</Link>
            <Link to="/submit">Submit Documents</Link>
        </nav>
    );
}
