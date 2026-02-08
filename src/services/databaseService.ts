// src/services/databaseService.ts de la WEB
import { db } from '../firebaseConfig'; // Ahora esto sí funcionará
import { collection, getDocs } from 'firebase/firestore';

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