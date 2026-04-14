import React from 'react';
import { X, HeartPulse, Users, Dumbbell, Brain, Stethoscope, Sparkles, MapPin, Phone, Mail, Clock } from 'lucide-react';

export type InfoType = 'sobre-nosotros' | 'servicios' | 'contacto';

interface InfoModalProps {
  isOpen: boolean;
  onClose: () => void;
  type: InfoType;
}

// ─── Sobre Nosotros ───────────────────────────────────────────────────────────

const SOBRE_NOSOTROS = (
  <div className="space-y-8 text-slate-600 text-sm leading-relaxed">

    {/* Quiénes somos */}
    <section className="flex flex-col gap-3">
      <div className="flex items-center gap-2">
        <div className="w-1 h-6 bg-blue-600 rounded-full" />
        <h3 className="font-bold text-slate-800 text-base">¿Quiénes somos?</h3>
      </div>
      <p>
        <strong className="text-slate-800">Fisioterapi Chepén</strong> es una clínica especializada en
        rehabilitación física y bienestar integral ubicada en el corazón de Chepén, La Libertad, Perú.
        Desde nuestros inicios, nos hemos dedicado a brindar atención de alta calidad, combinando técnicas
        modernas de fisioterapia con un trato cálido y personalizado.
      </p>
      <p>
        Nuestro equipo está conformado por profesionales certificados en fisioterapia, quiropráctica y
        medicina general, comprometidos con devolver la movilidad, reducir el dolor y mejorar la calidad
        de vida de cada paciente.
      </p>
    </section>

    {/* Misión y Visión */}
    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
      <div className="bg-blue-50 rounded-2xl p-5 border border-blue-100">
        <div className="flex items-center gap-2 mb-3">
          <HeartPulse size={18} className="text-blue-600" />
          <h3 className="font-bold text-slate-800 text-sm">Nuestra Misión</h3>
        </div>
        <p className="text-xs leading-relaxed">
          Brindar atención fisioterapéutica integral, personalizada y con los más altos estándares de
          calidad, contribuyendo a la recuperación y bienestar de nuestros pacientes de manera ética,
          humana y profesional.
        </p>
      </div>
      <div className="bg-slate-50 rounded-2xl p-5 border border-slate-100">
        <div className="flex items-center gap-2 mb-3">
          <Sparkles size={18} className="text-slate-600" />
          <h3 className="font-bold text-slate-800 text-sm">Nuestra Visión</h3>
        </div>
        <p className="text-xs leading-relaxed">
          Ser la clínica de rehabilitación física de referencia en la provincia de Chepén y la región
          norte del Perú, reconocida por la excelencia clínica, innovación tecnológica y el impacto
          positivo en la salud de nuestra comunidad.
        </p>
      </div>
    </div>

    {/* Valores */}
    <section className="flex flex-col gap-3">
      <div className="flex items-center gap-2">
        <div className="w-1 h-6 bg-blue-600 rounded-full" />
        <h3 className="font-bold text-slate-800 text-base">Nuestros Valores</h3>
      </div>
      <ul className="grid grid-cols-1 sm:grid-cols-2 gap-2">
        {[
          { icon: '🤝', label: 'Compromiso', desc: 'Con la salud y bienestar de cada paciente.' },
          { icon: '🎯', label: 'Excelencia', desc: 'Técnicas actualizadas y mejora continua.' },
          { icon: '💙', label: 'Empatía', desc: 'Trato humano, cálido y personalizado.' },
          { icon: '🔬', label: 'Innovación', desc: 'Herramientas y tecnología de vanguardia.' },
          { icon: '🛡️', label: 'Ética', desc: 'Transparencia y responsabilidad profesional.' },
          { icon: '🌱', label: 'Bienestar integral', desc: 'Cuerpo y mente en equilibrio.' },
        ].map(v => (
          <li key={v.label} className="flex items-start gap-3 bg-white border border-slate-100 rounded-xl p-3">
            <span className="text-lg mt-0.5">{v.icon}</span>
            <div>
              <p className="font-semibold text-slate-700 text-xs">{v.label}</p>
              <p className="text-slate-500 text-xs">{v.desc}</p>
            </div>
          </li>
        ))}
      </ul>
    </section>

    {/* Datos de contacto / ubicación */}
    <section className="bg-slate-800 rounded-2xl p-6 text-white flex flex-col gap-3">
      <h3 className="font-bold text-sm mb-1">Encuéntranos</h3>
      <div className="flex items-start gap-3 text-slate-300 text-xs">
        <MapPin size={15} className="text-blue-400 flex-shrink-0 mt-0.5" />
        <span>Av. Manuel Seoane 259, Chepén, La Libertad, Perú</span>
      </div>
      <div className="flex items-center gap-3 text-slate-300 text-xs">
        <Phone size={15} className="text-blue-400 flex-shrink-0" />
        <span>+51 926 798 464</span>
      </div>
      <div className="flex items-center gap-3 text-slate-300 text-xs">
        <Mail size={15} className="text-blue-400 flex-shrink-0" />
        <span>Silviakarinafuentesromero3@gmail.com</span>
      </div>
      <div className="flex items-start gap-3 text-slate-300 text-xs">
        <Clock size={15} className="text-blue-400 flex-shrink-0 mt-0.5" />
        <span>Lunes a Sábado: 8:00 am – 7:00 pm</span>
      </div>
    </section>
  </div>
);

// ─── Servicios ────────────────────────────────────────────────────────────────

const SERVICIOS_LIST = [
  {
    icon: <HeartPulse size={22} className="text-blue-600" />,
    bg: 'bg-blue-50',
    border: 'border-blue-100',
    title: 'Fisioterapia y Rehabilitación Física',
    desc: 'Evaluación y tratamiento de lesiones musculoesqueléticas, recuperación post-quirúrgica, manejo del dolor crónico y agudo, y ejercicio terapéutico personalizado.',
    tags: ['Lesiones deportivas', 'Post-operatorio', 'Dolor lumbar', 'Contracturas'],
  },
  {
    icon: <Dumbbell size={22} className="text-indigo-600" />,
    bg: 'bg-indigo-50',
    border: 'border-indigo-100',
    title: 'Quiropráctica',
    desc: 'Tratamiento especializado de la columna vertebral y el sistema nervioso mediante ajustes quiroprácticos, mejorando la movilidad y aliviando dolencias neuromusculoesqueléticas.',
    tags: ['Alineación columna', 'Ciática', 'Cervicalgia', 'Hernia discal'],
  },
  {
    icon: <Sparkles size={22} className="text-purple-600" />,
    bg: 'bg-purple-50',
    border: 'border-purple-100',
    title: 'Masajes Terapéuticos',
    desc: 'Técnicas manuales especializadas para aliviar la tensión muscular, mejorar la circulación, reducir el estrés y acelerar la recuperación de tejidos.',
    tags: ['Masaje descontracturante', 'Drenaje linfático', 'Relajación', 'Recuperación muscular'],
  },
  {
    icon: <Stethoscope size={22} className="text-green-600" />,
    bg: 'bg-green-50',
    border: 'border-green-100',
    title: 'Medicina General',
    desc: 'Atención médica general y evaluación clínica integral, orientada a la prevención y diagnóstico de condiciones que puedan complementarse con el tratamiento fisioterapéutico.',
    tags: ['Consulta general', 'Prevención', 'Diagnóstico', 'Derivación especializada'],
  },
  {
    icon: <Brain size={22} className="text-orange-500" />,
    bg: 'bg-orange-50',
    border: 'border-orange-100',
    title: 'Terapias de Temporada',
    desc: 'Tratamientos especializados adaptados a necesidades estacionales y condiciones específicas, incluyendo electroterapia, ultrasonido terapéutico y termoterapia.',
    tags: ['Electroterapia', 'Ultrasonido', 'Termoterapia', 'TENS'],
  },
  {
    icon: <Users size={22} className="text-teal-600" />,
    bg: 'bg-teal-50',
    border: 'border-teal-100',
    title: 'Atención Neurológica y Post-ACV',
    desc: 'Rehabilitación especializada para pacientes con condiciones neurológicas, secuelas de ACV, parálisis y recuperación de movilidad funcional.',
    tags: ['Post-ACV', 'Paraplejia', 'Parálisis facial', 'Rehabilitación neurológica'],
  },
];

const SERVICIOS = (
  <div className="space-y-4">
    <p className="text-slate-500 text-sm leading-relaxed">
      En <strong className="text-slate-700">Fisioterapi Chepén</strong> ofrecemos una amplia gama de
      tratamientos especializados adaptados a las necesidades de cada paciente.
    </p>
    <div className="grid grid-cols-1 gap-4">
      {SERVICIOS_LIST.map((s) => (
        <div
          key={s.title}
          className={`${s.bg} border ${s.border} rounded-2xl p-5 flex flex-col gap-3`}
        >
          <div className="flex items-start gap-3">
            <div className="mt-0.5 flex-shrink-0">{s.icon}</div>
            <div className="flex-1">
              <h3 className="font-bold text-slate-800 text-sm mb-1">{s.title}</h3>
              <p className="text-slate-600 text-xs leading-relaxed">{s.desc}</p>
            </div>
          </div>
          <div className="flex flex-wrap gap-1.5">
            {s.tags.map((tag) => (
              <span
                key={tag}
                className="bg-white/70 text-slate-600 text-[11px] font-medium px-2.5 py-1 rounded-full border border-white/80"
              >
                {tag}
              </span>
            ))}
          </div>
        </div>
      ))}
    </div>
    <div className="bg-blue-600 rounded-2xl p-5 text-white text-center">
      <p className="font-bold text-sm mb-1">¿Necesitas un servicio específico?</p>
      <p className="text-white/80 text-xs mb-3">
        Contáctanos y nuestro equipo te orientará sobre el tratamiento más adecuado para ti.
      </p>
      <a
        href="https://fisiosystem-8c492.web.app/#/agendar"
        className="inline-block bg-white text-blue-600 font-bold text-xs px-5 py-2.5 rounded-full hover:bg-blue-50 transition-all active:scale-95"
      >
        Agendar Consulta
      </a>
    </div>
  </div>
);

// ─── Contacto ─────────────────────────────────────────────────────────────────

const CONTACTO = (
  <div className="space-y-6 text-slate-600 text-sm leading-relaxed">

    <p>
      Estamos aquí para ayudarte. Escríbenos, llámanos o visítanos directamente en nuestra clínica
      en Chepén.
    </p>

    {/* Tarjetas de contacto */}
    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
      <div className="bg-blue-50 border border-blue-100 rounded-2xl p-5 flex flex-col gap-2">
        <div className="flex items-center gap-2 mb-1">
          <Phone size={18} className="text-blue-600" />
          <h3 className="font-bold text-slate-800 text-sm">Teléfono / WhatsApp</h3>
        </div>
        <a
          href="tel:+51926798464"
          className="text-blue-600 font-semibold hover:underline"
        >
          +51 926 798 464
        </a>
        <p className="text-xs text-slate-500">Disponible Lun–Sáb, 8:00 am – 7:00 pm</p>
      </div>

      <div className="bg-slate-50 border border-slate-100 rounded-2xl p-5 flex flex-col gap-2">
        <div className="flex items-center gap-2 mb-1">
          <Mail size={18} className="text-slate-600" />
          <h3 className="font-bold text-slate-800 text-sm">Correo electrónico</h3>
        </div>
        <a
          href="mailto:Silviakarinafuentesromero3@gmail.com"
          className="text-blue-600 text-xs font-medium hover:underline break-all"
        >
          Silviakarinafuentesromero3@gmail.com
        </a>
        <p className="text-xs text-slate-500">Respondemos en menos de 24 horas</p>
      </div>

      <div className="bg-slate-50 border border-slate-100 rounded-2xl p-5 flex flex-col gap-2 sm:col-span-2">
        <div className="flex items-center gap-2 mb-1">
          <MapPin size={18} className="text-slate-600" />
          <h3 className="font-bold text-slate-800 text-sm">Dirección</h3>
        </div>
        <p className="font-medium text-slate-700">Av. Manuel Seoane 259, Chepén, La Libertad, Perú</p>
        <a
          href="https://maps.google.com/?q=Av.+Manuel+Seoane+259+Chepen+Peru"
          target="_blank"
          rel="noopener noreferrer"
          className="text-blue-600 text-xs font-medium hover:underline inline-flex items-center gap-1 mt-1"
        >
          <MapPin size={12} /> Ver en Google Maps
        </a>
      </div>

      <div className="bg-slate-50 border border-slate-100 rounded-2xl p-5 flex flex-col gap-2 sm:col-span-2">
        <div className="flex items-center gap-2 mb-1">
          <Clock size={18} className="text-slate-600" />
          <h3 className="font-bold text-slate-800 text-sm">Horario de atención</h3>
        </div>
        <div className="grid grid-cols-2 gap-x-6 gap-y-1 text-xs text-slate-600">
          {[
            { day: 'Lunes', hours: '8:00 am – 7:00 pm' },
            { day: 'Martes', hours: '8:00 am – 7:00 pm' },
            { day: 'Miércoles', hours: '8:00 am – 7:00 pm' },
            { day: 'Jueves', hours: '8:00 am – 7:00 pm' },
            { day: 'Viernes', hours: '8:00 am – 7:00 pm' },
            { day: 'Sábado', hours: '8:00 am – 1:00 pm' },
            { day: 'Domingo', hours: 'Cerrado' },
          ].map(({ day, hours }) => (
            <div key={day} className="flex justify-between gap-2 py-0.5 border-b border-slate-100 last:border-0 col-span-2 sm:col-span-1">
              <span className="font-medium text-slate-700">{day}</span>
              <span className={hours === 'Cerrado' ? 'text-red-400 font-medium' : ''}>{hours}</span>
            </div>
          ))}
        </div>
      </div>
    </div>

    {/* CTA Agendar */}
    <div className="bg-blue-600 rounded-2xl p-6 text-white text-center">
      <p className="font-bold text-base mb-1">¿Listo para mejorar tu calidad de vida?</p>
      <p className="text-white/75 text-xs mb-4">
        Reserva tu cita en línea en menos de 2 minutos, sin llamadas ni filas.
      </p>
      <a
        href="https://fisiosystem-8c492.web.app/#/agendar"
        className="inline-block bg-white text-blue-600 font-bold text-sm px-8 py-3 rounded-full hover:bg-blue-50 transition-all shadow-lg hover:-translate-y-0.5 active:scale-95"
      >
        Agendar mi Cita Ahora
      </a>
    </div>
  </div>
);

// ─── Configuración ────────────────────────────────────────────────────────────

const INFO_CONFIG: Record<
  InfoType,
  { title: string; subtitle: string; icon: React.ReactNode; content: React.ReactNode }
> = {
  'sobre-nosotros': {
    title: 'Sobre Nosotros',
    subtitle: 'Conoce nuestra historia, misión y valores',
    icon: <Users size={22} />,
    content: SOBRE_NOSOTROS,
  },
  servicios: {
    title: 'Servicios de Fisioterapia',
    subtitle: 'Todo lo que ofrecemos para tu salud y bienestar',
    icon: <HeartPulse size={22} />,
    content: SERVICIOS,
  },
  contacto: {
    title: 'Contáctanos',
    subtitle: 'Estamos listos para atenderte',
    icon: <Phone size={22} />,
    content: CONTACTO,
  },
};

// ─── Componente ───────────────────────────────────────────────────────────────

const InfoModal: React.FC<InfoModalProps> = ({ isOpen, onClose, type }) => {
  if (!isOpen) return null;

  const { title, subtitle, icon, content } = INFO_CONFIG[type];

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Escape') onClose();
  };

  return (
    <div
      className="fixed inset-0 z-[200] flex items-center justify-center p-4"
      onKeyDown={handleKeyDown}
    >
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-slate-900/70 backdrop-blur-sm"
        onClick={onClose}
      />

      {/* Panel */}
      <div className="relative bg-white w-full max-w-2xl rounded-3xl shadow-2xl flex flex-col max-h-[90vh] overflow-hidden">

        {/* Cabecera */}
        <div className="bg-blue-600 px-8 py-6 text-white flex-shrink-0">
          <div className="flex items-start justify-between gap-4">
            <div className="flex items-center gap-3">
              <div className="bg-white/15 p-2.5 rounded-xl">
                {icon}
              </div>
              <div>
                <h2 className="text-xl font-bold leading-tight">{title}</h2>
                <p className="text-white/70 text-xs mt-0.5">{subtitle}</p>
              </div>
            </div>
            <button
              onClick={onClose}
              className="text-white/60 hover:text-white transition-colors p-1 mt-0.5 flex-shrink-0"
              aria-label="Cerrar"
            >
              <X size={22} />
            </button>
          </div>
        </div>

        {/* Contenido con scroll */}
        <div className="overflow-y-auto px-8 py-7 flex-1">
          {content}
        </div>

        {/* Footer */}
        <div className="flex-shrink-0 px-8 py-4 border-t border-slate-100 bg-slate-50 flex justify-end">
          <button
            onClick={onClose}
            className="bg-blue-600 text-white px-6 py-2.5 rounded-xl font-semibold text-sm hover:bg-blue-700 transition-all active:scale-95"
          >
            Cerrar
          </button>
        </div>
      </div>
    </div>
  );
};

export default InfoModal;
