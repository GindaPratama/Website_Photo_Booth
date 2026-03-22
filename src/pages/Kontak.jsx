import { useState } from "react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

const contactMethods = [
  {
    emoji: "📧",
    label: "Email",
    value: "hello@picstrip.id",
    color: "from-rose-400 to-pink-400",
    desc: "Balasan dalam 1×24 jam",
  },
  {
    emoji: "📸",
    label: "Instagram",
    value: "@picstrip.id",
    color: "from-purple-400 to-pink-400",
    desc: "DM kami kapan saja",
  },
  {
    emoji: "🎵",
    label: "TikTok",
    value: "@picstrip",
    color: "from-orange-400 to-rose-400",
    desc: "Follow & tag kami",
  },
];

const faqs = [
  {
    q: "Bagaimana cara melaporkan bug?",
    a: "Kirim email ke hello@picstrip.id dengan subject 'Bug Report' dan jelaskan masalahnya secara detail.",
  },
  {
    q: "Bisakah saya request fitur baru?",
    a: "Tentu! Kami sangat terbuka dengan masukan. Kirim ide kamu via form di atas atau email langsung ke kami.",
  },
  {
    q: "Berapa lama respons dukungan?",
    a: "Kami berusaha merespons semua pesan dalam 1×24 jam di hari kerja.",
  },
];

const jadwal = [
  { hari: "Senin – Jumat", jam: "09.00 – 18.00 WIB" },
  { hari: "Sabtu", jam: "10.00 – 15.00 WIB" },
  { hari: "Minggu", jam: "Libur 🌸" },
];

const Kontak = () => {
  const [form, setForm] = useState({
    nama: "",
    email: "",
    topik: "Pertanyaan Umum",
    pesan: "",
  });
  const [sent, setSent] = useState(false);
  const [loading, setLoading] = useState(false);
  const [openFaq, setOpenFaq] = useState(null);

  const handleChange = (e) =>
    setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = (e) => {
    e.preventDefault();
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      setSent(true);
    }, 1500);
  };

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
      <section className="relative pt-28 sm:pt-32 pb-12 sm:pb-16 px-4 sm:px-6 text-center overflow-hidden">
        <div className="absolute inset-0 pointer-events-none overflow-hidden">
          <div
            className="absolute -top-40 left-1/2 -translate-x-1/2 w-[300px] sm:w-[500px] h-[300px] sm:h-[400px] rounded-full opacity-20"
            style={{
              background: "radial-gradient(ellipse,#fda4af 0%,transparent 70%)",
            }}
          />
        </div>
        <div className="relative z-10 max-w-2xl mx-auto">
          <span className="inline-block text-xs font-bold tracking-[0.2em] text-rose-400 uppercase mb-4 bg-rose-50 px-4 py-2 rounded-full border border-rose-100">
            Hubungi Kami
          </span>
          <h1
            className="text-3xl sm:text-5xl md:text-6xl font-black text-gray-900 mb-4 sm:mb-5 leading-tight"
            style={{ fontFamily: "'Playfair Display',Georgia,serif" }}
          >
            Ada yang Bisa
            <br />
            <span className="text-rose-500">Kami Bantu? 💌</span>
          </h1>
          <p className="text-gray-500 text-sm sm:text-base leading-relaxed max-w-md mx-auto">
            Kami senang mendengar dari kamu! Entah itu pertanyaan, masukan, atau
            sekadar halo — jangan ragu untuk menghubungi kami.
          </p>
        </div>
      </section>

      <main className="max-w-6xl mx-auto px-4 sm:px-6 pb-16 sm:pb-24">
        {/* ── CONTACT METHOD CARDS ── */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 sm:gap-4 mb-10 sm:mb-14">
          {contactMethods.map((m) => (
            <div
              key={m.label}
              className="bg-white/80 backdrop-blur-sm border border-gray-100 rounded-2xl sm:rounded-3xl p-4 sm:p-6 shadow-sm hover:-translate-y-1 hover:shadow-lg transition-all duration-300 flex gap-3 sm:gap-4 items-start"
            >
              <div
                className={`w-10 h-10 sm:w-12 sm:h-12 rounded-xl sm:rounded-2xl bg-gradient-to-br ${m.color} flex items-center justify-center text-lg sm:text-xl shrink-0 shadow-sm`}
              >
                {m.emoji}
              </div>
              <div>
                <p className="text-[10px] sm:text-xs text-gray-400 font-bold uppercase tracking-wider mb-0.5">
                  {m.label}
                </p>
                <p className="text-gray-800 font-extrabold text-sm sm:text-base leading-tight">
                  {m.value}
                </p>
                <p className="text-gray-400 text-xs mt-0.5">{m.desc}</p>
              </div>
            </div>
          ))}
        </div>

        {/* ── FORM + SIDE PANEL ── */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 lg:gap-10">
          {/* ── FORM ── */}
          <div className="bg-white/80 backdrop-blur-xl border border-white/80 rounded-2xl sm:rounded-3xl shadow-xl shadow-pink-100/30 overflow-hidden relative">
            {/* Top gradient bar */}
            <div className="h-1 bg-gradient-to-r from-rose-400 via-pink-400 to-purple-400" />

            <div className="p-6 sm:p-8">
              {sent ? (
                /* ── Success State ── */
                <div className="flex flex-col items-center justify-center py-10 sm:py-14 text-center">
                  <div className="w-16 h-16 sm:w-20 sm:h-20 bg-gradient-to-br from-rose-100 to-pink-100 rounded-full flex items-center justify-center text-3xl sm:text-4xl mb-5 shadow-inner">
                    🎉
                  </div>
                  <h3
                    className="text-xl sm:text-2xl font-black text-gray-900 mb-3"
                    style={{ fontFamily: "'Playfair Display',Georgia,serif" }}
                  >
                    Pesan Terkirim!
                  </h3>
                  <p className="text-gray-500 text-sm sm:text-base mb-8 max-w-xs leading-relaxed">
                    Terima kasih sudah menghubungi kami. Tim kami akan membalas
                    dalam 1×24 jam.
                  </p>
                  <button
                    onClick={() => {
                      setSent(false);
                      setForm({
                        nama: "",
                        email: "",
                        topik: "Pertanyaan Umum",
                        pesan: "",
                      });
                    }}
                    className="bg-gradient-to-r from-rose-500 to-pink-500 text-white px-6 py-3 rounded-2xl font-bold text-sm shadow-lg hover:scale-105 transition-all"
                  >
                    Kirim Pesan Lagi
                  </button>
                </div>
              ) : (
                /* ── Form Fields ── */
                <form onSubmit={handleSubmit} className="flex flex-col gap-4">
                  <h2
                    className="text-xl sm:text-2xl font-black text-gray-900 mb-1"
                    style={{ fontFamily: "'Playfair Display',Georgia,serif" }}
                  >
                    Kirim Pesan ✉️
                  </h2>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div className="flex flex-col gap-1.5">
                      <label className="text-xs font-bold text-gray-500 uppercase tracking-wider">
                        Nama
                      </label>
                      <input
                        name="nama"
                        value={form.nama}
                        onChange={handleChange}
                        required
                        placeholder="Nama kamu"
                        className="w-full px-4 py-3 rounded-2xl border border-gray-200 bg-gray-50/60 text-sm text-gray-800 placeholder-gray-300 focus:outline-none focus:border-rose-300 focus:bg-white focus:ring-2 focus:ring-rose-100 transition-all"
                      />
                    </div>
                    <div className="flex flex-col gap-1.5">
                      <label className="text-xs font-bold text-gray-500 uppercase tracking-wider">
                        Email
                      </label>
                      <input
                        name="email"
                        type="email"
                        value={form.email}
                        onChange={handleChange}
                        required
                        placeholder="email@kamu.com"
                        className="w-full px-4 py-3 rounded-2xl border border-gray-200 bg-gray-50/60 text-sm text-gray-800 placeholder-gray-300 focus:outline-none focus:border-rose-300 focus:bg-white focus:ring-2 focus:ring-rose-100 transition-all"
                      />
                    </div>
                  </div>

                  <div className="flex flex-col gap-1.5">
                    <label className="text-xs font-bold text-gray-500 uppercase tracking-wider">
                      Topik
                    </label>
                    <select
                      name="topik"
                      value={form.topik}
                      onChange={handleChange}
                      className="w-full px-4 py-3 rounded-2xl border border-gray-200 bg-gray-50/60 text-sm text-gray-800 focus:outline-none focus:border-rose-300 focus:bg-white focus:ring-2 focus:ring-rose-100 transition-all appearance-none cursor-pointer"
                    >
                      {[
                        "Pertanyaan Umum",
                        "Laporan Bug",
                        "Request Fitur",
                        "Kerjasama / Kolaborasi",
                        "Lainnya",
                      ].map((t) => (
                        <option key={t}>{t}</option>
                      ))}
                    </select>
                  </div>

                  <div className="flex flex-col gap-1.5">
                    <label className="text-xs font-bold text-gray-500 uppercase tracking-wider">
                      Pesan
                    </label>
                    <textarea
                      name="pesan"
                      value={form.pesan}
                      onChange={handleChange}
                      required
                      rows={5}
                      placeholder="Tuliskan pesanmu di sini..."
                      className="w-full px-4 py-3 rounded-2xl border border-gray-200 bg-gray-50/60 text-sm text-gray-800 placeholder-gray-300 focus:outline-none focus:border-rose-300 focus:bg-white focus:ring-2 focus:ring-rose-100 transition-all resize-none"
                    />
                  </div>

                  <button
                    type="submit"
                    disabled={loading}
                    className={`w-full py-3.5 rounded-2xl font-extrabold text-sm text-white shadow-lg transition-all duration-300 flex items-center justify-center gap-2 ${
                      loading
                        ? "bg-rose-300 cursor-not-allowed"
                        : "bg-gradient-to-r from-rose-500 to-pink-500 hover:scale-[1.02] hover:-translate-y-0.5"
                    }`}
                    style={
                      loading
                        ? {}
                        : { boxShadow: "0 8px 24px -4px rgba(244,63,94,0.4)" }
                    }
                  >
                    {loading ? (
                      <>
                        <svg
                          className="w-4 h-4 animate-spin"
                          viewBox="0 0 24 24"
                          fill="none"
                        >
                          <circle
                            className="opacity-25"
                            cx="12"
                            cy="12"
                            r="10"
                            stroke="white"
                            strokeWidth="4"
                          />
                          <path
                            className="opacity-75"
                            fill="white"
                            d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"
                          />
                        </svg>
                        Mengirim...
                      </>
                    ) : (
                      <>💌 Kirim Pesan</>
                    )}
                  </button>
                </form>
              )}
            </div>
          </div>

          {/* ── SIDE PANEL ── */}
          <div className="flex flex-col gap-4 sm:gap-5">
            {/* Lokasi */}
            <div className="bg-gradient-to-br from-rose-50 to-purple-50 border border-rose-100 rounded-2xl sm:rounded-3xl p-5 sm:p-6">
              <h3 className="font-extrabold text-gray-900 text-sm sm:text-base mb-1">
                📍 Lokasi Kami
              </h3>
              <p className="text-gray-400 text-xs sm:text-sm mb-4">
                Bandung, Jawa Barat, Indonesia 🇮🇩
              </p>
              {/* Map placeholder */}
              <div className="bg-white/70 rounded-2xl h-32 sm:h-40 flex items-center justify-center border border-white shadow-inner relative overflow-hidden">
                <div
                  className="absolute inset-0 opacity-10"
                  style={{
                    backgroundImage:
                      "linear-gradient(rgba(244,63,94,0.4) 1px,transparent 1px),linear-gradient(90deg,rgba(244,63,94,0.4) 1px,transparent 1px)",
                    backgroundSize: "30px 30px",
                  }}
                />
                <div className="relative text-center">
                  <div className="text-3xl mb-1">🗺️</div>
                  <p className="text-xs text-gray-400 font-semibold">
                    Bandung, Indonesia
                  </p>
                </div>
              </div>
            </div>

            {/* Mini FAQ */}
            <div className="bg-white/80 backdrop-blur-sm border border-gray-100 rounded-2xl sm:rounded-3xl p-5 sm:p-7 shadow-sm">
              <h3
                className="font-black text-gray-900 text-base sm:text-lg mb-4"
                style={{ fontFamily: "'Playfair Display',Georgia,serif" }}
              >
                Pertanyaan Cepat
              </h3>
              <div className="flex flex-col gap-2">
                {faqs.map((faq, i) => (
                  <div
                    key={i}
                    className={`border rounded-xl overflow-hidden transition-all duration-200 ${
                      openFaq === i
                        ? "border-rose-200 bg-rose-50/50"
                        : "border-gray-100 bg-white/50"
                    }`}
                  >
                    <button
                      onClick={() => setOpenFaq(openFaq === i ? null : i)}
                      className="w-full flex items-center justify-between gap-3 px-4 py-3 text-left focus:outline-none"
                    >
                      <span
                        className={`text-xs sm:text-sm font-bold transition-colors ${openFaq === i ? "text-rose-600" : "text-gray-700"}`}
                      >
                        {faq.q}
                      </span>
                      <svg
                        className={`w-4 h-4 shrink-0 transition-all duration-200 ${openFaq === i ? "rotate-180 text-rose-500" : "text-gray-300"}`}
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2.5}
                          d="M19 9l-7 7-7-7"
                        />
                      </svg>
                    </button>
                    <div
                      className={`overflow-hidden transition-all duration-300 ${openFaq === i ? "max-h-28 opacity-100" : "max-h-0 opacity-0"}`}
                    >
                      <p className="px-4 pb-3 text-xs sm:text-sm text-gray-500 leading-relaxed">
                        {faq.a}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Jam Respons */}
            <div className="bg-gradient-to-br from-orange-50 to-rose-50 border border-orange-100 rounded-2xl sm:rounded-3xl p-5 sm:p-6">
              <h3 className="font-extrabold text-gray-900 text-sm sm:text-base mb-3">
                🕐 Jam Respons
              </h3>
              <div className="flex flex-col gap-2.5">
                {jadwal.map((h) => (
                  <div
                    key={h.hari}
                    className="flex justify-between items-center"
                  >
                    <span className="text-gray-600 text-xs sm:text-sm font-semibold">
                      {h.hari}
                    </span>
                    <span className="text-gray-400 text-xs sm:text-sm font-medium">
                      {h.jam}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </main>

      <Footer />

      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:wght@700;900&display=swap');
      `}</style>
    </div>
  );
};

export default Kontak;
