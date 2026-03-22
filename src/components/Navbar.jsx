/* eslint-disable react-hooks/set-state-in-effect */
import { Link, useLocation } from "react-router-dom";
import BeautySnapIcon from "../assets/BeautySnapIcon.svg";
import { useState, useEffect } from "react";

const NAV_LINKS = [
  { label: "Beranda", to: "/" },
  { label: "Tentang", to: "/tentang" },
  { label: "Kontak", to: "/kontak" },
];

const Navbar = () => {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const location = useLocation();

  // Scroll listener
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Tutup menu saat pindah halaman
  useEffect(() => {
    setMenuOpen(false);
  }, [location.pathname]);

  // Cegah scroll body saat menu mobile terbuka
  useEffect(() => {
    document.body.style.overflow = menuOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [menuOpen]);

  return (
    <>
      {/* ─────────────────────────────────────────
          NAVBAR UTAMA
      ───────────────────────────────────────── */}
      <nav
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
          scrolled || menuOpen
            ? "bg-white/90 backdrop-blur-xl shadow-sm shadow-rose-100/50 border-b border-rose-100/40"
            : "bg-transparent"
        }`}
      >
        <div className="flex justify-between items-center px-4 sm:px-6 md:px-10 max-w-7xl mx-auto w-full h-14 sm:h-16">
          {/* ── Logo ── */}
          <Link
            to="/"
            className="flex items-center gap-2 sm:gap-2.5 group shrink-0"
          >
            <div className="w-7 h-7 sm:w-8 sm:h-8 rounded-xl bg-gradient-to-br from-rose-400 to-pink-500 flex items-center justify-center shadow-md shadow-rose-200 group-hover:scale-110 transition-transform duration-300">
              <img
                src={BeautySnapIcon}
                alt="PicStrip Logo"
                className="w-4 h-4 sm:w-5 sm:h-5 object-contain brightness-0 invert"
              />
            </div>
            <span
              className="text-base sm:text-lg font-black tracking-tight text-gray-900"
              style={{ fontFamily: "'Playfair Display', Georgia, serif" }}
            >
              Pic<span className="text-rose-500">Strip</span>
            </span>
          </Link>
          {/* ── Desktop Nav Links ── */}
          <div className="hidden md:flex items-center gap-1">
            {NAV_LINKS.map((item) => {
              const isActive = location.pathname === item.to;
              return (
                <Link
                  key={item.label}
                  to={item.to}
                  className={`relative px-4 py-2 text-sm font-semibold transition-colors duration-200 group ${
                    isActive
                      ? "text-rose-500"
                      : "text-gray-500 hover:text-rose-500"
                  }`}
                >
                  {item.label}
                  <span
                    className={`absolute bottom-1 left-4 right-4 h-0.5 bg-rose-400 rounded-full transition-transform duration-300 ${
                      isActive
                        ? "scale-x-100"
                        : "scale-x-0 group-hover:scale-x-100"
                    }`}
                  />
                </Link>
              );
            })}
          </div>

          {/* ── Mobile: CTA kecil + Hamburger ── */}
          <div className="flex md:hidden items-center gap-2">
            <Link to="/capture">
              <button className="bg-gradient-to-r from-rose-500 to-pink-500 text-white px-3 py-1.5 rounded-full font-bold text-xs shadow-md hover:scale-105 transition-all">
                📸 Foto
              </button>
            </Link>

            <button
              onClick={() => setMenuOpen((v) => !v)}
              className="w-9 h-9 flex flex-col items-center justify-center gap-[5px] rounded-xl hover:bg-rose-50 transition-colors duration-200"
              aria-label={menuOpen ? "Tutup menu" : "Buka menu"}
              aria-expanded={menuOpen}
            >
              <span
                className={`block w-[18px] h-[2px] bg-gray-700 rounded-full transition-all duration-300 origin-center ${menuOpen ? "rotate-45 translate-y-[7px]" : ""}`}
              />
              <span
                className={`block w-[18px] h-[2px] bg-gray-700 rounded-full transition-all duration-300 ${menuOpen ? "opacity-0 scale-x-0" : ""}`}
              />
              <span
                className={`block w-[18px] h-[2px] bg-gray-700 rounded-full transition-all duration-300 origin-center ${menuOpen ? "-rotate-45 -translate-y-[7px]" : ""}`}
              />
            </button>
          </div>
        </div>

        {/* ─────────────────────────────────────────
            MOBILE DROPDOWN
        ───────────────────────────────────────── */}
        <div
          className={`md:hidden transition-all duration-300 ease-in-out overflow-hidden ${
            menuOpen ? "max-h-80 opacity-100" : "max-h-0 opacity-0"
          }`}
        >
          <div className="bg-white/98 backdrop-blur-xl border-t border-rose-100/40 px-4 py-3 flex flex-col gap-1">
            {NAV_LINKS.map((item) => {
              const isActive = location.pathname === item.to;
              return (
                <Link
                  key={item.label}
                  to={item.to}
                  onClick={() => setMenuOpen(false)}
                  className={`flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-semibold transition-all duration-200 ${
                    isActive
                      ? "bg-rose-50 text-rose-500"
                      : "text-gray-600 hover:text-rose-500 hover:bg-rose-50/70"
                  }`}
                >
                  <span
                    className={`w-1.5 h-1.5 rounded-full shrink-0 transition-colors ${isActive ? "bg-rose-500" : "bg-rose-200"}`}
                  />
                  {item.label}
                  {isActive && (
                    <span className="ml-auto text-rose-400 text-xs">●</span>
                  )}
                </Link>
              );
            })}

            <div className="border-t border-gray-100 mt-1 pt-2">
              <Link
                to="/capture"
                onClick={() => setMenuOpen(false)}
                className="flex items-center justify-center gap-2 w-full bg-gradient-to-r from-rose-500 to-pink-500 text-white py-3 rounded-xl font-bold text-sm shadow-md hover:scale-[1.02] transition-all"
              >
                📸 Mulai Foto Sekarang
              </Link>
            </div>
          </div>
        </div>
      </nav>

      {/* Backdrop klik untuk tutup */}
      <div
        className={`fixed inset-0 z-40 bg-black/10 md:hidden transition-opacity duration-300 ${
          menuOpen
            ? "opacity-100 pointer-events-auto"
            : "opacity-0 pointer-events-none"
        }`}
        onClick={() => setMenuOpen(false)}
        aria-hidden="true"
      />
    </>
  );
};

export default Navbar;
