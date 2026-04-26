import React, { useState, useEffect } from 'react';
import { Activity, LayoutDashboard } from 'lucide-react';
import { BOOKING_URL, PORTAL_URL } from '../config';

const Navbar: React.FC = () => {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
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

        <div className="flex items-center space-x-3">
          {/* WHATSAPP — ícono en móvil, botón completo en sm+ */}
          <a
            href="https://wa.me/51926798464"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2 bg-green-500 hover:bg-green-600 text-white font-semibold rounded-full transition-all shadow-md active:scale-95 px-3 py-2 sm:px-4 sm:py-2 text-sm"
            aria-label="Contactar por WhatsApp"
          >
            <svg viewBox="0 0 24 24" className="w-4 h-4 fill-current flex-shrink-0" xmlns="http://www.w3.org/2000/svg">
              <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
            </svg>
            <span className="hidden sm:inline">WhatsApp</span>
          </a>

          {/* MI PORTAL: ícono en móvil, texto completo en sm+ */}
          <a
            href={PORTAL_URL}
            className="flex items-center gap-2 text-slate-600 hover:text-blue-600 text-sm font-medium px-3 py-2 rounded-full hover:bg-slate-100 transition-all"
            aria-label="Mi portal"
            title="Mi portal"
          >
            <LayoutDashboard size={18} className="flex-shrink-0" />
            <span className="hidden sm:inline">Mi portal</span>
          </a>

          {/* BOTÓN DE AGENDAR CITA */}
          <a 
            href={BOOKING_URL}
            className="bg-blue-600 text-white px-5 py-2 rounded-full text-sm font-semibold hover:bg-blue-700 transition-all shadow-md active:scale-95 inline-block text-center"
          >
            Agendar Cita
          </a>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;