import { NavLink } from "react-router-dom";
import styles from "./NavBar.module.css";

export function NavBar() {
    return (
        <div className={styles.navbarWrapper}>
            <nav className={styles.navbar}>
                <div className={styles.clouds}></div>

                <NavLink
                    to="/"
                    className={({ isActive }) =>
                        isActive ? `${styles.link} ${styles.active}` : styles.link
                    }
                >
                    Applicants
                </NavLink>

                <NavLink
                    to="/statistics"
                    className={({ isActive }) =>
                        isActive ? `${styles.link} ${styles.active}` : styles.link
                    }
                >
                    Statistics
                </NavLink>

                <NavLink
                    to="/submit"
                    className={({ isActive }) =>
                        isActive ? `${styles.link} ${styles.active}` : styles.link
                    }
                >
                    Submit Documents
                </NavLink>

                <NavLink
                    to="/programs"
                    className={({ isActive }) =>
                        isActive ? `${styles.link} ${styles.active}` : styles.link
                    }
                >
                    Search Programs
                </NavLink>
            </nav>
        </div>
    );
}
