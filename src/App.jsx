import { lazy } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { Suspense } from "react";

const Home = lazy(() => import("./pages/Home"));
const Quest = lazy(() => import("./pages/Quest"));
const CreateQuest = lazy(() => import("./pages/CreateQuest"));
const DetailQuest = lazy(() => import("./pages/DetailQuest"));

function App() {
  return (
    <Suspense fallback={<div>Loadding...</div>}>
      <Router>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/campaign" element={<Quest />} />
          <Route path="/campaign/create" element={<CreateQuest />} />
          <Route path="/campaign/detail/:id" element={<DetailQuest />} />
        </Routes>
      </Router>
    </Suspense>
  );
}

export default App;
