import React, { useState, useEffect, useRef } from 'react';
import { X, Radio, Clock, ExternalLink } from 'lucide-react';
import { BOOKING_URL } from '../config';
import { useLiveEvent } from '../hooks/useLiveEvent';
import logoFisioterapia from '../assets/logo-fisioterapia.png';

const COUNTDOWN_SECONDS = 30;

// Detecta la plataforma y construye la URL embebible adecuada.
// Soporta Facebook y YouTube (live + videos). Para cualquier otro link,
// el panel debería usar modo "redirect" para abrir en nueva pestaña.
function toEmbedUrl(url: string): { embedUrl: string; supported: boolean } {
  // YouTube: watch?v=ID · live/ID · embed/ID · youtu.be/ID
  const ytMatch = url.match(
    /(?:youtube\.com\/(?:watch\?v=|embed\/|live\/|shorts\/)|youtu\.be\/)([a-zA-Z0-9_-]{11})/
  );
  if (ytMatch) {
    return {
      embedUrl: `https://www.youtube.com/embed/${ytMatch[1]}?autoplay=1`,
      supported: true,
    };
  }

  // Facebook (videos y directos de páginas públicas)
  if (url.includes('facebook.com') || url.includes('fb.watch')) {
    return {
      embedUrl: `https://www.facebook.com/plugins/video.php?href=${encodeURIComponent(url)}&show_text=false&width=720&height=405&autoplay=true`,
      supported: true,
    };
  }

  return { embedUrl: '', supported: false };
}

const Hero: React.FC = () => {
  const liveEvent  = useLiveEvent();
  const [showModal,  setShowModal]  = useState(false);
  // null = sin cuenta atrás · número = segundos restantes
  const [countdown, setCountdown]   = useState<number | null>(null);
  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null);

  const closeModal = () => {
    setShowModal(false);
    setCountdown(null);
    if (intervalRef.current) clearInterval(intervalRef.current);
  };

  // Cuando el evento se desactiva desde el panel y el modal está abierto,
  // arranca la cuenta atrás de COUNTDOWN_SECONDS segundos y luego cierra.
  useEffect(() => {
    if (!liveEvent.active && showModal && countdown === null) {
      setCountdown(COUNTDOWN_SECONDS);
      intervalRef.current = setInterval(() => {
        setCountdown(prev => {
          if (prev === null || prev <= 1) {
            if (intervalRef.current) clearInterval(intervalRef.current);
            setShowModal(false);
            return null;
          }
          return prev - 1;
        });
      }, 1000);
    }

    // Si vuelven a activar el evento antes de que termine, cancela el countdown
    if (liveEvent.active && countdown !== null) {
      setCountdown(null);
      if (intervalRef.current) clearInterval(intervalRef.current);
    }

    return () => {
      // Limpieza al desmontar
    };
  }, [liveEvent.active, showModal]); // eslint-disable-line react-hooks/exhaustive-deps

  // Limpia el intervalo al desmontar el componente
  useEffect(() => {
    return () => { if (intervalRef.current) clearInterval(intervalRef.current); };
  }, []);

  return (
    <>
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

            <div className="flex flex-col sm:flex-row gap-4">
              {/* Botón principal siempre visible */}
              <a
                href={BOOKING_URL}
                className="bg-blue-600 text-white px-8 py-4 rounded-xl font-bold text-lg shadow-xl shadow-blue-200 hover:bg-blue-700 transition-all transform hover:-translate-y-1 text-center inline-block"
              >
                Reservar Cita
              </a>

              {/* ================================================================
                  BOTÓN DE EVENTO EN VIVO (sorteos, transmisiones, clases)
                  ================================================================
                  Controlado desde el panel: módulo "Eventos" (solo TI).
                  Firestore: fisiosystem-8c492  →  config/liveEvent
                  Campos:
                    active      (boolean) — true muestra el botón, false lo oculta
                    facebookUrl (string)  — URL del directo (Facebook, YouTube, etc.)
                    title       (string)  — Texto del encabezado del modal
                    mode        ('embed' | 'redirect')
                                  embed    → abre modal con iframe (Facebook/YouTube)
                                  redirect → abre el link en nueva pestaña (TikTok, IG…)
                  Hook: src/hooks/useLiveEvent.ts
                  ================================================================ */}
              {liveEvent.active && liveEvent.mode === 'embed' && (
                <button
                  onClick={() => setShowModal(true)}
                  className="relative flex items-center justify-center gap-2 bg-red-600 hover:bg-red-700 text-white px-8 py-4 rounded-xl font-bold text-lg shadow-xl shadow-red-200 transition-all transform hover:-translate-y-1 overflow-hidden"
                >
                  {/* Pulso de fondo animado */}
                  <span className="absolute inset-0 rounded-xl bg-red-500 animate-ping opacity-30 pointer-events-none" />
                  <Radio size={20} className="flex-shrink-0" />
                  Ver evento en vivo
                </button>
              )}

              {liveEvent.active && liveEvent.mode === 'redirect' && liveEvent.facebookUrl && (
                <a
                  href={liveEvent.facebookUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="relative flex items-center justify-center gap-2 bg-red-600 hover:bg-red-700 text-white px-8 py-4 rounded-xl font-bold text-lg shadow-xl shadow-red-200 transition-all transform hover:-translate-y-1 overflow-hidden"
                >
                  {/* Pulso de fondo animado */}
                  <span className="absolute inset-0 rounded-xl bg-red-500 animate-ping opacity-30 pointer-events-none" />
                  <Radio size={20} className="flex-shrink-0 relative" />
                  <span className="relative">ESTAMOS EN VIVO</span>
                  <ExternalLink size={16} className="flex-shrink-0 relative opacity-80" />
                </a>
              )}
            </div>
          </div>
        </div>

        {/* Blob + Logo superpuesto */}
        <div className="absolute top-1/2 right-0 -translate-y-1/2 w-1/2 h-full hidden lg:flex items-center justify-center pointer-events-none">
          <div className="absolute inset-0 opacity-15">
            <svg viewBox="0 0 200 200" xmlns="http://www.w3.org/2000/svg">
              <path fill="#2563EB" d="M44.7,-76.4C58.3,-69.2,70.1,-57.4,78.2,-43.3C86.3,-29.2,90.7,-12.7,89.5,3.4C88.3,19.4,81.5,35,71.5,48.2C61.5,61.4,48.3,72.2,33.4,78.5C18.5,84.7,1.8,86.4,-15.6,83.4C-33,80.4,-51,72.7,-64.4,60.2C-77.8,47.7,-86.6,30.4,-89.8,12.3C-93,-5.8,-90.6,-24.8,-82,-41.2C-73.4,-57.6,-58.6,-71.4,-42.6,-77.4C-26.6,-83.4,-9.4,-81.6,4.6,-89.6C18.6,-97.6,44.7,-76.4,44.7,-76.4Z" transform="translate(100 100)" />
            </svg>
          </div>
          <img
            src={logoFisioterapia}
            alt="Fisioterapia Chepén"
            className="relative z-10"
            style={{ width: '800px', height: '800px', objectFit: 'contain' }}
          />
        </div>
      </div>

      {/* ── Modal del en vivo ─────────────────────────────────────────────────── */}
      {showModal && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-sm"
          onClick={closeModal}
        >
          <div
            className="relative bg-white rounded-2xl shadow-2xl w-full max-w-2xl overflow-hidden"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Banner de cuenta atrás — aparece cuando el admin desactiva el evento */}
            {countdown !== null && (
              <div className="flex items-center justify-center gap-2 bg-amber-500 text-white px-6 py-2.5 text-sm font-semibold">
                <Clock size={15} className="shrink-0" />
                <span>El evento ha finalizado. Este modal se cerrará en</span>
                <span className="bg-white text-amber-600 font-bold rounded-full px-2 py-0.5 text-xs tabular-nums min-w-[28px] text-center">
                  {countdown}s
                </span>
              </div>
            )}

            {/* Cabecera */}
            <div className="flex items-center justify-between bg-red-600 px-6 py-4">
              <div className="flex items-center gap-3 text-white">
                <span className="relative flex h-3 w-3">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-white opacity-75" />
                  <span className="relative inline-flex rounded-full h-3 w-3 bg-white" />
                </span>
                <span className="font-bold text-lg uppercase tracking-wide">
                  {liveEvent.title || 'En Vivo'}
                </span>
              </div>
              <button
                onClick={closeModal}
                className="text-white/80 hover:text-white transition-colors p-1 rounded-full hover:bg-white/20"
              >
                <X size={22} />
              </button>
            </div>

            {/* Embed multiplataforma (Facebook / YouTube) */}
            <div className="w-full bg-black" style={{ aspectRatio: '16/9' }}>
              {(() => {
                if (!liveEvent.facebookUrl) {
                  return (
                    <div className="w-full h-full flex items-center justify-center text-white/50 text-sm min-h-[300px]">
                      Cargando transmisión...
                    </div>
                  );
                }
                const { embedUrl, supported } = toEmbedUrl(liveEvent.facebookUrl);
                if (!supported) {
                  return (
                    <div className="w-full h-full flex flex-col items-center justify-center text-white/80 gap-3 px-6 text-center min-h-[300px]">
                      <p className="text-sm">Esta plataforma no permite embed.</p>
                      <a
                        href={liveEvent.facebookUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-2 bg-red-600 hover:bg-red-700 text-white px-5 py-2.5 rounded-lg font-semibold text-sm"
                      >
                        Abrir transmisión <ExternalLink size={14} />
                      </a>
                    </div>
                  );
                }
                return (
                  <iframe
                    src={embedUrl}
                    className="w-full h-full"
                    style={{ border: 'none', minHeight: '405px' }}
                    allow="autoplay; clipboard-write; encrypted-media; picture-in-picture; web-share"
                    allowFullScreen
                    title="En Vivo — Fisioterapi Chepén"
                  />
                );
              })()}
            </div>

            {/* Footer */}
            <div className="px-6 py-3 bg-slate-50 text-center text-xs text-slate-400">
              Transmisión en vivo · Fisioterapi Chepén
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default Hero;
