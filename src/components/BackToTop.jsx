import { useState, useEffect } from "react";

export default function BackToTop() {
  const [isVisible, setIsVisible] = useState(false);

  // Mengecek posisi scroll browser
  const toggleVisibility = () => {
    if (window.scrollY > 300) {
      setIsVisible(true);
    } else {
      setIsVisible(false);
    }
  };

  // Fungsi scroll smooth ke paling atas (Custom Easing untuk support ALL Device termasuk iOS)
  const scrollToTop = () => {
    const startY = window.scrollY;
    const duration = 600; // durasi animasi dalam ms (0.6 detik)
    let startTime = null;

    // Fungsi Easing (Ease Out Quart) untuk efek melambat di akhir yang sangat mulus
    const easeOutQuart = (t) => 1 - --t * t * t * t;

    const step = (currentTime) => {
      if (!startTime) startTime = currentTime;
      const progress = Math.min((currentTime - startTime) / duration, 1);
      
      window.scrollTo(0, startY * (1 - easeOutQuart(progress)));

      if (progress < 1) {
        requestAnimationFrame(step);
      } else {
        window.scrollTo(0, 0);
      }
    };

    requestAnimationFrame(step);
  };

  useEffect(() => {
    window.addEventListener("scroll", toggleVisibility);
    return () => window.removeEventListener("scroll", toggleVisibility);
  }, []);

  return (
    <div
      className={`fixed bottom-6 right-6 z-50 transition-all duration-300 ${
        isVisible
          ? "opacity-100 translate-y-0"
          : "opacity-0 translate-y-10 pointer-events-none"
      }`}
    >
      <button
        onClick={scrollToTop}
        className="w-12 h-12 bg-gradient-to-r from-rose-500 to-pink-500 hover:from-rose-600 hover:to-pink-600 text-white rounded-full flex items-center justify-center shadow-lg shadow-rose-200 hover:shadow-xl hover:shadow-rose-300 hover:-translate-y-1 transition-all duration-300 focus:outline-none"
        aria-label="Kembali ke atas"
      >
        <svg
          className="w-6 h-6"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2.5}
            d="M5 15l7-7 7 7"
          />
        </svg>
      </button>
    </div>
  );
}
