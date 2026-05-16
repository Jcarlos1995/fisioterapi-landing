// Segunda instancia de Firebase apuntando a fisiosystem-8c492 (proyecto del panel).
// Se usa para leer 'stories' y 'config/liveEvent' gestionados desde el panel interno.
// Si en el futuro el landing necesita más datos del sistema, usar esta misma instancia.
import { initializeApp, getApps } from "firebase/app";
import { getFirestore } from "firebase/firestore";

const env = (import.meta as any).env;

const sistemaConfig = {
  apiKey:            env.VITE_SISTEMA_FIREBASE_API_KEY,
  authDomain:        env.VITE_SISTEMA_FIREBASE_AUTH_DOMAIN,
  projectId:         env.VITE_SISTEMA_FIREBASE_PROJECT_ID,
  storageBucket:     env.VITE_SISTEMA_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: env.VITE_SISTEMA_FIREBASE_MESSAGING_SENDER_ID,
  appId:             env.VITE_SISTEMA_FIREBASE_APP_ID,
};

const SISTEMA_APP_NAME = "fisiosystem";

const sistemaApp =
  getApps().find((a) => a.name === SISTEMA_APP_NAME) ||
  initializeApp(sistemaConfig, SISTEMA_APP_NAME);

export const dbSistema = getFirestore(sistemaApp);
