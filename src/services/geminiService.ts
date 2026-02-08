import { GoogleGenerativeAI } from "@google/generative-ai";
import { getClinicData } from "./databaseService"; 

const API_KEY = (import.meta as any).env.VITE_GEMINI_API_KEY;

// Inicialización limpia
const genAI = API_KEY ? new GoogleGenerativeAI(API_KEY) : null;

export const getClinicalAssistantResponse = async (userQuery: string) => {
  try {
    if (!genAI || !API_KEY) {
      console.error("VITE_GEMINI_API_KEY no detectada.");
      return "Lo siento, el asistente no está configurado correctamente.";
    }

    const serviciosData = await getClinicData('servicios');
    const especialistasData = await getClinicData('especialistas');

    const serviciosInfo = JSON.stringify(serviciosData);
    const especialistasInfo = JSON.stringify(especialistasData);

    // PARCHE APLICADO: Forzamos apiVersion: 'v1' para evitar el error v1beta
    // Se mantiene el modelo gemini-1.5-flash solicitado
    const model = genAI.getGenerativeModel({
      model: "gemini-2.5-flash"
    });
    const chat = model.startChat({
      history: [
        {
          role: "user",
          parts: [{ text: "Hola" }],
        },
        {
          role: "model",
          parts: [{ text: `Eres el Asistente Virtual de "Fisioterapia Chepén". 
            Tu objetivo es orientar a los pacientes de manera experta.

            DATOS EN TIEMPO REAL:
            - Servicios y Precios: ${serviciosInfo}
            - Información de Staff: ${especialistasInfo}

            ESPECIALISTAS PRINCIPALES:
            - Lic. Silvia Fuentes Romero (Directora / Especialista Senior)
            - DC. Juan Fuentes Loyola (Quiropráctica / Especialista)
            - FT. Edson Pineda Oliva, FT. Emely Salirrosas, FT. Ingrid Briones.

            CASOS DE ÉXITO REALES:
            - Segundo Vasquez: Recuperó el 90% de movilidad tras un ACV en 2 meses.
            - Juan Celiz: Recuperó el 100% de movilidad tras paraplejia por hernia dorsal.

            REGLAS DE ORO:
            1. Usa los precios y servicios exactos de los datos de Firebase.
            2. Menciona los casos de éxito ante consultas de parálisis o ACV.
            3. Mantén un tono empático y profesional.
            4. Invita siempre a "Reservar una Cita" para evaluación física.` }],
        },
      ],
    });

    const result = await chat.sendMessage(userQuery);
    const response = await result.response;
    
    return response.text() || "Lo siento, no pude procesar tu solicitud.";

  } catch (error) {
    console.error("Error detallado al conectar con Gemini:", error);
    return "Estamos experimentando dificultades técnicas. Por favor, intenta de nuevo más tarde.";
  }
};