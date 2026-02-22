import iconKamera from "../assets/IconSnap.png";

const Footer = () => {
  return (
    // bg-[#0a0a0a] ini kode hitam elegan
    <footer className="bg-[#0a0a0a] py-12 mt-auto w-full">
      <div className="max-w-6xl mx-auto px-6">
        <div className="flex flex-col md:flex-row justify-between items-center md:items-start gap-8">
          {/* Bagian Kiri */}
          <div className="flex flex-col items-center md:items-start gap-4">
            <div className="flex items-center gap-2 cursor-pointer">
              <img
                src={iconKamera}
                alt="Logo BeautySnap"
                className="w-6 h-6 object-contain grayscale opacity-80 hover:grayscale-0 hover:opacity-100 transition-all"
              />
              <span className="text-xl font-extrabold text-white tracking-tight">
                BeautySnap
              </span>
            </div>
            <p className="text-gray-400 text-sm text-center md:text-left max-w-xs leading-relaxed">
              Capture your core memories instantly. Your retro digital photo
              booth, built with ❤️.
            </p>
          </div>

          {/* Bagian Tengah */}
          <div className="flex gap-8 text-sm font-medium text-gray-400">
            <a href="#" className="hover:text-pink-500 transition-colors">
              Home
            </a>
            <a href="#" className="hover:text-pink-500 transition-colors">
              About
            </a>
            <a href="#" className="hover:text-pink-500 transition-colors">
              Privacy Policy
            </a>
          </div>

          {/* Bagian Kanan */}
          <div className="text-sm text-gray-500 font-medium">
            © {new Date().getFullYear()} BeautySnap. All rights reserved.
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
