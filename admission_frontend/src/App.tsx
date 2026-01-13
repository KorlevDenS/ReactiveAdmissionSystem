import { Routes, Route } from "react-router-dom";
import { ApplicantsPage } from "./pages/ApplicantsPage";
import { StatisticsPage } from "./pages/StatisticsPage";
import { SubmitDocumentsPage } from "./pages/SubmitDocumentsPage";
import { NavBar } from "./components/NavBar";
import ProgramsSearchPage from "./pages/ProgramsSearchPage";
import styles from "./App.module.css";

function App() {
    return (
        <div>
            <NavBar />

            <div className={styles.appContainer}>
                <Routes>
                    <Route path="/" element={<ApplicantsPage />} />
                    <Route path="/statistics" element={<StatisticsPage />} />
                    <Route path="/submit" element={<SubmitDocumentsPage />} />
                    <Route path="/programs" element={<ProgramsSearchPage />} />
                </Routes>
            </div>
        </div>
    );
}

export default App;
