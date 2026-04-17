import { getFunctions, httpsCallable } from "firebase/functions";
import { getClinicData, getLatestStory } from "./databaseService";

export const getClinicalAssistantResponse = async (userQuery: string): Promise<string> => {
  try {
    const [serviciosData, especialistasData, latestStory] = await Promise.all([
      getClinicData('servicios'),
      getClinicData('especialistas'),
      getLatestStory(),
    ]);

    const serviciosInfo     = JSON.stringify(serviciosData);
    const especialistasInfo = JSON.stringify(especialistasData);

    const storyBlock = latestStory
      ? `CASO DE ÉXITO MÁS RECIENTE (extraído en tiempo real):
            - Paciente: ${latestStory.patientName}
            - Diagnóstico: ${latestStory.diagnosis}
            - Testimonio: "${latestStory.testimony}"
            Cuando te pregunten por casos de éxito o resultados, resume este caso en 3 líneas simples y naturales, sin tecnicismos.`
      : `No hay casos de éxito registrados aún. Si preguntan, indica que los resultados hablan por sí solos y anima a agendar una cita.`;

    const systemPrompt = `Eres el Asistente Virtual de "Fisioterapia Chepén".
            Tu objetivo es orientar a los pacientes de manera experta.

            DATOS EN TIEMPO REAL:
            - Servicios y Precios: ${serviciosInfo}
            - Información de Staff: ${especialistasInfo}

            ESPECIALISTAS PRINCIPALES:
            - Lic. Silvia Fuentes Romero (Directora / Especialista Senior)
            - DC. Juan Fuentes Loyola (Quiropráctica / Especialista)
            - FT. Edson Pineda Oliva, FT. Emely Salirrosas, FT. Ingrid Briones.

            ${storyBlock}

            REGLAS DE ORO:
            1. Usa los precios y servicios exactos de los datos de Firebase.
            2. Ante preguntas sobre resultados o casos reales, usa el caso más reciente de arriba.
            3. Mantén un tono empático y profesional.
            4. Invita siempre a "Reservar una Cita" para evaluación física.`;

    const functions   = getFunctions(undefined, "us-central1");
    const landingChat = httpsCallable<
      { userQuery: string; systemPrompt: string },
      { text: string }
    >(functions, "landingChat");

    const result = await landingChat({ userQuery, systemPrompt });
    return result.data.text;

  } catch (error: unknown) {
    console.error("Error al conectar con el asistente:", error);
    const msg = String((error as { message?: string })?.message ?? "");
    if (msg.includes("unavailable") || msg.includes("503")) {
      return "El asistente está con alta demanda ahora mismo. Espera unos segundos e intenta de nuevo.";
    }
    if (msg.includes("resource-exhausted") || msg.includes("429")) {
      return "Se alcanzó el límite de consultas por ahora. Intenta de nuevo en unos minutos.";
    }
    return "Estamos experimentando dificultades técnicas. Por favor, intenta de nuevo más tarde.";
  }
};
