import { lazy } from "react";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import { Suspense } from "react";
import { useSelector } from "react-redux";

const Home = lazy(() => import("./pages/Home"));
const Quest = lazy(() => import("./pages/Quest"));
const CreateQuest = lazy(() => import("./pages/CreateQuest"));
const DetailQuest = lazy(() => import("./pages/DetailQuest"));

function App() {
  const { currentAccount } = useSelector((state) => state.stateCampaign);
  return (
    <Suspense fallback={<div className="loading-indicator flex items-center justify-center"></div>}>
      <Router>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/campaign" element={<Quest />} />
          <Route path="/campaign/create" element={<CreateQuest />} />
          <Route path="/campaign/detail/:id" element={<DetailQuest />} />
          <Route path="*" element={<Navigate to={currentAccount ? "/campaign" : "/"} replace />} />
        </Routes>
      </Router>
    </Suspense>
  );
}

export default App;
