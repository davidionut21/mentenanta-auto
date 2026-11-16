
import { Route, Routes } from "react-router-dom";
import Layout from "./components/Layout.jsx";
import OperatiuniPage from "./pages/OperatiuniPage.jsx";
import OperatiuneDetaliuPage from "./pages/OperatiuneDetaliuPage.jsx";
import DesprePage from "./pages/DesprePage.jsx";
import NotFoundPage from "./pages/NotFoundPage.jsx";

export default function App() {
    return (
        <Routes>
            <Route element={<Layout />}>
                <Route path="/" element={<OperatiuniPage />} />
                <Route
                    path="/operatiuni/:id"
                    element={<OperatiuneDetaliuPage />}
                />
                <Route path="/despre" element={<DesprePage />} />
                <Route path="*" element={<NotFoundPage />} />
            </Route>
        </Routes>
    );
}
