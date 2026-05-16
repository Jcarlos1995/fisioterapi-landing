import { useState, useEffect } from 'react';
import { doc, onSnapshot } from 'firebase/firestore';
// Lee desde fisiosystem-8c492 (proyecto del panel interno).
// El EventsManager del panel escribe en esa misma base → una sola fuente de verdad.
import { dbSistema } from '../firebaseSistema';

export interface LiveEvent {
  active: boolean;
  facebookUrl: string;
  title: string;
}

const DEFAULT: LiveEvent = { active: false, facebookUrl: '', title: '' };

export const useLiveEvent = (): LiveEvent => {
  const [event, setEvent] = useState<LiveEvent>(DEFAULT);

  useEffect(() => {
    const unsub = onSnapshot(
      doc(dbSistema, 'config', 'liveEvent'),
      (snap) => {
        if (snap.exists()) {
          const data = snap.data();
          setEvent({
            active:      Boolean(data.active),
            facebookUrl: String(data.facebookUrl ?? ''),
            title:       String(data.title ?? 'Evento en Vivo'),
          });
        } else {
          setEvent(DEFAULT);
        }
      },
      (err) => {
        console.warn('[useLiveEvent] No se pudo cargar el evento en vivo:', err);
        setEvent(DEFAULT);
      }
    );
    return () => unsub();
  }, []);

  return event;
};
