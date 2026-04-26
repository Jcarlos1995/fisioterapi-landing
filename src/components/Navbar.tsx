import React, { useState, useEffect, useRef } from 'react';
import { Activity, LayoutDashboard, ChevronDown, CalendarDays, MessageCircle, UserCircle2 } from 'lucide-react';
import { BOOKING_URL, PATIENT_PORTAL_URL, PORTAL_URL } from '../config';

const Navbar: React.FC = () => {
  const [scrolled, setScrolled] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
      setIsMenuOpen(false);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (!menuRef.current) return;
      if (!menuRef.current.contains(event.target as Node)) {
        setIsMenuOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  return (
    <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
      scrolled ? 'bg-white/90 backdrop-blur-md shadow-sm py-3' : 'bg-transparent py-5'
    }`}>
      <div className="container mx-auto px-4 flex justify-between items-center">
        <div className="flex items-center space-x-2">
          <div className="bg-blue-600 p-2 rounded-2xl shadow-lg shadow-blue-200 flex items-center justify-center">
            <Activity className="text-white" size={24} />
          </div>
          <span className={`text-xl font-bold ${scrolled ? 'text-slate-800' : 'text-slate-800'}`}>
            Fisioterapi Chepén <span className="text-red-500 text-3xl">❤️</span>
          </span>
        </div>

        <div className="hidden md:flex items-center space-x-8 text-sm font-medium text-slate-600">
          <a href="#inicio" className="hover:text-blue-600 transition-colors">Inicio</a>
          <a href="#profesionales" className="hover:text-blue-600 transition-colors">Especialistas</a>
          <a href="#historias" className="hover:text-blue-600 transition-colors">Historias</a>
        </div>

        <div ref={menuRef} className="relative">
          <button
            onClick={() => setIsMenuOpen((prev) => !prev)}
            className="flex items-center gap-2 bg-white text-blue-700 border border-blue-200 hover:bg-blue-50 text-sm font-semibold px-4 py-2 rounded-full transition-all shadow-sm"
            aria-label="Abrir menú de acciones"
            aria-expanded={isMenuOpen}
          >
            Accesos
            <ChevronDown size={16} className={`transition-transform ${isMenuOpen ? 'rotate-180' : ''}`} />
          </button>

          {isMenuOpen && (
            <div className="absolute right-0 mt-2 w-56 bg-white/95 backdrop-blur-sm border border-slate-200 rounded-2xl shadow-xl p-2 z-50">
              <a
                href="https://wa.me/51926798464"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 px-3 py-2 rounded-xl text-sm font-medium text-slate-700 hover:bg-slate-100"
                onClick={() => setIsMenuOpen(false)}
              >
                <MessageCircle size={16} className="text-green-600" />
                WhatsApp
              </a>

              <a
                href={PATIENT_PORTAL_URL}
                className="flex items-center gap-2 px-3 py-2 rounded-xl text-sm font-medium text-slate-700 hover:bg-slate-100"
                onClick={() => setIsMenuOpen(false)}
              >
                <UserCircle2 size={16} className="text-sky-600" />
                Mi Portal
              </a>

              <a
                href={BOOKING_URL}
                className="flex items-center gap-2 px-3 py-2 rounded-xl text-sm font-medium text-slate-700 hover:bg-slate-100"
                onClick={() => setIsMenuOpen(false)}
              >
                <CalendarDays size={16} className="text-indigo-600" />
                Agendar Cita
              </a>

              <a
                href={PORTAL_URL}
                className="flex items-center gap-2 px-3 py-2 rounded-xl text-sm font-medium text-slate-700 hover:bg-slate-100"
                onClick={() => setIsMenuOpen(false)}
              >
                <LayoutDashboard size={16} className="text-blue-600" />
                Portal Médico
              </a>
            </div>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;