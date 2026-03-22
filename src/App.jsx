import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Capture from "./pages/Capture";
import Result from "./pages/Result";
import Tentang from "./pages/Tentang";
import BackToTop from "./components/BackToTop";

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/capture" element={<Capture />} />
        <Route path="/result" element={<Result />} />
        <Route path="/tentang" element={<Tentang />} />
      </Routes>
      <BackToTop />
    </BrowserRouter>
  );
}
