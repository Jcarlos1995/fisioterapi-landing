import React from 'react';
import { X, ShieldCheck, FileText, Cookie } from 'lucide-react';

export type LegalType = 'privacidad' | 'terminos' | 'cookies';

interface LegalModalProps {
  isOpen: boolean;
  onClose: () => void;
  type: LegalType;
}

// ─── Contenido de cada documento ─────────────────────────────────────────────

const PRIVACIDAD = (
  <div className="space-y-6 text-slate-600 text-sm leading-relaxed">
    <p>
      En <strong className="text-slate-800">Fisioterapi Chepén</strong>, nos comprometemos a proteger tu privacidad y
      a tratar tus datos personales con la máxima responsabilidad, conforme a la{' '}
      <strong>Ley N.° 29733 – Ley de Protección de Datos Personales</strong> del Perú y su Reglamento (D.S. 003-2013-JUS).
    </p>

    <section>
      <h3 className="font-bold text-slate-800 text-base mb-2">1. Responsable del tratamiento</h3>
      <p>
        <strong>Fisioterapi Chepén</strong> — Av. Manuel Seoane 259, Chepén, La Libertad, Perú.<br />
        Contacto: <a href="mailto:Silviakarinafuentesromero3@gmail.com" className="text-blue-600 hover:underline">Silviakarinafuentesromero3@gmail.com</a>
      </p>
    </section>

    <section>
      <h3 className="font-bold text-slate-800 text-base mb-2">2. Datos que recopilamos</h3>
      <ul className="list-disc pl-5 space-y-1">
        <li>Nombre y apellidos</li>
        <li>DNI o documento de identidad</li>
        <li>Número de teléfono / WhatsApp</li>
        <li>Correo electrónico</li>
        <li>Edad y datos de salud necesarios para el tratamiento fisioterapéutico</li>
        <li>Fecha y hora de las citas agendadas</li>
      </ul>
    </section>

    <section>
      <h3 className="font-bold text-slate-800 text-base mb-2">3. Finalidad del tratamiento</h3>
      <ul className="list-disc pl-5 space-y-1">
        <li>Gestionar y confirmar tus citas de fisioterapia</li>
        <li>Llevar un historial clínico básico para seguimiento de tu tratamiento</li>
        <li>Comunicarnos contigo por WhatsApp o correo sobre tu atención</li>
        <li>Mejorar nuestros servicios a través de testimonios (siempre con tu consentimiento explícito)</li>
      </ul>
    </section>

    <section>
      <h3 className="font-bold text-slate-800 text-base mb-2">4. Base legal</h3>
      <p>
        El tratamiento de tus datos se basa en el <strong>consentimiento</strong> que otorgas al completar el
        formulario de cita y, en el caso de datos de salud, en la necesidad de prestación del servicio médico.
      </p>
    </section>

    <section>
      <h3 className="font-bold text-slate-800 text-base mb-2">5. Conservación de datos</h3>
      <p>
        Conservamos tus datos mientras mantengas una relación activa con la clínica o hasta que solicites su eliminación.
        Los datos de salud se conservan conforme a la normativa sanitaria vigente.
      </p>
    </section>

    <section>
      <h3 className="font-bold text-slate-800 text-base mb-2">6. Tus derechos</h3>
      <p>Puedes ejercer en cualquier momento tus derechos de:</p>
      <ul className="list-disc pl-5 space-y-1">
        <li><strong>Acceso</strong> — conocer qué datos tenemos sobre ti</li>
        <li><strong>Rectificación</strong> — corregir datos inexactos</li>
        <li><strong>Cancelación</strong> — solicitar la eliminación de tus datos</li>
        <li><strong>Oposición</strong> — oponerte a determinados tratamientos</li>
      </ul>
      <p className="mt-2">
        Para ejercer estos derechos, escríbenos a{' '}
        <a href="mailto:Silviakarinafuentesromero3@gmail.com" className="text-blue-600 hover:underline">
          Silviakarinafuentesromero3@gmail.com
        </a>
      </p>
    </section>

    <section>
      <h3 className="font-bold text-slate-800 text-base mb-2">7. Seguridad</h3>
      <p>
        Utilizamos <strong>Firebase (Google Cloud)</strong> para el almacenamiento de datos, que garantiza
        cifrado en tránsito (TLS) y en reposo, y cumple con los estándares internacionales de seguridad (ISO 27001, SOC 2).
      </p>
    </section>

    <p className="text-xs text-slate-400 border-t border-slate-100 pt-4">
      Última actualización: Abril 2026. Nos reservamos el derecho de actualizar esta política. Los cambios significativos
      serán notificados a través de nuestra página web.
    </p>
  </div>
);

const TERMINOS = (
  <div className="space-y-6 text-slate-600 text-sm leading-relaxed">
    <p>
      Al utilizar los servicios de <strong className="text-slate-800">Fisioterapi Chepén</strong> — ya sea de forma
      presencial o a través de nuestra plataforma web — aceptas los presentes Términos y Condiciones.
      Te pedimos que los leas detenidamente.
    </p>

    <section>
      <h3 className="font-bold text-slate-800 text-base mb-2">1. Identificación del prestador</h3>
      <p>
        <strong>Fisioterapi Chepén</strong> — Av. Manuel Seoane 259, Chepén, La Libertad, Perú.<br />
        Teléfono: +51 926 798 464 | Email: <a href="mailto:Silviakarinafuentesromero3@gmail.com" className="text-blue-600 hover:underline">Silviakarinafuentesromero3@gmail.com</a>
      </p>
    </section>

    <section>
      <h3 className="font-bold text-slate-800 text-base mb-2">2. Servicios ofrecidos</h3>
      <p>Fisioterapi Chepén ofrece servicios de:</p>
      <ul className="list-disc pl-5 space-y-1">
        <li>Fisioterapia y rehabilitación física</li>
        <li>Quiropráctica</li>
        <li>Masajes terapéuticos</li>
        <li>Medicina general y terapias de temporada</li>
        <li>Agendamiento de citas en línea</li>
      </ul>
    </section>

    <section>
      <h3 className="font-bold text-slate-800 text-base mb-2">3. Agendamiento de citas</h3>
      <ul className="list-disc pl-5 space-y-1">
        <li>Las citas pueden reservarse a través de nuestra plataforma web o de forma presencial.</li>
        <li>El agendamiento en línea tiene carácter de <strong>solicitud</strong>; será confirmado por el equipo de la clínica.</li>
        <li>Se recomienda llegar con 10 minutos de anticipación.</li>
        <li>Las citas no presentadas sin aviso previo (no-show) podrán ser reasignadas a otros pacientes.</li>
        <li>Para cancelar o reprogramar, comunícate con al menos <strong>24 horas de anticipación</strong>.</li>
      </ul>
    </section>

    <section>
      <h3 className="font-bold text-slate-800 text-base mb-2">4. Responsabilidad del paciente</h3>
      <ul className="list-disc pl-5 space-y-1">
        <li>Proporcionar información veraz sobre su estado de salud y antecedentes médicos.</li>
        <li>Seguir las indicaciones del profesional tratante.</li>
        <li>Informar de inmediato cualquier reacción adversa al tratamiento.</li>
      </ul>
    </section>

    <section>
      <h3 className="font-bold text-slate-800 text-base mb-2">5. Limitación de responsabilidad</h3>
      <p>
        Fisioterapi Chepén no se responsabiliza por resultados adversos derivados de información incorrecta
        proporcionada por el paciente, ni por el incumplimiento de las indicaciones terapéuticas prescritas.
        Los tratamientos fisioterapéuticos son procesos que requieren constancia y pueden variar según cada paciente.
      </p>
    </section>

    <section>
      <h3 className="font-bold text-slate-800 text-base mb-2">6. Propiedad intelectual</h3>
      <p>
        Todos los contenidos de este sitio web (textos, imágenes, logotipo, diseño) son propiedad de
        Fisioterapi Chepén y están protegidos por las leyes de propiedad intelectual aplicables. Queda
        prohibida su reproducción parcial o total sin autorización expresa.
      </p>
    </section>

    <section>
      <h3 className="font-bold text-slate-800 text-base mb-2">7. Ley aplicable</h3>
      <p>
        Estos términos se rigen por la legislación peruana vigente. Cualquier controversia será sometida
        a los tribunales competentes de la ciudad de Chepén, La Libertad, Perú.
      </p>
    </section>

    <p className="text-xs text-slate-400 border-t border-slate-100 pt-4">
      Última actualización: Abril 2026. Fisioterapi Chepén se reserva el derecho de modificar estos términos
      en cualquier momento, publicando la versión actualizada en esta misma plataforma.
    </p>
  </div>
);

const COOKIES = (
  <div className="space-y-6 text-slate-600 text-sm leading-relaxed">
    <p>
      Esta Política de Cookies explica qué son las cookies, cómo las utiliza{' '}
      <strong className="text-slate-800">Fisioterapi Chepén</strong> y cuáles son tus opciones respecto a ellas.
    </p>

    <section>
      <h3 className="font-bold text-slate-800 text-base mb-2">1. ¿Qué son las cookies?</h3>
      <p>
        Las cookies son pequeños archivos de texto que los sitios web guardan en tu navegador
        cuando los visitas. Permiten que el sitio recuerde tus acciones y preferencias durante
        un período de tiempo, para que no tengas que volver a configurarlas cada vez que visites la página.
      </p>
    </section>

    <section>
      <h3 className="font-bold text-slate-800 text-base mb-2">2. Cookies que utilizamos</h3>
      <div className="space-y-3">
        <div className="bg-slate-50 p-4 rounded-xl border border-slate-100">
          <p className="font-semibold text-slate-700 mb-1">🔒 Cookies estrictamente necesarias</p>
          <p>
            Imprescindibles para el funcionamiento básico del sitio. Por ejemplo, las que mantienen
            tu sesión activa si accedes al portal médico. <strong>No se pueden desactivar.</strong>
          </p>
        </div>
        <div className="bg-slate-50 p-4 rounded-xl border border-slate-100">
          <p className="font-semibold text-slate-700 mb-1">📊 Cookies de análisis (Firebase Analytics)</p>
          <p>
            Utilizamos <strong>Firebase Analytics</strong> (Google) para entender cómo los usuarios
            navegan por nuestra web: páginas visitadas, tiempo de permanencia y origen del tráfico.
            Esta información es anónima y agregada. Nos ayuda a mejorar la experiencia del usuario.
          </p>
        </div>
        <div className="bg-slate-50 p-4 rounded-xl border border-slate-100">
          <p className="font-semibold text-slate-700 mb-1">🌐 Cookies de terceros (Google Fonts)</p>
          <p>
            Usamos Google Fonts para cargar la tipografía del sitio. Google puede establecer cookies
            propias al servir estos recursos. Puedes consultar la{' '}
            <a
              href="https://policies.google.com/privacy"
              target="_blank"
              rel="noopener noreferrer"
              className="text-blue-600 hover:underline"
            >
              Política de Privacidad de Google
            </a>
            .
          </p>
        </div>
      </div>
    </section>

    <section>
      <h3 className="font-bold text-slate-800 text-base mb-2">3. ¿Cómo controlar las cookies?</h3>
      <p>
        Puedes configurar tu navegador para rechazar o eliminar cookies en cualquier momento.
        Ten en cuenta que deshabilitar ciertas cookies puede afectar el funcionamiento del sitio.
        A continuación, los enlaces de configuración de los navegadores más populares:
      </p>
      <ul className="list-disc pl-5 mt-2 space-y-1">
        <li><a href="https://support.google.com/chrome/answer/95647" target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline">Google Chrome</a></li>
        <li><a href="https://support.mozilla.org/es/kb/habilitar-y-deshabilitar-cookies-sitios-web-rastrear-preferencias" target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline">Mozilla Firefox</a></li>
        <li><a href="https://support.apple.com/es-es/guide/safari/sfri11471/mac" target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline">Apple Safari</a></li>
        <li><a href="https://support.microsoft.com/es-es/windows/eliminar-y-administrar-cookies-168dab11-0753-043d-7c16-ede5947fc64d" target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline">Microsoft Edge</a></li>
      </ul>
    </section>

    <section>
      <h3 className="font-bold text-slate-800 text-base mb-2">4. Actualizaciones</h3>
      <p>
        Podemos actualizar esta política para reflejar cambios en las cookies que utilizamos.
        Te recomendamos revisar esta página periódicamente.
      </p>
    </section>

    <p className="text-xs text-slate-400 border-t border-slate-100 pt-4">
      Última actualización: Abril 2026.
    </p>
  </div>
);

// ─── Configuración de cada tipo ───────────────────────────────────────────────

const LEGAL_CONFIG: Record<
  LegalType,
  { title: string; subtitle: string; icon: React.ReactNode; content: React.ReactNode }
> = {
  privacidad: {
    title: 'Política de Privacidad',
    subtitle: 'Cómo tratamos y protegemos tus datos personales',
    icon: <ShieldCheck size={22} />,
    content: PRIVACIDAD,
  },
  terminos: {
    title: 'Términos y Condiciones',
    subtitle: 'Condiciones de uso de nuestros servicios',
    icon: <FileText size={22} />,
    content: TERMINOS,
  },
  cookies: {
    title: 'Política de Cookies',
    subtitle: 'Información sobre el uso de cookies en este sitio',
    icon: <Cookie size={22} />,
    content: COOKIES,
  },
};

// ─── Componente principal ─────────────────────────────────────────────────────

const LegalModal: React.FC<LegalModalProps> = ({ isOpen, onClose, type }) => {
  React.useEffect(() => {
    if (!isOpen) return;
    const handler = (e: KeyboardEvent) => { if (e.key === 'Escape') onClose(); };
    document.addEventListener('keydown', handler);
    return () => document.removeEventListener('keydown', handler);
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const { title, subtitle, icon, content } = LEGAL_CONFIG[type];

  return (
    <div
      className="fixed inset-0 z-[200] flex items-center justify-center p-4"
    >
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-slate-900/70 backdrop-blur-sm"
        onClick={onClose}
      />

      {/* Panel del modal */}
      <div className="relative bg-white w-full max-w-2xl rounded-3xl shadow-2xl flex flex-col max-h-[90vh] overflow-hidden">

        {/* Cabecera */}
        <div className="bg-slate-800 px-8 py-6 text-white flex-shrink-0">
          <div className="flex items-start justify-between gap-4">
            <div className="flex items-center gap-3">
              <div className="bg-white/10 p-2.5 rounded-xl">
                {icon}
              </div>
              <div>
                <h2 className="text-xl font-bold leading-tight">{title}</h2>
                <p className="text-white/60 text-xs mt-0.5">{subtitle}</p>
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

        {/* Footer del modal */}
        <div className="flex-shrink-0 px-8 py-4 border-t border-slate-100 bg-slate-50 flex justify-end">
          <button
            onClick={onClose}
            className="bg-slate-800 text-white px-6 py-2.5 rounded-xl font-semibold text-sm hover:bg-slate-900 transition-all active:scale-95"
          >
            Entendido
          </button>
        </div>
      </div>
    </div>
  );
};

export default LegalModal;
