import FAQ from "../components/FAQ";
import Footer from "../components/Footer";
import Hero from "../components/Hero";
import HowItWorks from "../components/HowItWorks";
import Navbar from "../components/Navbar";

function App() {
  return (
    <div
      className="min-h-screen font-sans overflow-x-hidden"
      style={{
        background:
          "linear-gradient(180deg, #fff5f7 0%, #ffffff 30%, #fdf9ff 70%, #fff5f7 100%)",
      }}
    >
      <Navbar />
      <Hero />
      <HowItWorks />
      <FAQ />
      <Footer />
    </div>
  );
}

export default App;
