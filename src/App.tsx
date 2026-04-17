import React, { useState } from 'react';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import Stories from './components/Stories';
import Professionals from './components/Professionals';
import Footer from './components/Footer';
import LegalModal, { LegalType } from './components/LegalModal';
import InfoModal, { InfoType } from './components/InfoModal';
import { ChatAssistant } from './components/ChatAssistant';
import { BOOKING_URL } from './config';

const App: React.FC = () => {
  const [legalModalType, setLegalModalType] = useState<LegalType | null>(null);
  const [infoModalType, setInfoModalType] = useState<InfoType | null>(null);

  return (
    <div className="min-h-screen flex flex-col scroll-smooth">
      <Navbar />

      <main className="flex-grow">
        <Hero />

        <section id="profesionales" className="py-20 bg-white">
          <div className="container mx-auto px-4">
            <h2 className="text-3xl md:text-4xl font-bold text-center mb-12 text-slate-800">
              Nuestros Profesionales
            </h2>
            <Professionals />
          </div>
        </section>

        {/* SECCIÓN HISTORIAS - Ajuste final para el comportamiento del Carrusel */}
        <section id="historias" className="py-20 bg-slate-50 overflow-hidden">
          {/* El título se mantiene centrado en el contenedor normal */}
          <div className="container mx-auto px-4 mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-center text-slate-800 uppercase tracking-tight">
              Historias que Inspiran
            </h2>
          </div>

          {/* El componente Stories ahora se expande para permitir el scroll lateral libre */}
          <div className="max-w-[1600px] mx-auto overflow-visible">
            <Stories />
          </div>
        </section>

        <section className="py-20 bg-blue-600 text-white text-center">
          <div className="container mx-auto px-4 max-w-3xl">
            <h2 className="text-3xl font-bold mb-6">¿Listo para mejorar tu calidad de vida?</h2>
            <p className="text-xl mb-8 opacity-90">
              Únete a los cientos de pacientes que han confiado su salud en nuestras manos.
            </p>
            <a
              href={BOOKING_URL}
              className="inline-block bg-white text-blue-600 px-8 py-4 rounded-full font-bold hover:bg-slate-100 transition-all shadow-xl hover:-translate-y-1 active:scale-95"
            >
              Agenda tu Cita Ahora
            </a>
          </div>
        </section>
      </main>

      <Footer
        onLegalClick={(type) => setLegalModalType(type)}
        onInfoClick={(type) => setInfoModalType(type)}
      />

      {/* Modal Legal */}
      <LegalModal
        isOpen={legalModalType !== null}
        onClose={() => setLegalModalType(null)}
        type={legalModalType ?? 'privacidad'}
      />

      {/* Modal Informativo */}
      <InfoModal
        isOpen={infoModalType !== null}
        onClose={() => setInfoModalType(null)}
        type={infoModalType ?? 'contacto'}
      />

      <ChatAssistant />
    </div>
  );
};

export default App;