import { Link } from "react-router-dom";
import BeautySnapIcon from "../assets/BeautySnapIcon.svg";

const Navbar = () => {
  return (
    <nav className="flex justify-between items-center px-8 max-w-7xl mx-auto w-full">
      {/* Logo & Nama */}
      <Link to="/" className="flex items-center gap-2 cursor-pointer">
        <img
          src={BeautySnapIcon}
          alt="Logo BeautySnap"
          className="w-8 h-8 object-contain"
        />
        <span className="text-2xl font-extrabold tracking-tight text-gray-900">
          BeautySnap
        </span>
      </Link>

      {/* Menu & Tombol Login */}
      <div className="flex items-center gap-8">
        {/* Menu Navigasi */}
        <div className="hidden md:flex gap-8 font-medium text-gray-600 text-sm">
          <Link to="/" className="hover:text-pink-500 transition-colors">
            Beranda
          </Link>
          <a href="#" className="hover:text-pink-500 transition-colors">
            Tentang
          </a>
          <a href="#" className="hover:text-pink-500 transition-colors">
            Kontak
          </a>
        </div>

        {/* Tombol Login */}
        <button className="bg-gradient-to-r from-purple-500 to-pink-500 text-white px-6 py-2.5 rounded-full font-bold text-sm shadow-md hover:shadow-lg hover:scale-105 transition-all duration-300">
          Login
        </button>
      </div>
    </nav>
  );
};

export default Navbar;
