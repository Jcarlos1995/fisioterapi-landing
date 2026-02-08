import React, { useState, useEffect } from 'react';
import { LoginType } from '../types';

interface NavbarProps {
  onLoginClick: (type: LoginType) => void;
}

const Navbar: React.FC<NavbarProps> = ({ onLoginClick }) => {
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
          <div className="w-10 h-10 bg-blue-600 rounded-lg flex items-center justify-center text-white font-bold text-xl">
            F
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
          {/* PORTAL MÉDICO: Para el personal */}
          <a 
            href="https://fisiosystem-8c492.web.app" 
            className="hidden sm:block text-slate-600 hover:text-blue-600 text-sm font-medium px-4 py-2 transition-colors"
          >
            Portal Médico
          </a>

          {/* BOTÓN DE AGENDAR CITA: Ahora envía directo al sistema de reservas */}
          <a 
            href="https://fisiosystem-8c492.web.app/#/agendar"
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