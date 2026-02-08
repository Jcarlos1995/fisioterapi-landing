
import React from 'react';

const Hero: React.FC = () => {
  return (
    <div id="inicio" className="relative pt-32 pb-20 md:pt-48 md:pb-32 overflow-hidden bg-gradient-to-br from-blue-50 via-white to-slate-50">
      <div className="container mx-auto px-4 relative z-10">
        <div className="max-w-3xl">
          <span className="inline-block py-1 px-3 rounded-full bg-blue-100 text-blue-700 text-xs font-bold uppercase tracking-wider mb-6">
            Especialistas en Rehabilitación
          </span>
          <h1 className="text-5xl md:text-7xl font-extrabold text-slate-900 leading-tight mb-8">
            Recupera tu <span className="text-blue-600">movilidad</span> y bienestar.
          </h1>
          <p className="text-xl text-slate-600 mb-10 leading-relaxed max-w-2xl">
            En Fisioterapi Chepén, combinamos técnicas avanzadas de fisioterapia con un trato humano para ayudarte a volver a tu vida activa sin dolor.
          </p>
          <div className="flex flex-col sm:flex-row space-y-4 sm:space-y-0 sm:space-x-4">
            <a 
                href="https://fisiosystem-8c492.web.app/#/agendar"
                className="bg-blue-600 text-white px-8 py-4 rounded-xl font-bold text-lg shadow-xl shadow-blue-200 hover:bg-blue-700 transition-all transform hover:-translate-y-1 text-center inline-block" >
                  Reservar Cita
           </a>
          </div>
        </div>
      </div>
      
      {/* Abstract Background Element */}
      <div className="absolute top-1/2 right-0 -translate-y-1/2 w-1/2 h-full hidden lg:block opacity-10 pointer-events-none">
        <svg viewBox="0 0 200 200" xmlns="http://www.w3.org/2000/svg">
          <path fill="#2563EB" d="M44.7,-76.4C58.3,-69.2,70.1,-57.4,78.2,-43.3C86.3,-29.2,90.7,-12.7,89.5,3.4C88.3,19.4,81.5,35,71.5,48.2C61.5,61.4,48.3,72.2,33.4,78.5C18.5,84.7,1.8,86.4,-15.6,83.4C-33,80.4,-51,72.7,-64.4,60.2C-77.8,47.7,-86.6,30.4,-89.8,12.3C-93,-5.8,-90.6,-24.8,-82,-41.2C-73.4,-57.6,-58.6,-71.4,-42.6,-77.4C-26.6,-83.4,-9.4,-81.6,4.6,-89.6C18.6,-97.6,44.7,-76.4,44.7,-76.4Z" transform="translate(100 100)" />
        </svg>
      </div>
    </div>
  );
};

export default Hero;
