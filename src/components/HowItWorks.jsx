const steps = [
  {
    number: "01",
    emoji: "📸",
    color: "from-rose-400 to-pink-400",
    bg: "bg-rose-50",
    border: "border-rose-100",
    accent: "text-rose-500",
    title: "Ambil Foto",
    desc: "Pilih layout, atur filter favoritmu, lalu tekan Start. Timer 3 detik memberikan kamu waktu berpose. Foto diambil otomatis secara berurutan!",
  },
  {
    number: "02",
    emoji: "🎨",
    color: "from-purple-400 to-pink-400",
    bg: "bg-purple-50",
    border: "border-purple-100",
    accent: "text-purple-500",
    title: "Hias & Gaya",
    desc: "Pilih warna frame, tambahkan stiker lucu, pilih desain tema, dan buat foto strip kamu jadi makin estetik dan personal.",
  },
  {
    number: "03",
    emoji: "💾",
    color: "from-orange-400 to-rose-400",
    bg: "bg-orange-50",
    border: "border-orange-100",
    accent: "text-orange-500",
    title: "Unduh & Bagikan",
    desc: "Klik Unduh dan dapatkan foto strip berkualitas tinggi. Siap dibagikan ke Instagram, TikTok, atau disimpan sebagai kenangan!",
  },
];

const HowItWorks = () => (
  <section
    id="how-it-works"
    className="relative w-full py-16 sm:py-24 lg:py-32 overflow-hidden"
  >
    <div className="absolute inset-0 pointer-events-none">
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-rose-200 to-transparent" />
      <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-purple-200 to-transparent" />
    </div>

    <div className="max-w-6xl mx-auto px-4 sm:px-6">
      <div className="text-center mb-12 sm:mb-16 lg:mb-20">
        <span className="inline-block text-xs font-bold tracking-[0.2em] text-rose-400 uppercase mb-4 bg-rose-50 px-4 py-2 rounded-full border border-rose-100">
          Cara Kerja
        </span>
        <h2
          className="text-3xl sm:text-4xl md:text-5xl font-black text-gray-900 mb-4 sm:mb-5 leading-tight"
          style={{ fontFamily: "'Playfair Display', Georgia, serif" }}
        >
          3 Langkah Mudah
          <br />
          <span className="text-rose-500">Foto Strip Impianmu</span>
        </h2>
        <p className="text-gray-500 max-w-xs sm:max-w-md mx-auto text-sm sm:text-base leading-relaxed">
          Dari kamera ke hasil jadi — semuanya selesai dalam hitungan menit,
          langsung di browser kamu.
        </p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 relative">
        <div className="hidden lg:block absolute top-12 left-[calc(16.66%+2rem)] right-[calc(16.66%+2rem)] h-0.5 bg-gradient-to-r from-rose-200 via-purple-200 to-orange-200 z-0" />

        {steps.map((step, i) => (
          <div
            key={i}
            className={`relative z-10 ${step.bg} border ${step.border} rounded-2xl sm:rounded-3xl p-6 sm:p-8 flex flex-col hover:-translate-y-2 hover:shadow-xl transition-all duration-300 group`}
          >
            <div className="flex items-start justify-between mb-5 sm:mb-6">
              <div
                className={`w-12 h-12 sm:w-14 sm:h-14 rounded-2xl bg-gradient-to-br ${step.color} flex items-center justify-center text-xl sm:text-2xl shadow-lg group-hover:scale-110 transition-transform duration-300`}
              >
                {step.emoji}
              </div>
              <span
                className={`text-4xl sm:text-5xl font-black opacity-10 ${step.accent}`}
                style={{ fontFamily: "'Playfair Display', Georgia, serif" }}
              >
                {step.number}
              </span>
            </div>

            <div className="bg-white/70 rounded-2xl aspect-[4/3] mb-5 sm:mb-6 flex items-center justify-center border border-white shadow-sm">
              <span className="text-gray-300 text-xs sm:text-sm font-medium">
                Gambar Step {i + 1}
              </span>
            </div>

            <h3
              className={`text-lg sm:text-xl font-extrabold mb-2 sm:mb-3 ${step.accent}`}
            >
              {step.title}
            </h3>
            <p className="text-gray-600 text-xs sm:text-sm leading-relaxed flex-1">
              {step.desc}
            </p>
          </div>
        ))}
      </div>

      <div className="text-center mt-10 sm:mt-16">
        <a
          href="/capture"
          className="inline-flex items-center gap-2 sm:gap-3 bg-gradient-to-r from-rose-500 to-pink-500 text-white px-6 sm:px-8 py-3 sm:py-4 rounded-2xl font-bold text-sm sm:text-base shadow-xl shadow-rose-200 hover:-translate-y-1 hover:scale-105 transition-all duration-300"
        >
          Coba Sekarang — Gratis! <span>✨</span>
        </a>
      </div>
    </div>
  </section>
);

export default HowItWorks;
