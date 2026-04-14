
import React from 'react';
import { LegalType } from './LegalModal';
import { InfoType } from './InfoModal';

interface FooterProps {
  onLegalClick: (type: LegalType) => void;
  onInfoClick: (type: InfoType) => void;
}

const scrollTo = (id: string) => {
  document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
};

const Footer: React.FC<FooterProps> = ({ onLegalClick, onInfoClick }) => {
  return (
    <footer className="bg-slate-900 text-slate-400 py-12">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-12">
          <div className="col-span-1 md:col-span-1">
            <div className="flex items-center space-x-2 mb-6">
              <div className="w-8 h-8 bg-blue-600 rounded flex items-center justify-center text-white font-bold">F</div>
              <span className="text-white text-xl font-bold">Fisioterapi Chepén</span>
            </div>
            <p className="text-sm leading-relaxed">
              Dedicados a la rehabilitación física y el bienestar integral con los más altos estándares de calidad en Chepén.
            </p>
          </div>

          <div>
            <h4 className="text-white font-bold mb-6">Enlaces</h4>
            <ul className="space-y-4 text-sm">
              <li>
                <button
                  onClick={() => onInfoClick('sobre-nosotros')}
                  className="hover:text-blue-400 transition-colors text-left"
                >
                  Sobre Nosotros
                </button>
              </li>
              <li>
                <button
                  onClick={() => onInfoClick('servicios')}
                  className="hover:text-blue-400 transition-colors text-left"
                >
                  Servicios de Fisioterapia
                </button>
              </li>
              <li>
                <button
                  onClick={() => scrollTo('profesionales')}
                  className="hover:text-blue-400 transition-colors text-left"
                >
                  Especialistas
                </button>
              </li>
              <li>
                <button
                  onClick={() => onInfoClick('contacto')}
                  className="hover:text-blue-400 transition-colors text-left"
                >
                  Contacto
                </button>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="text-white font-bold mb-6">Legal</h4>
            <ul className="space-y-4 text-sm">
              <li>
                <button
                  onClick={() => onLegalClick('privacidad')}
                  className="hover:text-blue-400 transition-colors text-left"
                >
                  Privacidad
                </button>
              </li>
              <li>
                <button
                  onClick={() => onLegalClick('terminos')}
                  className="hover:text-blue-400 transition-colors text-left"
                >
                  Términos de Uso
                </button>
              </li>
              <li>
                <button
                  onClick={() => onLegalClick('cookies')}
                  className="hover:text-blue-400 transition-colors text-left"
                >
                  Cookies
                </button>
              </li>
            </ul>
          </div>

          <div id="contacto">
            <h4 className="text-white font-bold mb-6">Contacto</h4>
            <ul className="space-y-4 text-sm">
              <li className="flex items-start space-x-3">
                <span className="text-blue-500 italic">📍</span>
                <a
                  href="https://www.google.com/maps/search/?api=1&query=Av+Manuel+Seoane+259+Chep%C3%A9n+Per%C3%BA"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-blue-400 transition-colors"
                >
                  Av Manuel Seoane 259, Chepén, Chepén, Perú
                </a>
              </li>
              <li className="flex items-start space-x-3">
                <span className="text-blue-500 italic">📞</span>
                <a
                  href="https://wa.me/51926798464"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-green-400 transition-colors"
                >
                  +51 926 798 464
                </a>
              </li>
              <li className="flex items-start space-x-3">
                <span className="text-blue-500 italic">✉️</span>
                <span>Silviakarinafuentesromero3@gmail.com</span>
              </li>
            </ul>
          </div>
        </div>

        <div className="pt-8 border-t border-slate-800 text-center text-xs">
          <p>© {new Date().getFullYear()} Fisioterapi Chepén. Todos los derechos reservados.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;

