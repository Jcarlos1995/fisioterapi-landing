import { getClinicData, getLatestStory } from "./databaseService";

const LANDING_CHAT_URL =
  "https://us-central1-fisiochepen-oficial.cloudfunctions.net/landingChat";

export const getClinicalAssistantResponse = async (userQuery: string): Promise<string> => {
  try {
    const [serviciosData, especialistasData, latestStory] = await Promise.all([
      getClinicData("servicios"),
      getClinicData("especialistas"),
      getLatestStory(),
    ]);

    const response = await fetch(LANDING_CHAT_URL, {
      method:  "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        userQuery,
        clinicData: {
          servicios:     serviciosData,
          especialistas: especialistasData,
          story: latestStory
            ? {
                patientName: latestStory.patientName,
                diagnosis:   latestStory.diagnosis,
                testimony:   latestStory.testimony,
              }
            : null,
        },
      }),
    });

    const data = await response.json();
    if (!response.ok) throw new Error(data.error ?? "Error desconocido");
    return data.text;

  } catch (error: unknown) {
    console.error("Error al conectar con el asistente:", error);
    const msg = String((error as { message?: string })?.message ?? "");
    if (msg.includes("alta demanda") || msg.includes("503"))
      return "El asistente está con alta demanda ahora mismo. Espera unos segundos e intenta de nuevo.";
    if (msg.includes("Límite") || msg.includes("429"))
      return "Se alcanzó el límite de consultas por ahora. Intenta de nuevo en unos minutos.";
    return "Estamos experimentando dificultades técnicas. Por favor, intenta de nuevo más tarde.";
  }
};
