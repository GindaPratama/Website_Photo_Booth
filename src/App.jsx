import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Capture from "./pages/Capture";
import Result from "./pages/Result";

function App() {
  return (
    // Router ini yang bikin web lu bisa pindah halaman tanpa loading
    <Router>
      <Routes>
        {/* Kalau URL-nya '/', tampilkan halaman Home */}
        <Route path="/" element={<Home />} />

        {/* Kalau URL-nya '/capture', tampilkan halaman Capture */}
        <Route path="/capture" element={<Capture />} />

        {/* Halaman Result */}
        <Route path="/Result" element={<Result />} />
      </Routes>
    </Router>
  );
}

export default App;
