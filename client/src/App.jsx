import ConnectPage from "./pages/ConnectPage";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import ReportPage from "./pages/ReportPage";
import SavedQueriesPage from "./pages/SavedQueriesPage";
import ClientPage from "./pages/ClientPage";

const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/connect" element={<ConnectPage />} />
        <Route path="/createReport" element={<ReportPage />} />
        <Route path="/savedReport" element={<SavedQueriesPage />} />
        <Route path="/clientReport" element={<ClientPage />} />
      </Routes>
    </BrowserRouter>
  );
};

export default App;
