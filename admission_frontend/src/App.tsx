import { Routes, Route } from "react-router-dom";
import { ApplicantsPage } from "./pages/ApplicantsPage";
import { StatisticsPage } from "./pages/StatisticsPage";
import { SubmitDocumentsPage } from "./pages/SubmitDocumentsPage";
import { NavBar } from "./components/NavBar";

function App() {
    return (
        <div>
            <NavBar />

            <div style={{ padding: "20px" }}>
                <Routes>
                    <Route path="/" element={<ApplicantsPage />} />
                    <Route path="/statistics" element={<StatisticsPage />} />
                    <Route path="/submit" element={<SubmitDocumentsPage />} />
                </Routes>
            </div>
        </div>
    );
}

export default App;
