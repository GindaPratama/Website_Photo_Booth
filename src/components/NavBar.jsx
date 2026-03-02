import { Link, useLocation } from "react-router-dom";
import BeautySnapIcon from "../assets/BeautySnapIcon.svg";
import { useState, useEffect } from "react";

const Navbar = () => {
  const [scrolled, setScrolled] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        scrolled
          ? "bg-white/80 backdrop-blur-xl shadow-sm shadow-rose-100/50 border-b border-rose-100/40"
          : "bg-transparent"
      }`}
    >
      <div className="flex justify-between items-center px-6 md:px-10 max-w-7xl mx-auto w-full h-16">
        {/* Logo */}
        <Link to="/" className="flex items-center gap-2.5 group">
          <div className="w-8 h-8 rounded-xl bg-gradient-to-br from-rose-400 to-pink-500 flex items-center justify-center shadow-md shadow-rose-200 group-hover:scale-110 transition-transform duration-300">
            <img
              src={BeautySnapIcon}
              alt="Logo"
              className="w-5 h-5 object-contain brightness-0 invert"
            />
          </div>
          <span
            className="text-lg font-black tracking-tight text-gray-900"
            style={{ fontFamily: "'Playfair Display', Georgia, serif" }}
          >
            Beauty<span className="text-rose-500">Snap</span>
          </span>
        </Link>

        {/* Nav Links */}
        <div className="hidden md:flex items-center gap-1">
          {["Beranda", "Tentang", "Kontak"].map((item) => (
            <a
              key={item}
              href={item === "Beranda" ? "/" : "#"}
              className="relative px-4 py-2 text-sm font-semibold text-gray-500 hover:text-rose-500 transition-colors duration-200 group"
            >
              {item}
              <span className="absolute bottom-1 left-4 right-4 h-0.5 bg-rose-400 scale-x-0 group-hover:scale-x-100 transition-transform duration-300 rounded-full" />
            </a>
          ))}
        </div>

        {/* CTA Button */}
        <Link to="/capture">
          <button className="relative overflow-hidden bg-gradient-to-r from-rose-500 to-pink-500 text-white px-5 py-2 rounded-full font-bold text-sm shadow-lg shadow-rose-200 hover:shadow-rose-300 hover:scale-105 transition-all duration-300 group">
            <span className="relative z-10 flex items-center gap-1.5">
              <span>📸</span> Mulai Foto
            </span>
            <div className="absolute inset-0 bg-gradient-to-r from-pink-500 to-rose-400 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
          </button>
        </Link>
      </div>
    </nav>
  );
};

export default Navbar;
