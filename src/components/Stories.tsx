import React, { useState, useEffect, useRef } from 'react';
import { dbSistema } from '../firebaseSistema';
import { collection, getDocs, query } from 'firebase/firestore';
import { HeartPulse, Loader2, Calendar, ChevronLeft, ChevronRight } from 'lucide-react';

interface ClinicStory {
  id?: string;
  patientName: string;
  diagnosis: string;
  testimony: string;
  displayDate: string;
  imageUrl?: string;
}

// Placeholder Base64 mínimo (1x1 gris) para historias fijas — no depende de archivos
const FALLBACK_IMAGE_PLACEHOLDER = 'data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSI0MDAiIGhlaWdodD0iMzAwIiB2aWV3Qm94PSIwIDAgNDAwIDMwMCI+PHJlY3Qgd2lkdGg9IjEwMCUiIGhlaWdodD0iMTAwJSIgZmlsbD0iI2YxZjVmOSIvPjx0ZXh0IHg9IjUwJSIgeT0iNTAlIiBkb21pbmFudC1iYXNlbGluZT0ibWlkZGxlIiB0ZXh0LWFuY2hvcj0ibWlkZGxlIiBmaWxsPSIjOTRhM2JmIiBmb250LWZhbWlseT0ic2Fucy1zZXJpZiIgZm9udC1zaXplPSIxNCI+U2luIGltYWdlbjwvdGV4dD48L3N2Zz4=';

// Historias FIJAS cuando Firestore está vacío o falla la carga (siempre disponibles, sin archivos)
const DEFAULT_STORIES: ClinicStory[] = [
  {
    id: 'fallback-1',
    patientName: 'Juan Celiz',
    diagnosis: 'Recuperación tras paraplejia por hernia dorsal',
    testimony: 'Recuperé el 100% de movilidad gracias al equipo de Fisioterapia Chepén. Un proceso largo pero con resultados que superaron mis expectativas.',
    displayDate: '2024-08',
    imageUrl: FALLBACK_IMAGE_PLACEHOLDER,
  },
  {
    id: 'fallback-2',
    patientName: 'Segundo Vasquez',
    diagnosis: 'Recuperación post ACV',
    testimony: 'En dos meses recuperé alrededor del 90% de mi movilidad después del ACV. El trato profesional y el plan de rehabilitación marcaron la diferencia.',
    displayDate: '2024-06',
    imageUrl: FALLBACK_IMAGE_PLACEHOLDER,
  },
];

const Stories: React.FC = () => {
  const [stories, setStories] = useState<ClinicStory[]>([]);
  const [loading, setLoading] = useState(true);
  const scrollRef = useRef<HTMLDivElement>(null); // Referencia para el scroll

  useEffect(() => {
    const fetchStories = async () => {
      try {
        const q = query(collection(dbSistema, 'stories'));
        const querySnapshot = await getDocs(q);
        const data = querySnapshot.docs.map(doc => {
          const item = doc.data();
          return { ...item, id: doc.id } as ClinicStory;
        });
        // Si Firebase devuelve historias, las usamos; si no, mostramos las por defecto
        setStories(data.length > 0 ? data : DEFAULT_STORIES);
      } catch (e) {
        console.error("Error cargando historias desde Firebase, usando historias por defecto:", e);
        setStories(DEFAULT_STORIES);
      } finally {
        setLoading(false);
      }
    };

    fetchStories();
  }, []);

  // Función para mover el carrusel con las flechas
  const scroll = (direction: 'left' | 'right') => {
    if (scrollRef.current) {
      const { scrollLeft, clientWidth } = scrollRef.current;
      const move = direction === 'left' ? -clientWidth : clientWidth;
      scrollRef.current.scrollBy({ left: move, behavior: 'smooth' });
    }
  };

  const formatDisplayDate = (dateStr: string) => {
    if (!dateStr || !dateStr.includes('-')) return dateStr;
    const [year, month] = dateStr.split('-');
    const date = new Date(parseInt(year), parseInt(month) - 1);
    return date.toLocaleDateString('es-ES', { month: 'long', year: 'numeric' });
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center py-20 w-full">
        <Loader2 className="animate-spin text-blue-500" size={40} />
      </div>
    );
  }

  return (
    <div className="relative group w-full">
      {/* Botones de navegación (opcionales, aparecen al pasar el mouse) */}
      <button 
        onClick={() => scroll('left')}
        className="absolute -left-4 top-1/2 -translate-y-1/2 z-10 bg-white p-2 rounded-full shadow-lg text-slate-600 hover:text-blue-600 transition-all opacity-0 group-hover:opacity-100 hidden md:block"
      >
        <ChevronLeft size={30} />
      </button>
      <button 
        onClick={() => scroll('right')}
        className="absolute -right-4 top-1/2 -translate-y-1/2 z-10 bg-white p-2 rounded-full shadow-lg text-slate-600 hover:text-blue-600 transition-all opacity-0 group-hover:opacity-100 hidden md:block"
      >
        <ChevronRight size={30} />
      </button>

      {/* CONTENEDOR DEL CARRUSEL: Cambiamos grid por flex */}
      <div 
        ref={scrollRef}
        className="flex overflow-x-auto gap-8 pb-10 px-4 scrollbar-hide snap-x snap-mandatory flex-nowrap"
        style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
      >
        {stories.map((story) => (
          <div 
            key={story.id} 
            className="flex-none w-[85vw] md:w-[600px] snap-center group bg-white rounded-3xl overflow-hidden shadow-lg flex flex-col lg:flex-row border border-slate-100 transition-all duration-300 hover:shadow-2xl"
          >
            {/* LADO DE LA IMAGEN */}
            <div className="lg:w-1/2 h-56 lg:h-auto overflow-hidden bg-slate-100 flex items-center justify-center flex-shrink-0">
              {story.imageUrl && story.imageUrl.trim() !== "" ? (
                <img 
                  loading="lazy"
                  src={story.imageUrl}
                  alt={story.patientName}
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                  onError={(e) => {
                    const el = e.target as HTMLImageElement;
                    el.onerror = null;
                    el.src = FALLBACK_IMAGE_PLACEHOLDER;
                  }}
                />
              ) : (
                <div className="flex flex-col items-center gap-2">
                  <HeartPulse size={48} className="text-slate-300" />
                  <span className="text-[10px] text-slate-400 uppercase font-bold">Sin imagen</span>
                </div>
              )}
            </div>

            {/* LADO DEL TEXTO */}
            <div className="lg:w-1/2 p-8 flex flex-col justify-center">
              <div className="flex items-center space-x-2 text-slate-400 text-[10px] font-bold uppercase tracking-widest mb-2">
                <Calendar size={12} />
                <span>{formatDisplayDate(story.displayDate)}</span>
              </div>
              
              <h3 className="text-2xl font-bold text-slate-800 mb-2 leading-tight">
                {story.diagnosis}
              </h3>
              
              <p className="text-slate-600 leading-relaxed mb-6 italic text-sm line-clamp-4">
                "{story.testimony}"
              </p>

              <div className="flex items-center space-x-3 mt-auto">
                <div className="w-10 h-10 rounded-full bg-blue-600 overflow-hidden flex items-center justify-center text-white font-bold text-xs shadow-md">
                  {story.imageUrl ? (
                    <img src={story.imageUrl} className="w-full h-full object-cover" alt="" />
                  ) : (
                    story.patientName.charAt(0)
                  )}
                </div>
                <div className="flex flex-col">
                  <span className="font-semibold text-slate-800 text-sm">{story.patientName}</span>
                  <span className="text-[10px] text-slate-400 font-bold uppercase">Paciente Verificado</span>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Stories;