import { useState } from "react";

const faqData = [
  {
    q: "Apa itu BeautySnap Online Photobooth?",
    a: "BeautySnap adalah platform photo booth digital berbasis web. Kamu bisa ambil foto, pakai filter estetik, nambahin stiker, dan milih frame layaknya di photobooth asli — langsung dari browsermu!",
    emoji: "✨",
  },
  {
    q: "Apakah saya perlu membuat akun?",
    a: "Nggak perlu ribet! Kamu bisa langsung klik 'Start Capture' dan mulai foto-foto tanpa harus daftar atau login terlebih dahulu.",
    emoji: "🔓",
  },
  {
    q: "Apakah hasilnya berbayar?",
    a: "100% Gratis, bestie! Kamu bebas jepret dan unduh foto sebanyak apapun tanpa dipungut biaya sepeser pun.",
    emoji: "🎁",
  },
  {
    q: "Apakah foto-foto saya aman?",
    a: "Sangat aman. Semua proses jepret dan edit foto terjadi langsung di perangkat (browser) kamu. Kami tidak menyimpan foto-fotomu di server mana pun.",
    emoji: "🔒",
  },
  {
    q: "Bisa dipakai di HP?",
    a: "Bisa banget! BeautySnap dirancang responsif, jadi kamu bisa seru-seruan menggunakan kamera laptop, PC, maupun HP kesayanganmu.",
    emoji: "📱",
  },
];

const FAQ = () => {
  const [openIndex, setOpenIndex] = useState(null);

  return (
    <section className="relative w-full py-32 overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 pointer-events-none">
        <div
          className="absolute -top-64 left-1/2 -translate-x-1/2 w-[800px] h-[400px] rounded-full opacity-10"
          style={{
            background: "radial-gradient(ellipse, #f43f7e 0%, transparent 70%)",
          }}
        />
      </div>

      <div className="max-w-3xl mx-auto px-6 relative z-10">
        {/* Header */}
        <div className="text-center mb-16">
          <span className="inline-block text-xs font-bold tracking-[0.2em] text-rose-400 uppercase mb-4 bg-rose-50 px-4 py-2 rounded-full border border-rose-100">
            FAQ
          </span>
          <h2
            className="text-4xl md:text-5xl font-black text-gray-900 mb-4"
            style={{ fontFamily: "'Playfair Display', Georgia, serif" }}
          >
            Ada Pertanyaan?
          </h2>
          <p className="text-gray-500 text-base max-w-sm mx-auto">
            Jawaban dari hal-hal yang paling sering ditanyain. Mungkin kamu juga
            penasaran!
          </p>
        </div>

        {/* FAQ Items */}
        <div className="flex flex-col gap-3">
          {faqData.map((item, index) => {
            const isOpen = openIndex === index;
            return (
              <div
                key={index}
                className={`border rounded-2xl overflow-hidden transition-all duration-300 ${
                  isOpen
                    ? "border-rose-200 bg-white shadow-lg shadow-rose-100/50"
                    : "border-gray-100 bg-white/60 hover:border-rose-200 hover:bg-white"
                }`}
              >
                <button
                  onClick={() => setOpenIndex(isOpen ? null : index)}
                  className="w-full flex items-center gap-4 p-5 text-left focus:outline-none group"
                >
                  {/* Emoji */}
                  <div
                    className={`w-10 h-10 rounded-xl flex items-center justify-center text-lg shrink-0 transition-all duration-300 ${
                      isOpen
                        ? "bg-rose-100"
                        : "bg-gray-50 group-hover:bg-rose-50"
                    }`}
                  >
                    {item.emoji}
                  </div>

                  {/* Question */}
                  <span
                    className={`flex-1 font-bold text-sm md:text-base transition-colors duration-200 ${
                      isOpen ? "text-rose-600" : "text-gray-800"
                    }`}
                  >
                    {item.q}
                  </span>

                  {/* Chevron */}
                  <div
                    className={`w-7 h-7 rounded-full flex items-center justify-center shrink-0 transition-all duration-300 ${
                      isOpen
                        ? "bg-rose-500 rotate-180"
                        : "bg-gray-100 group-hover:bg-rose-100"
                    }`}
                  >
                    <svg
                      className={`w-3.5 h-3.5 transition-colors duration-200 ${isOpen ? "text-white" : "text-gray-400"}`}
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
                  </div>
                </button>

                {/* Answer */}
                <div
                  className={`transition-all duration-300 ease-in-out overflow-hidden ${
                    isOpen ? "max-h-48 opacity-100" : "max-h-0 opacity-0"
                  }`}
                >
                  <div className="px-5 pb-5 pl-[4.5rem]">
                    <p className="text-gray-600 text-sm leading-relaxed">
                      {item.a}
                    </p>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Still have questions? */}
        <div className="mt-12 text-center p-8 rounded-3xl bg-gradient-to-br from-rose-50 to-pink-50 border border-rose-100">
          <p className="text-gray-600 text-sm font-medium mb-3">
            Masih ada pertanyaan lain?
          </p>
          <a
            href="mailto:hello@beautysnap.id"
            className="inline-flex items-center gap-2 text-rose-500 font-extrabold text-sm hover:text-rose-600 transition-colors"
          >
            💌 Hubungi Kami
          </a>
        </div>
      </div>
    </section>
  );
};

export default FAQ;
