// Nanti kalau gambarnya udah di-export dari Figma, un-comment import di bawah ini ya:
// import step1 from '../assets/step1.png';
// import step2 from '../assets/step2.png';
// import step3 from '../assets/step3.png';

const HowItWorks = () => {
  return (
    <section className="w-full max-w-6xl mx-auto px-6 mt-32 mb-24">
      {/* Judul Section */}
      <h2 className="text-4xl md:text-4xl lg-text-4xl font-extrabold text-center text-gray-900 mb-2">
        Bagaimana Cara Menggunakan Fitur Photo Booth?
      </h2>
      <h4 className="text-2 font-normal text-center text-gray-500 mb-15">
        Hanya dengan 3 langkah sederhana, Anda dapat mulai menggunakan be.
      </h4>

      {/* Wadah Grid (Bagi 3 Kolom) */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {/* === KARTU 1 === */}
        <div className="bg-[#fff0f6] p-6 md:p-8 rounded-[2rem] flex flex-col hover:-translate-y-2 transition-transform duration-300">
          {/* Tempat Gambar (Placeholder) */}
          {/* Kalau gambar udah siap, hapus div di bawah ini dan ganti pakai: <img src={step1} alt="Step 1" className="w-full h-auto mb-6 drop-shadow-sm" /> */}
          <div className="bg-white border border-gray-100 rounded-2xl aspect-[4/3] mb-8 flex items-center justify-center shadow-sm">
            <span className="text-gray-400 font-medium text-sm">
              Gambar Step 1
            </span>
          </div>

          <h3 className="text-xl font-bold text-pink-500 mb-3">Ambil 4 Foto</h3>
          <p className="text-gray-600 text-sm leading-relaxed">
            Pilih filter, tekan "Mulai," dan keseruan akan dimulai! Timer hanya
            memberi 3 detik untuk berpose per foto dan akan mengambil 4 foto
            secara berurutan.
          </p>
        </div>

        {/* === KARTU 2 === */}
        <div className="bg-[#fff0f6] p-6 md:p-8 rounded-[2rem] flex flex-col hover:-translate-y-2 transition-transform duration-300">
          {/* Tempat Gambar (Placeholder) */}
          <div className="bg-white border border-gray-100 rounded-2xl aspect-[4/3] mb-8 flex items-center justify-center shadow-sm">
            <span className="text-gray-400 font-medium text-sm">
              Gambar Step 2
            </span>
          </div>

          <h3 className="text-xl font-bold text-pink-500 mb-3">
            Tambahkan Stiker dan Frame
          </h3>
          <p className="text-gray-600 text-sm leading-relaxed">
            Setelah mengambil foto, pilih warna frame dan tambahkan stiker untuk
            membuat foto jadi lebih estetik dan meriah.
          </p>
        </div>

        {/* === KARTU 3 === */}
        <div className="bg-[#fff0f6] p-6 md:p-8 rounded-[2rem] flex flex-col hover:-translate-y-2 transition-transform duration-300">
          {/* Tempat Gambar (Placeholder) */}
          <div className="bg-white border border-gray-100 rounded-2xl aspect-[4/3] mb-8 flex items-center justify-center shadow-sm">
            <span className="text-gray-400 font-medium text-sm">
              Gambar Step 3
            </span>
          </div>

          <h3 className="text-xl font-bold text-pink-500 mb-3">Unduh</h3>
          <p className="text-gray-600 text-sm leading-relaxed">
            Setelah selesai, klik "Unduh". Foto-foto tersebut siap untuk
            dibagikan di mana saja dengan siapa saja.
          </p>
        </div>
      </div>
    </section>
  );
};

export default HowItWorks;
