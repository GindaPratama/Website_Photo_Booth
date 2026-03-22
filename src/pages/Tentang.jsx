import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import { Link } from "react-router-dom";

const values = [
  {
    emoji: "💖",
    title: "Gratis",
    desc: "Ekspresi diri tidak boleh dibatasi oleh biaya. Seluruh fitur PictStrip dapat dinikmati sepenuhnya secara umum dan gratis.",
  },
  {
    emoji: "🔒",
    title: "Privasi Terjaga",
    desc: "Foto Anda diproses langsung di peramban. Tidak ada data yang dikirim atau disimpan di server kami sehingga keamanan lebih terjamin.",
  },
  {
    emoji: "✨",
    title: "Estetika Tanpa Batas",
    desc: "Kami menyediakan ratusan bingkai, filter estetis, dan stiker menarik untuk menjadikan hasil foto Anda tampak berkualitas.",
  },
  {
    emoji: "📱",
    title: "Dimana Saja, Kapan Saja",
    desc: "Mulai dari layar ponsel hingga layar komputer, PictStrip selalu tampil optimal, berjalan mulus, dan siap digunakan kapa pun.",
  },
];

const Tentang = () => {
  return (
    <div className="min-h-screen bg-gradient-to-b from-rose-50 to-white font-sans overflow-hidden">
      <Navbar />

      {/* --- HERO SECTION --- */}
      <section className="relative pt-32 sm:pt-40 pb-16 sm:pb-24 px-4 text-center">
        <div className="max-w-4xl mx-auto relative z-10">
          <div
            className="animate-fade-in-up"
            style={{ animationDelay: "0.1s" }}
          >
            <span className="inline-block px-4 py-2 rounded-full bg-rose-100 text-rose-600 font-bold tracking-widest text-xs uppercase mb-6 shadow-sm">
              TENTANG PICSTRIP
            </span>
          </div>

          <h1
            className="text-4xl sm:text-6xl md:text-7xl font-black text-gray-900 mb-6 leading-tight animate-fade-in-up"
            style={{
              fontFamily: "'Playfair Display', Georgia, serif",
              animationDelay: "0.2s",
            }}
          >
            Potret foto jadi lebih seru dengan{" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-rose-500 to-pink-500">
              PictStrip
            </span>
          </h1>

          <p
            className="text-gray-600 text-base sm:text-lg max-w-2xl mx-auto leading-relaxed animate-fade-in-up"
            style={{ animationDelay: "0.3s" }}
          >
            Bawa keseruan photobooth langsung ke layarmu.
          </p>
        </div>

        {/* Decorative Blobs Animasi Khusus */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-full max-w-5xl pointer-events-none -z-10">
          <div className="absolute top-20 left-10 w-48 sm:w-64 h-48 sm:h-64 bg-rose-200 rounded-full mix-blend-multiply filter blur-3xl opacity-40 animate-blob"></div>
          <div className="absolute top-20 right-10 w-48 sm:w-64 h-48 sm:h-64 bg-purple-200 rounded-full mix-blend-multiply filter blur-3xl opacity-40 animate-blob animation-delay-2000"></div>
          <div className="absolute -bottom-8 left-1/2 -translate-x-1/2 w-48 sm:w-64 h-48 sm:h-64 bg-pink-200 rounded-full mix-blend-multiply filter blur-3xl opacity-40 animate-blob animation-delay-4000"></div>
        </div>
      </section>

      {/* --- VALUES --- */}
      <section className="py-12 sm:py-24 px-4">
        <div className="max-w-4xl mx-auto">
          {/* Cards / Values */}
          <div
            className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-8 animate-fade-in-up"
            style={{ animationDelay: "0.5s" }}
          >
            {values.map((v, i) => (
              <div
                key={i}
                className="bg-white/80 backdrop-blur-sm p-6 rounded-3xl shadow-sm border border-rose-50 hover:shadow-xl hover:-translate-y-2 transition-all duration-300 group flex flex-col items-center text-center"
              >
                <div className="w-12 h-12 rounded-2xl bg-rose-50 flex items-center justify-center text-2xl mb-4 group-hover:scale-110 group-hover:bg-rose-100 transition-all">
                  {v.emoji}
                </div>
                <h3 className="font-bold text-gray-900 mb-2">{v.title}</h3>
                <p className="text-gray-500 text-sm leading-relaxed">
                  {v.desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* --- CTA SECTION --- */}
      <section className="py-16 sm:py-20 px-4 mb-4">
        <div className="max-w-4xl mx-auto">
          <div
            className="bg-gradient-to-br from-rose-500 to-pink-500 rounded-[2rem] p-10 sm:p-16 text-center text-white shadow-2xl shadow-rose-200 relative overflow-hidden animate-fade-in-up"
            style={{ animationDelay: "0.6s" }}
          >
            {/* Pattern Overlay */}
            <div
              className="absolute inset-0 opacity-10"
              style={{
                backgroundImage:
                  'url(\'data:image/svg+xml,%3Csvg width="20" height="20" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"%3E%3Cg fill="%23ffffff" fill-opacity="1" fill-rule="evenodd"%3E%3Ccircle cx="3" cy="3" r="3"/%3E%3Ccircle cx="13" cy="13" r="3"/%3E%3C/g%3E%3C/svg%3E\')',
              }}
            ></div>

            <div className="relative z-10">
              <div className="text-4xl sm:text-5xl mb-4 animate-pulse">📸</div>
              <h2
                className="text-3xl sm:text-5xl font-black mb-4"
                style={{ fontFamily: "'Playfair Display', Georgia, serif" }}
              >
                Siap Mengabadikan Momen?
              </h2>
              <p className="text-rose-100 text-sm sm:text-lg mb-8 max-w-xl mx-auto">
                Bergabunglah bersama kami dan ciptakan memori indah dalam format
                foto strip digital dengan mudah dan cepat.
              </p>
              <Link
                to="/capture"
                className="inline-block bg-white text-rose-500 font-black px-8 py-4 rounded-xl shadow-lg hover:bg-rose-50 hover:scale-105 transition-all duration-300"
              >
                Mulai Berfoto Gratis ✨
              </Link>
            </div>
          </div>
        </div>
      </section>

      <Footer />

      {/* --- CSS Animasi Kustom --- */}
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:wght@700;900&display=swap');
        
        @keyframes fadeInUp {
          from { opacity: 0; transform: translateY(30px); }
          to { opacity: 1; transform: translateY(0); }
        }
        
        .animate-fade-in-up {
          opacity: 0;
          animation: fadeInUp 0.8s cubic-bezier(0.16, 1, 0.3, 1) forwards;
        }

        /* Float effects for aesthetic background */
        @keyframes blob {
          0% { transform: translate(0px, 0px) scale(1); }
          33% { transform: translate(30px, -50px) scale(1.1); }
          66% { transform: translate(-20px, 20px) scale(0.9); }
          100% { transform: translate(0px, 0px) scale(1); }
        }
        
        .animate-blob {
          animation: blob 7s ease-in-out infinite;
        }
        .animation-delay-2000 {
          animation-delay: 2s;
        }
        .animation-delay-4000 {
          animation-delay: 4s;
        }
      `}</style>
    </div>
  );
};

export default Tentang;
