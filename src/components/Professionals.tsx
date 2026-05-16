import React, { useState, useEffect } from 'react';
import { db } from '../lib/firebase';
import { collection, getDocs } from 'firebase/firestore';

import fotoSilvia from '../assets/team/silvia.jpg';
import fotoJuan   from '../assets/team/juan.jpg';
import fotoEdson  from '../assets/team/edson.jpg';
import fotoEmely  from '../assets/team/emely.jpg';
import fotoIngrid from '../assets/team/ingrid.jpg';

// Mapa de clave → imagen local. Si un doc de Firestore tiene photoKey: "silvia",
// se usa fotoSilvia automáticamente. Si tiene photoUrl, esa tiene prioridad.
const LOCAL_PHOTOS: Record<string, string> = {
  silvia: fotoSilvia,
  juan:   fotoJuan,
  edson:  fotoEdson,
  emely:  fotoEmely,
  ingrid: fotoIngrid,
};

const PLACEHOLDER = 'https://placehold.co/400x500?text=Foto+Pr%C3%B3ximamente';

interface StaffMember {
  id:        string;
  name:      string;
  specialty: string;
  bio:       string;
  image:     string;
}

const STAFF_FALLBACK: StaffMember[] = [
  { id: '1', name: 'Lic. Silvia Fuentes Romero',   specialty: 'Directora - Rehabilitación Física', image: fotoSilvia, bio: 'Especialista senior con amplia trayectoria en la dirección clínica y rehabilitación integral.' },
  { id: '2', name: 'DC. Juan Fuentes Loyola',       specialty: 'Doctor en Quiropráctica',           image: fotoJuan,   bio: 'Experto en alineación de columna y tratamiento de dolencias neuromusculoesqueléticas.' },
  { id: '3', name: 'FT. Edson Pineda Oliva',        specialty: 'Fisioterapia y Rehabilitación',     image: fotoEdson,  bio: 'Especialista en terapia física aplicada a la recuperación de lesiones musculares.' },
  { id: '4', name: 'FT. Emely Salirrosas Serrano',  specialty: 'Fisioterapia y Rehabilitación',     image: fotoEmely,  bio: 'Dedicada a la recuperación funcional y bienestar preventivo de los pacientes.' },
  { id: '5', name: 'FT. Ingrid Briones Serrano',    specialty: 'Fisioterapia y Rehabilitación',     image: fotoIngrid, bio: 'Especialista en técnicas modernas de fisioterapia para el manejo del dolor.' },
];

const Professionals: React.FC = () => {
  const [staff, setStaff] = useState<StaffMember[]>(STAFF_FALLBACK);

  useEffect(() => {
    getDocs(collection(db, 'especialistas'))
      .then(snap => {
        if (snap.empty) return;
        const data: StaffMember[] = snap.docs.map(doc => {
          const d = doc.data();
          // photoUrl (Storage) > photoKey (local) > placeholder
          const image: string =
            d.photoUrl  ||
            LOCAL_PHOTOS[d.photoKey as string] ||
            'https://via.placeholder.com/400x500?text=Foto+Proximamente';
          return { id: doc.id, name: d.name ?? '', specialty: d.specialty ?? '', bio: d.bio ?? '', image };
        });
        setStaff(data);
      })
      .catch(() => {/* mantiene STAFF_FALLBACK */});
  }, []);

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
      {staff.map((prof) => (
        <div
          key={prof.id}
          className="group bg-white rounded-2xl overflow-hidden shadow-md hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2"
        >
          <div className="aspect-[4/5] overflow-hidden bg-gray-100">
            <img
              src={prof.image}
              alt={prof.name}
              className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
              onError={(e) => { (e.target as HTMLImageElement).src = 'https://via.placeholder.com/400x500?text=Foto+Proximamente'; }}
            />
          </div>
          <div className="p-6">
            <span className="text-blue-600 text-sm font-bold uppercase tracking-wider mb-2 block">{prof.specialty}</span>
            <h3 className="text-xl font-bold text-slate-800 mb-3">{prof.name}</h3>
            <p className="text-slate-600 text-sm leading-relaxed">{prof.bio}</p>
          </div>
        </div>
      ))}
    </div>
  );
};

export default Professionals;
