import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Capture from "./pages/Capture";
import Result from "./pages/Result";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />

        <Route path="/capture" element={<Capture />} />

        <Route path="/Result" element={<Result />} />
      </Routes>
    </Router>
  );
}

export default App;
