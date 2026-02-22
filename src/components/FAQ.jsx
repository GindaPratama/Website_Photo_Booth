import { useState } from "react";

const FAQ = () => {
  // 1. Ini State buat ngatur pertanyaan mana yang lagi kebuka
  // Kalau null, berarti tertutup semua. Kalau isinya angka (index), berarti pertanyaan itu kebuka.
  const [openIndex, setOpenIndex] = useState(null);

  // 2. Fungsi buat ngebuka/nutup pas pertanyaannya diklik
  const toggleFAQ = (index) => {
    // Kalau yang diklik udah kebuka, tutup. Kalau belum, buka yang diklik.
    setOpenIndex(openIndex === index ? null : index);
  };

  // 3. Daftar Pertanyaan & Jawaban (Bisa lu ubah-ubah kata-katanya)
  const faqData = [
    {
      q: "Apa itu BeautySnap Online Photobooth?",
      a: "BeautySnap adalah platform photo booth digital berbasis web. Kamu bisa ambil foto, pakai filter estetik, nambahin stiker, dan milih frame layaknya di photobooth asli, langsung dari browsermu!",
    },
    {
      q: "Apakah saya perlu membuat akun untuk menggunakan BeautySnap?",
      a: "Nggak perlu ribet! Kamu bisa langsung klik 'Start Capture' dan mulai foto-foto tanpa harus daftar atau login bikin akun.",
    },
    {
      q: "Apakah hasilnya berbayar?",
      a: "100% Gratis, bestie! Kamu bebas jepret dan unduh foto sebanyak apapun tanpa dipungut biaya sepeser pun.",
    },
    {
      q: "Apakah foto-foto saya aman dan tidak disebar?",
      a: "Sangat aman. Semua proses jepret dan edit foto terjadi langsung di perangkat (browser) kamu. Kami tidak menyimpan foto-fotomu di server mana pun.",
    },
    {
      q: "Bisa dipakai di HP nggak?",
      a: "Bisa banget! BeautySnap dirancang responsif, jadi kamu bisa seru-seruan bareng temen pakai kamera laptop, PC, maupun kamera HP kesayanganmu.",
    },
  ];

  return (
    // Wadah utamanya kita kasih warna hitam elegan sesuai referensi lu
    <section className="w-full py-24 mt-20">
      <div className="max-w-4xl mx-auto px-6">
        {/* Header FAQ */}
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-extrabold text-gray-900 mb-4">
            Frequently Asked Questions
          </h2>
          <p className="text-white-600 text-sm md:text-base">
            Ini adalah jawaban dari pertanyaan-pertanyaan yang paling sering
            ditanyain—mungkin kamu juga penasaran.
          </p>
        </div>

        {/* List Pertanyaan (Di-loop pakai .map) */}
        <div className="flex flex-col gap-4">
          {faqData.map((item, index) => (
            // Kotak setiap pertanyaan
            <div
              key={index}
              className="border border-pink-800 bg-pink-500 rounded-xl overflow-hidden transition-all duration-300 hover:border-pink-500/50"
            >
              {/* Bagian Pertanyaan (Bisa diklik) */}
              <button
                onClick={() => toggleFAQ(index)}
                className="w-full flex justify-between items-center p-5 text-left text-white focus:outline-none"
              >
                <span className="font-medium text-sm md:text-base">
                  {item.q}
                </span>

                {/* Icon Panah Buka/Tutup (Pake SVG manual biar gampang) */}
                <svg
                  className={`w-5 h-5 text-white transition-transform duration-300 ${openIndex === index ? "rotate-180 text-pink-500" : ""}`}
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M19 9l-7 7-7-7"
                  />
                </svg>
              </button>

              {/* Bagian Jawaban (Muncul kalau index-nya sama dengan state openIndex) */}
              <div
                className={`transition-all duration-300 ease-in-out ${
                  openIndex === index
                    ? "max-h-40 opacity-100 border-t border-gray-800/50"
                    : "max-h-0 opacity-0"
                }`}
              >
                <div className="p-5 text-white text-sm leading-relaxed">
                  {item.a}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default FAQ;
