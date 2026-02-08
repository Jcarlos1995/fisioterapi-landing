
import React from 'react';

const Footer: React.FC = () => {
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
              <li><a href="#" className="hover:text-blue-400 transition-colors">Sobre Nosotros</a></li>
              <li><a href="#" className="hover:text-blue-400 transition-colors">Servicios de Fisioterapia</a></li>
              <li><a href="#" className="hover:text-blue-400 transition-colors">Especialistas</a></li>
              <li><a href="#" className="hover:text-blue-400 transition-colors">Contacto</a></li>
            </ul>
          </div>

          <div>
            <h4 className="text-white font-bold mb-6">Legal</h4>
            <ul className="space-y-4 text-sm">
              <li><a href="#" className="hover:text-blue-400 transition-colors">Privacidad</a></li>
              <li><a href="#" className="hover:text-blue-400 transition-colors">Términos de Uso</a></li>
              <li><a href="#" className="hover:text-blue-400 transition-colors">Cookies</a></li>
            </ul>
          </div>

          <div>
            <h4 className="text-white font-bold mb-6">Contacto</h4>
            <ul className="space-y-4 text-sm">
              <li className="flex items-start space-x-3">
                <span className="text-blue-500 italic">📍</span>
                <span>Av Manuel seoane 259, Chepén, Chepén, Perú</span>
              </li>
              <li className="flex items-start space-x-3">
                <span className="text-blue-500 italic">📞</span>
                <span>+51 926 798 464</span>
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
