// src/services/databaseService.ts de la WEB
import { db } from '../lib/firebase';
import { dbSistema } from '../lib/firebaseSistema';
import { collection, getDocs, query, orderBy, limit } from 'firebase/firestore';

export const getClinicData = async (collectionName: string) => {
  try {
    const querySnapshot = await getDocs(collection(db, collectionName));
    return querySnapshot.docs.map(doc => ({ 
      id: doc.id, 
      ...doc.data() 
    }));
  } catch (error) {
    console.error("Error al obtener datos de Firebase:", error);
    return [];
  }
};

export const getLatestStory = async (): Promise<{
  patientName: string;
  diagnosis: string;
  testimony: string;
  displayDate: string;
} | null> => {
  try {
    const q = query(
      collection(dbSistema, 'stories'),
      orderBy('displayDate', 'desc'),
      limit(1)
    );
    const snapshot = await getDocs(q);
    if (snapshot.empty) return null;
    const data = snapshot.docs[0].data();
    return {
      patientName: data.patientName ?? '',
      diagnosis:   data.diagnosis   ?? '',
      testimony:   data.testimony   ?? '',
      displayDate: data.displayDate ?? '',
    };
  } catch (error) {
    console.error("Error al obtener historia reciente:", error);
    return null;
  }
};