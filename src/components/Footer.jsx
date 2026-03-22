import iconKamera from "../assets/IconSnap.png";
import { Link } from "react-router-dom";

const Footer = () => (
  <footer className="relative overflow-hidden bg-gray-950 pt-12 sm:pt-20 pb-8 sm:pb-10">
    <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-rose-500/30 to-transparent" />
    <div
      className="absolute top-0 left-1/2 -translate-x-1/2 w-[400px] sm:w-[600px] h-[200px] sm:h-[300px] rounded-full opacity-5"
      style={{
        background: "radial-gradient(ellipse, #f43f7e 0%, transparent 70%)",
      }}
    />

    <div className="max-w-6xl mx-auto px-4 sm:px-6 relative z-10">
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 sm:gap-10 lg:gap-12 mb-10 sm:mb-16">
        {/* Brand */}
        <div className="sm:col-span-2 lg:col-span-1">
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
              Pic<span className="text-rose-400">Strip</span>
            </span>
          </Link>
          <p className="text-gray-400 text-sm leading-relaxed max-w-xs">
            Platform photo booth digital yang membantu mengabadikan momen
            berharga dengan gaya estetik kekinian.
          </p>
        </div>

        {/* Links */}
        <div>
          <h4 className="text-white font-bold text-sm mb-4 sm:mb-5 tracking-wider uppercase">
            Navigasi
          </h4>
          <ul className="flex flex-col gap-2 sm:gap-3">
            {[
              { label: "Beranda", path: "/" },
              { label: "Tentang Kami", path: "/tentang" },
              { label: "Cara Kerja", path: "/#how-it-works" },
              { label: "FAQ", path: "/#faq" },
            ].map((item) => (
              <li key={item.label}>
                {item.path.startsWith("/#") ? (
                  <a
                    href={item.path}
                    className="text-gray-400 text-sm hover:text-rose-400 transition-colors duration-200 flex items-center gap-2 group"
                  >
                    <span className="w-1 h-1 rounded-full bg-rose-500/0 group-hover:bg-rose-500 transition-all duration-200" />
                    {item.label}
                  </a>
                ) : (
                  <Link
                    to={item.path}
                    onClick={(e) => {
                      if (item.path === "/" && window.location.pathname === "/") {
                        e.preventDefault();
                        window.scrollTo({ top: 0, behavior: "smooth" });
                      } else {
                        window.scrollTo(0, 0); // Reset scroll saat pindah halaman
                      }
                    }}
                    className="text-gray-400 text-sm hover:text-rose-400 transition-colors duration-200 flex items-center gap-2 group"
                  >
                    <span className="w-1 h-1 rounded-full bg-rose-500/0 group-hover:bg-rose-500 transition-all duration-200" />
                    {item.label}
                  </Link>
                )}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  </footer>
);

export default Footer;
