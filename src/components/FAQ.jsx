import { useState } from "react";

const faqData = [
  {
    q: "Apa itu PictStrip Online Photobooth?",
    a: "PictStrip adalah platform photo booth digital berbasis web yang memungkinkan Anda untuk mengambil foto, menggunakan filter, menambahkan stiker, dan memilih bingkai layaknya di studio foto sungguhan, semua dapat diakses langsung dari peramban web (browser) Anda.",
    emoji: "✨",
  },
  {
    q: "Apakah saya perlu mendaftar atau membuat akun terlebih dahulu?",
    a: "Tidak perlu. Anda dapat langsung menggunakan layanan kami dengan menekan tombol 'Start Capture' dan memberikan izin akses kamera, tanpa perlu melakukan proses pendaftaran akun (login).",
    emoji: "🔓",
  },
  {
    q: "Apakah ada biaya yang dikenakan untuk menggunakan layanan ini?",
    a: "Layanan PictStrip sepenuhnya gratis. Tidak ada biaya tersembunyi maupun sistem berbayar. Anda bebas untuk mengambil sesi foto dan mengunduh hasilnya sebanyak yang Anda inginkan.",
    emoji: "🎁",
  },
  {
    q: "Apakah privasi dan keamanan foto saya terjamin?",
    a: "Privasi Anda adalah prioritas kami. Seluruh proses pengambilan dan penyuntingan foto dilakukan secara lokal (langsung di browser ponsel atau komputer Anda). Kami tidak pernah mengunggah maupun menyimpan foto Anda ke dalam server kami.",
    emoji: "🔒",
  },
  {
    q: "Apakah layanan ini dapat diakses melalui ponsel pintar (smartphone)?",
    a: "Tentu saja. Situs web PictStrip dirancang secara responsif dan kompatibel dengan berbagai tampilan layar. Anda dapat menggunakannya di komputer jinjing (laptop), tablet, maupun ponsel pintar Anda dengan lancar.",
    emoji: "📱",
  },
];

const FAQ = () => {
  const [openIndex, setOpenIndex] = useState(null);
  return (
    <section id="faq" className="relative w-full py-16 sm:py-24 lg:py-32 overflow-hidden">
      <div className="absolute inset-0 pointer-events-none">
        <div
          className="absolute -top-64 left-1/2 -translate-x-1/2 w-[400px] sm:w-[800px] h-[300px] sm:h-[400px] rounded-full opacity-10"
          style={{
            background: "radial-gradient(ellipse, #f43f7e 0%, transparent 70%)",
          }}
        />
      </div>

      <div className="max-w-3xl mx-auto px-4 sm:px-6 relative z-10">
        <div className="text-center mb-10 sm:mb-16">
          <span className="inline-block text-xs font-bold tracking-[0.2em] text-rose-400 uppercase mb-3 sm:mb-4 bg-rose-50 px-4 py-2 rounded-full border border-rose-100">
            PERTANYAAN UMUM
          </span>
          <h2
            className="text-3xl sm:text-4xl md:text-5xl font-black text-gray-900 mb-3 sm:mb-4"
            style={{ fontFamily: "'Playfair Display', Georgia, serif" }}
          >
            Ada Pertanyaan?
          </h2>
          <p className="text-gray-500 text-sm sm:text-base max-w-xs sm:max-w-sm mx-auto">
            Berikut adalah jawaban untuk beberapa pertanyaan yang paling sering diajukan mengenai layanan PictStrip.
          </p>
        </div>

        <div className="flex flex-col gap-2 sm:gap-3">
          {faqData.map((item, index) => {
            const isOpen = openIndex === index;
            return (
              <div
                key={index}
                className={`border rounded-xl sm:rounded-2xl overflow-hidden transition-all duration-300 ${isOpen ? "border-rose-200 bg-white shadow-lg shadow-rose-100/50" : "border-gray-100 bg-white/60 hover:border-rose-200 hover:bg-white"}`}
              >
                <button
                  onClick={() => setOpenIndex(isOpen ? null : index)}
                  className="w-full flex items-center gap-3 sm:gap-4 p-4 sm:p-5 text-left focus:outline-none group"
                >
                  <div
                    className={`w-8 h-8 sm:w-10 sm:h-10 rounded-lg sm:rounded-xl flex items-center justify-center text-base sm:text-lg shrink-0 transition-all duration-300 ${isOpen ? "bg-rose-100" : "bg-gray-50 group-hover:bg-rose-50"}`}
                  >
                    {item.emoji}
                  </div>
                  <span
                    className={`flex-1 font-bold text-xs sm:text-sm md:text-base transition-colors duration-200 ${isOpen ? "text-rose-600" : "text-gray-800"}`}
                  >
                    {item.q}
                  </span>
                  <div
                    className={`w-6 h-6 sm:w-7 sm:h-7 rounded-full flex items-center justify-center shrink-0 transition-all duration-300 ${isOpen ? "bg-rose-500 rotate-180" : "bg-gray-100 group-hover:bg-rose-100"}`}
                  >
                    <svg
                      className={`w-3 h-3 sm:w-3.5 sm:h-3.5 transition-colors ${isOpen ? "text-white" : "text-gray-400"}`}
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
                <div
                  className={`transition-all duration-300 ease-in-out overflow-hidden ${isOpen ? "max-h-48 opacity-100" : "max-h-0 opacity-0"}`}
                >
                  <div className="px-4 sm:px-5 pb-4 sm:pb-5 pl-[3.5rem] sm:pl-[4.5rem]">
                    <p className="text-gray-600 text-xs sm:text-sm leading-relaxed">
                      {item.a}
                    </p>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
};

export default FAQ;
