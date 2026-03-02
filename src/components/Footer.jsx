import iconKamera from "../assets/IconSnap.png";
import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <footer className="relative overflow-hidden bg-gray-950 pt-20 pb-10">
      {/* Top gradient border */}
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-rose-500/30 to-transparent" />

      {/* Background glow */}
      <div
        className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-[300px] rounded-full opacity-5"
        style={{
          background: "radial-gradient(ellipse, #f43f7e 0%, transparent 70%)",
        }}
      />

      <div className="max-w-6xl mx-auto px-6 relative z-10">
        {/* Top section */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 mb-16">
          {/* Brand */}
          <div className="md:col-span-1">
            <Link to="/" className="flex items-center gap-2.5 mb-4 group w-fit">
              <div className="w-8 h-8 rounded-xl bg-gradient-to-br from-rose-400 to-pink-500 flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform duration-300">
                <img
                  src={iconKamera}
                  alt="Logo"
                  className="w-4 h-4 object-contain brightness-0 invert"
                />
              </div>
              <span
                className="text-lg font-black text-white tracking-tight"
                style={{ fontFamily: "'Playfair Display', Georgia, serif" }}
              >
                Beauty<span className="text-rose-400">Snap</span>
              </span>
            </Link>
            <p className="text-gray-400 text-sm leading-relaxed max-w-xs">
              Platform photo booth digital yang membantu kamu mengabadikan momen
              berharga dengan gaya estetik kekinian.
            </p>
          </div>

          {/* Links */}
          <div>
            <h4 className="text-white font-bold text-sm mb-5 tracking-wider uppercase">
              Navigasi
            </h4>
            <ul className="flex flex-col gap-3">
              {["Beranda", "Tentang Kami", "Cara Kerja", "FAQ"].map((item) => (
                <li key={item}>
                  <a
                    href="#"
                    className="text-gray-400 text-sm hover:text-rose-400 transition-colors duration-200 flex items-center gap-2 group"
                  >
                    <span className="w-1 h-1 rounded-full bg-rose-500/0 group-hover:bg-rose-500 transition-all duration-200" />
                    {item}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Social / Newsletter */}
          <div>
            <h4 className="text-white font-bold text-sm mb-5 tracking-wider uppercase">
              Ikuti Kami
            </h4>
            <div className="flex gap-3 mb-6">
              {[
                { label: "Instagram", icon: "📸" },
                { label: "TikTok", icon: "🎵" },
                { label: "Twitter", icon: "🐦" },
              ].map((social) => (
                <a
                  key={social.label}
                  href="#"
                  className="w-10 h-10 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center text-lg hover:bg-rose-500/20 hover:border-rose-500/30 transition-all duration-200 hover:scale-110"
                >
                  {social.icon}
                </a>
              ))}
            </div>
            <Link
              to="/capture"
              className="inline-flex items-center gap-2 bg-gradient-to-r from-rose-500 to-pink-500 text-white text-sm font-bold px-5 py-2.5 rounded-xl shadow-lg shadow-rose-900/30 hover:scale-105 transition-all duration-200"
            >
              📸 Mulai Foto Gratis
            </Link>
          </div>
        </div>

        {/* Divider */}
        <div className="h-px bg-gradient-to-r from-transparent via-gray-700 to-transparent mb-8" />

        {/* Bottom bar */}
        <div className="flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-gray-500 text-xs">
            © {new Date().getFullYear()} BeautySnap. Made with ❤️ in Indonesia.
          </p>
          <div className="flex gap-6">
            {["Privacy Policy", "Terms of Service"].map((item) => (
              <a
                key={item}
                href="#"
                className="text-gray-500 text-xs hover:text-rose-400 transition-colors duration-200"
              >
                {item}
              </a>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
