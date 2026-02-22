import IconSnap from "../assets/IconSnap.png";
import MockupHero2 from "../assets/MockupHero2.png";
import { useNavigate } from 'react-router-dom';

const Hero = () => {
  const navigate = useNavigate();
  return (
    // Tersangka 3: Wadahnya kita perlebar jadi max-w-6xl biar teks gede bisa muat satu baris
    <section className="flex flex-col items-center justify-center text-center mt-20 px-4 w-full max-w-6xl mx-auto mb-24">
      {/* Headline Utama */}
      {/* Tersangka 1 & 2: max-w dan text-balance gue hapus, tag <br> gue basmi */}
      <h1 className="text-4xl md:text-4xl lg:text-4xl font-extrabold text-gray-900 tracking-tight leading-tight w-full mb-4">
        BeautySnap - Photobooth Online & Foto Strip Gratis
      </h1>

      {/* SubHeadline */}
      <p className="text-gray-500 text-lg mb-5 font-regular max-w-3xl mx-auto">
        Ambil gambar, sesuaikan gaya, dan ciptakan karya. Nikmati kemudahan akses photo booth digital bergaya retro langsung dari peramban Anda.
      </p>

      {/* Tombol Start Capture */}
      <button 
      onClick={() => navigate('/capture')} 
      className="mb-5 mt-10 bg-gradient-to-r from-purple-500 to-pink-500 text-white px-8 py-3.5 rounded-full font-bold text-lg shadow-lg hover:shadow-xl hover:-translate-y-1 hover:scale-105 transition-all duration-300 flex items-center gap-2">
        <span className="text-xl flex items-center justify-center">
          {/* Pastikan icon lu gak kebesaran, kalau kebesaran tambahin w-6 h-6 di className img-nya */}
          <img src={IconSnap} alt="Icon" className="w-6 h-6 object-contain" />
        </span>       
        Start Capture
      </button>

      {/* Mockup Gambar */}
      <div className="w-full max-w-4xl relative group">
        <img
          src={MockupHero2}
          alt="BeautySnap App Preview"
          className="mt-10 mx-auto w-full h-auto object-contain drop-shadow-2xl hover:scale-[1.02] transition-transform duration-500"
        />
      </div>
    </section>
  );
};

export default Hero;
