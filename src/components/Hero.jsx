import MockupHero from "../assets/MockupHero.png";
import PictStripIcon from "../assets/PictStripIcon.svg";
import { useNavigate } from "react-router-dom";

const Hero = () => {
  const navigate = useNavigate();

  return (
    <section className="relative min-h-screen flex flex-col items-center justify-center text-center px-4 sm:px-6 pt-20 sm:pt-24 pb-10 sm:pb-16 overflow-hidden">
      {/* Background blobs */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <div
          className="absolute -top-32 -left-32 w-[300px] sm:w-[500px] h-[300px] sm:h-[500px] rounded-full opacity-20"
          style={{
            background: "radial-gradient(circle, #fda4af 0%, transparent 70%)",
          }}
        />
        <div
          className="absolute top-1/2 -right-24 sm:-right-48 w-[300px] sm:w-[600px] h-[300px] sm:h-[600px] rounded-full opacity-15"
          style={{
            background: "radial-gradient(circle, #c084fc 0%, transparent 70%)",
          }}
        />
        <div
          className="absolute -bottom-24 left-1/4 sm:left-1/3 w-[250px] sm:w-[400px] h-[250px] sm:h-[400px] rounded-full opacity-20"
          style={{
            background: "radial-gradient(circle, #fb923c 0%, transparent 70%)",
          }}
        />
        <div className="absolute top-24 sm:top-32 right-[15%] sm:right-[20%] w-1.5 sm:w-2 h-1.5 sm:h-2 rounded-full bg-rose-300 opacity-60" />
        <div className="absolute top-36 sm:top-48 right-[10%] sm:right-[15%] w-2 sm:w-3 h-2 sm:h-3 rounded-full bg-pink-300 opacity-40" />
        <div className="absolute top-48 sm:top-64 left-[8%] sm:left-[12%] w-1.5 sm:w-2 h-1.5 sm:h-2 rounded-full bg-purple-300 opacity-50" />
      </div>

      {/* Headline */}
      <h1
        className="relative z-10 text-3xl sm:text-5xl md:text-6xl lg:text-7xl font-black text-gray-900 leading-[1.05] mb-4 sm:mb-6 tracking-tight px-2"
        style={{
          fontFamily: "'Playfair Display', Georgia, serif",
          animation: "fadeInUp 0.7s ease 0.1s both",
        }}
      >
        Photobooth{" "}
        <span className="relative inline-block">
          <span className="relative z-10 text-rose-500">Online</span>
          <svg
            className="absolute -bottom-1 left-0 w-full"
            height="8"
            viewBox="0 0 200 8"
            fill="none"
            preserveAspectRatio="none"
          >
            <path
              d="M0 6 Q50 0 100 5 Q150 10 200 4"
              stroke="#fda4af"
              strokeWidth="3"
              strokeLinecap="round"
              fill="none"
            />
          </svg>
        </span>{" "}
        & <br className="hidden sm:block" />
        Foto Strip{" "}
        <span className="bg-gradient-to-r from-pink-500 to-rose-400 bg-clip-text text-transparent">
          Gratis
        </span>
      </h1>

      {/* Subheadline */}
      <p
        className="relative z-10 text-gray-500 text-sm sm:text-lg md:text-xl mb-8 sm:mb-10 max-w-xs sm:max-w-xl mx-auto leading-relaxed font-medium"
        style={{ animation: "fadeInUp 0.7s ease 0.2s both" }}
      >
        Buat foto strip seru dalam hitungan menit. Gratis, gampang, dan tanpa
        perlu download aplikasi!
      </p>

      {/* CTA Buttons */}
      <div
        className="relative z-10 flex flex-col sm:flex-row items-center gap-3 sm:gap-4 mb-10 sm:mb-16 w-full sm:w-auto px-4 sm:px-0"
        style={{ animation: "fadeInUp 0.7s ease 0.3s both" }}
      >
        <button
          onClick={() => navigate("/capture")}
          className="w-full sm:w-auto group relative overflow-hidden bg-gradient-to-r from-rose-500 via-pink-500 to-rose-400 text-white px-6 sm:px-8 py-3 sm:py-4 rounded-2xl font-extrabold text-sm sm:text-base shadow-xl shadow-rose-200 hover:shadow-rose-300 hover:-translate-y-1 hover:scale-105 transition-all duration-300 flex items-center justify-center gap-3"
        >
          <img
            src={PictStripIcon}
            alt=""
            className="w-6 h-6 object-contain rounded-md shadow-sm"
          />
          Start Capture Sekarang
          <span className="group-hover:translate-x-1 transition-transform duration-200">
            →
          </span>
        </button>
        <a
          href="#how-it-works"
          className="text-gray-500 hover:text-rose-500 font-semibold text-sm flex items-center gap-2 transition-colors duration-200 group"
        >
          Cara Penggunaan{" "}
          <span className="group-hover:translate-y-0.5 transition-transform duration-200">
            ↓
          </span>
        </a>
      </div>

      {/* Social Proof */}
      <div
        className="relative z-10 flex flex-wrap justify-center gap-2 sm:gap-3 mb-10 sm:mb-16 px-4"
        style={{ animation: "fadeInUp 0.7s ease 0.4s both" }}
      >
        {[
          "✨ 15+ Filter Estetik",
          "🎞️ Berbagai Layout",
          "💾 Download Gratis",
          "💕 Tanpa Tanda Air",
        ].map((item) => (
          <span
            key={item}
            className="text-[10px] sm:text-xs font-semibold text-gray-500 bg-white/70 backdrop-blur-sm border border-gray-100 px-3 sm:px-4 py-1.5 sm:py-2 rounded-full shadow-sm"
          >
            {item}
          </span>
        ))}
      </div>

      {/* Mockup */}
      <div
        className="relative z-10 w-full max-w-xs sm:max-w-2xl md:max-w-4xl mx-auto px-4 sm:px-0"
        style={{ animation: "fadeInUp 0.8s ease 0.5s both" }}
      >
        <div className="relative">
          <div
            className="absolute inset-0 -m-4 sm:-m-8 rounded-3xl opacity-30 blur-3xl pointer-events-none"
            style={{
              background: "linear-gradient(135deg, #fda4af, #c084fc, #fb923c)",
            }}
          />
          <img
            src={MockupHero}
            alt="PictStrip Preview"
            className="relative mx-auto w-full h-auto object-contain drop-shadow-2xl hover:scale-[1.02] transition-transform duration-700"
          />
        </div>
      </div>

      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:wght@700;900&display=swap');
        @keyframes fadeInDown { from { opacity:0; transform:translateY(-16px); } to { opacity:1; transform:translateY(0); } }
        @keyframes fadeInUp   { from { opacity:0; transform:translateY(24px);  } to { opacity:1; transform:translateY(0); } }
      `}</style>
    </section>
  );
};

export default Hero;
