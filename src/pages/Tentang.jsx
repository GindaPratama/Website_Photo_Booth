import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import { useNavigate } from "react-router-dom";

const teamData = [
  {
    name: "Alya Ramadhani",
    role: "Founder & UI Designer",
    emoji: "👩‍🎨",
    color: "from-rose-400 to-pink-400",
  },
  {
    name: "Rafi Nugroho",
    role: "Frontend Developer",
    emoji: "👨‍💻",
    color: "from-purple-400 to-pink-400",
  },
  {
    name: "Siti Nurhaliza",
    role: "Product & Brand",
    emoji: "👩‍💼",
    color: "from-orange-400 to-rose-400",
  },
];

const stats = [
  { value: "50K+", label: "Foto Dihasilkan", emoji: "📸" },
  { value: "10K+", label: "Pengguna Aktif", emoji: "👥" },
  { value: "15+", label: "Filter Estetik", emoji: "✨" },
  { value: "100%", label: "Gratis Selamanya", emoji: "🎁" },
];

const values = [
  {
    emoji: "💖",
    title: "Gratis untuk Semua",
    desc: "Kami percaya bahwa ekspresi diri tidak boleh dibatasi biaya. Semua fitur utama BeautySnap 100% gratis.",
  },
  {
    emoji: "🔒",
    title: "Privasi Pertama",
    desc: "Foto kamu diproses langsung di browser. Tidak ada data yang dikirim ke server kami. Privasi kamu adalah prioritas.",
  },
  {
    emoji: "🎨",
    title: "Estetik tanpa Kompromi",
    desc: "Kami terus menghadirkan template, filter, dan frame baru agar foto strip kamu selalu tampil kece.",
  },
  {
    emoji: "📱",
    title: "Semua Perangkat",
    desc: "Dari HP kecil hingga layar desktop besar — BeautySnap dirancang untuk tampil sempurna di semua ukuran.",
  },
];

const Tentang = () => {
  const navigate = useNavigate();

  return (
    <div
      className="min-h-screen font-sans overflow-x-hidden"
      style={{
        background:
          "linear-gradient(180deg,#fff5f7 0%,#ffffff 30%,#fdf9ff 70%,#fff5f7 100%)",
      }}
    >
      <Navbar />

      {/* ── HERO ── */}
      <section className="relative pt-32 pb-20 px-4 sm:px-6 text-center overflow-hidden">
        <div className="absolute inset-0 pointer-events-none overflow-hidden">
          <div
            className="absolute -top-40 left-1/2 -translate-x-1/2 w-[600px] h-[400px] rounded-full opacity-20"
            style={{
              background: "radial-gradient(ellipse,#fda4af 0%,transparent 70%)",
            }}
          />
          <div
            className="absolute top-1/2 -right-32 w-[400px] h-[400px] rounded-full opacity-10"
            style={{
              background: "radial-gradient(circle,#c084fc 0%,transparent 70%)",
            }}
          />
        </div>

        <div className="relative z-10 max-w-3xl mx-auto">
          <span className="inline-block text-xs font-bold tracking-[0.2em] text-rose-400 uppercase mb-4 bg-rose-50 px-4 py-2 rounded-full border border-rose-100">
            Tentang Kami
          </span>
          <h1
            className="text-3xl sm:text-5xl md:text-6xl font-black text-gray-900 mb-6 leading-tight"
            style={{ fontFamily: "'Playfair Display',Georgia,serif" }}
          >
            Dibuat dengan{" "}
            <span className="text-rose-500 relative inline-block">
              ❤️ Cinta
              <svg
                className="absolute -bottom-1 left-0 w-full"
                height="6"
                viewBox="0 0 200 6"
                fill="none"
                preserveAspectRatio="none"
              >
                <path
                  d="M0 4 Q100 0 200 4"
                  stroke="#fda4af"
                  strokeWidth="3"
                  strokeLinecap="round"
                  fill="none"
                />
              </svg>
            </span>{" "}
            untuk Kamu
          </h1>
          <p className="text-gray-500 text-sm sm:text-lg leading-relaxed max-w-2xl mx-auto mb-10">
            BeautySnap lahir dari satu mimpi sederhana: memberikan pengalaman
            photobooth yang estetik, menyenangkan, dan bisa diakses siapa saja —
            langsung dari browser, tanpa biaya sepeser pun.
          </p>

          {/* Stats */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 sm:gap-4">
            {stats.map((s) => (
              <div
                key={s.label}
                className="bg-white/70 backdrop-blur-sm border border-gray-100 rounded-2xl p-4 sm:p-5 shadow-sm hover:-translate-y-1 hover:shadow-md transition-all duration-300"
              >
                <div className="text-2xl mb-1">{s.emoji}</div>
                <div
                  className="text-2xl sm:text-3xl font-black text-gray-900 leading-none mb-1"
                  style={{ fontFamily: "'Playfair Display',Georgia,serif" }}
                >
                  {s.value}
                </div>
                <div className="text-xs text-gray-400 font-semibold">
                  {s.label}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── STORY ── */}
      <section className="py-16 sm:py-24 px-4 sm:px-6">
        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-16 items-center">
            {/* Left: Teks */}
            <div>
              <span className="inline-block text-xs font-bold tracking-[0.2em] text-purple-400 uppercase mb-4 bg-purple-50 px-4 py-2 rounded-full border border-purple-100">
                Cerita Kami
              </span>
              <h2
                className="text-2xl sm:text-4xl font-black text-gray-900 mb-6 leading-tight"
                style={{ fontFamily: "'Playfair Display',Georgia,serif" }}
              >
                Semua Berawal dari
                <br />
                <span className="text-purple-500">Antrian Panjang</span>
              </h2>
              <div className="flex flex-col gap-4 text-gray-500 text-sm sm:text-base leading-relaxed">
                <p>
                  Dulu, kami antre berjam-jam di photobooth mall hanya untuk
                  mendapatkan beberapa lembar foto strip. Prosesnya lama, mahal,
                  dan seringkali hasilnya tidak sesuai ekspektasi.
                </p>
                <p>
                  Kami bertanya:{" "}
                  <em className="text-rose-500 font-semibold">
                    "Kenapa pengalaman ini tidak bisa ada di genggaman kita?"
                  </em>
                  Dari sana lahirlah BeautySnap — photobooth digital yang bisa
                  dipakai kapan saja, di mana saja, dari HP maupun laptop.
                </p>
                <p>
                  Sejak diluncurkan, BeautySnap telah membantu ribuan orang
                  mengabadikan momen berharga bersama orang-orang yang mereka
                  sayangi.
                </p>
              </div>
            </div>

            {/* Right: Visual card */}
            <div className="relative">
              <div
                className="absolute inset-0 -m-6 blur-3xl opacity-20 rounded-3xl pointer-events-none"
                style={{
                  background: "linear-gradient(135deg,#fda4af,#c084fc)",
                }}
              />
              <div className="relative bg-gradient-to-br from-rose-50 to-purple-50 border border-rose-100 rounded-3xl p-8 sm:p-10">
                <div className="text-6xl mb-6">📸</div>
                <blockquote
                  className="text-gray-800 font-black text-xl sm:text-2xl leading-tight mb-4"
                  style={{ fontFamily: "'Playfair Display',Georgia,serif" }}
                >
                  "Foto bukan hanya gambar — itu kenangan yang bisa kamu pegang
                  selamanya."
                </blockquote>
                <p className="text-rose-400 text-sm font-bold">
                  — Tim BeautySnap
                </p>

                {/* Decorative stickers */}
                <div className="absolute -top-4 -right-4 w-12 h-12 bg-white rounded-2xl shadow-lg flex items-center justify-center text-2xl rotate-12">
                  🌸
                </div>
                <div className="absolute -bottom-4 -left-4 w-10 h-10 bg-white rounded-xl shadow-lg flex items-center justify-center text-xl -rotate-6">
                  ✨
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── VALUES ── */}
      <section
        className="py-16 sm:py-24 px-4 sm:px-6"
        style={{ background: "linear-gradient(135deg,#fdf4ff,#fce7f3)" }}
      >
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-12 sm:mb-16">
            <span className="inline-block text-xs font-bold tracking-[0.2em] text-rose-400 uppercase mb-4 bg-rose-50 px-4 py-2 rounded-full border border-rose-100">
              Nilai Kami
            </span>
            <h2
              className="text-2xl sm:text-4xl font-black text-gray-900"
              style={{ fontFamily: "'Playfair Display',Georgia,serif" }}
            >
              Yang Kami Percayai
            </h2>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6">
            {values.map((v, i) => (
              <div
                key={i}
                className="bg-white/80 backdrop-blur-sm border border-white/80 rounded-2xl sm:rounded-3xl p-6 sm:p-8 shadow-sm hover:-translate-y-1 hover:shadow-lg transition-all duration-300 flex gap-4 sm:gap-5"
              >
                <div className="w-12 h-12 sm:w-14 sm:h-14 rounded-2xl bg-gradient-to-br from-rose-100 to-pink-100 flex items-center justify-center text-2xl sm:text-3xl shrink-0 shadow-sm">
                  {v.emoji}
                </div>
                <div>
                  <h3 className="font-extrabold text-gray-900 text-base sm:text-lg mb-1.5">
                    {v.title}
                  </h3>
                  <p className="text-gray-500 text-xs sm:text-sm leading-relaxed">
                    {v.desc}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── TEAM ── */}
      <section className="py-16 sm:py-24 px-4 sm:px-6">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-12 sm:mb-16">
            <span className="inline-block text-xs font-bold tracking-[0.2em] text-orange-400 uppercase mb-4 bg-orange-50 px-4 py-2 rounded-full border border-orange-100">
              Tim Kami
            </span>
            <h2
              className="text-2xl sm:text-4xl font-black text-gray-900"
              style={{ fontFamily: "'Playfair Display',Georgia,serif" }}
            >
              Orang-orang di Balik BeautySnap
            </h2>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 sm:gap-6 max-w-3xl mx-auto">
            {teamData.map((member, i) => (
              <div
                key={i}
                className="bg-white border border-gray-100 rounded-2xl sm:rounded-3xl p-6 sm:p-8 text-center shadow-sm hover:-translate-y-2 hover:shadow-xl transition-all duration-300 group"
              >
                <div
                  className={`w-16 h-16 sm:w-20 sm:h-20 mx-auto rounded-2xl bg-gradient-to-br ${member.color} flex items-center justify-center text-3xl sm:text-4xl shadow-lg mb-4 sm:mb-5 group-hover:scale-110 transition-transform duration-300`}
                >
                  {member.emoji}
                </div>
                <h3 className="font-extrabold text-gray-900 text-sm sm:text-base mb-1">
                  {member.name}
                </h3>
                <p className="text-gray-400 text-xs font-semibold">
                  {member.role}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── CTA ── */}
      <section className="py-16 sm:py-24 px-4 sm:px-6">
        <div className="max-w-2xl mx-auto text-center">
          <div className="relative bg-gradient-to-br from-rose-500 to-pink-500 rounded-3xl p-10 sm:p-16 overflow-hidden shadow-2xl shadow-rose-200">
            <div
              className="absolute inset-0 opacity-10"
              style={{
                backgroundImage:
                  "radial-gradient(circle at 20% 50%,white 0%,transparent 50%),radial-gradient(circle at 80% 50%,white 0%,transparent 50%)",
              }}
            />
            <div className="relative z-10">
              <div className="text-4xl sm:text-5xl mb-4">📸</div>
              <h2
                className="text-2xl sm:text-4xl font-black text-white mb-4"
                style={{ fontFamily: "'Playfair Display',Georgia,serif" }}
              >
                Siap Mulai?
              </h2>
              <p className="text-rose-100 text-sm sm:text-base mb-8 leading-relaxed">
                Bergabunglah dengan ribuan orang yang sudah menikmati pengalaman
                photobooth digital terbaik.
              </p>
              <button
                onClick={() => navigate("/capture")}
                className="bg-white text-rose-500 font-extrabold px-8 sm:px-10 py-3 sm:py-4 rounded-2xl text-sm sm:text-base shadow-lg hover:scale-105 hover:-translate-y-1 transition-all duration-300"
              >
                Mulai Foto Gratis ✨
              </button>
            </div>
          </div>
        </div>
      </section>

      <Footer />

      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:wght@700;900&display=swap');
      `}</style>
    </div>
  );
};

export default Tentang;
