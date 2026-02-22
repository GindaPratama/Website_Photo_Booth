// 1. Import komponen Navbar-nya ke panggung utama
import FAQ from "../components/FAQ";
import Footer from "../components/Footer";
import Hero from "../components/Hero";
import HowItWorks from "../components/HowItWorks";
import Navbar from "../components/Navbar";

function App() {
  return (
    <div className="min-h-screen bg-[#fafafa] font-sans pt-8">
      <Navbar />
      <Hero />
      <HowItWorks />
      <FAQ />
      <Footer />
    </div>
  );
}

export default App;
