import { onRequest } from "firebase-functions/v2/https";
import { GoogleGenerativeAI } from "@google/generative-ai";

interface ClinicData {
  servicios?:     unknown[];
  especialistas?: unknown[];
  story?: {
    patientName: string;
    diagnosis:   string;
    testimony:   string;
  } | null;
}

// Limita longitud y elimina secuencias que podrían inyectar instrucciones al modelo
const sanitize = (value: unknown, maxLength = 400): string => {
  if (typeof value !== "string") return "";
  return value.slice(0, maxLength).replace(/\n{3,}/g, "\n\n");
};

const buildSystemPrompt = (clinicData: ClinicData): string => {
  const serviciosStr    = JSON.stringify(clinicData.servicios    ?? []).slice(0, 1200);
  const especialistasStr = JSON.stringify(clinicData.especialistas ?? []).slice(0, 1200);

  const storyBlock = clinicData.story
    ? `CASO DE ÉXITO MÁS RECIENTE:
- Paciente: ${sanitize(clinicData.story.patientName, 80)}
- Diagnóstico: ${sanitize(clinicData.story.diagnosis, 120)}
- Testimonio: "${sanitize(clinicData.story.testimony, 400)}"
Cuando pregunten por casos de éxito, resume este caso en 3 líneas simples y naturales, sin tecnicismos.`
    : `No hay casos de éxito registrados aún. Si preguntan, indica que los resultados hablan por sí solos y anima a agendar una cita.`;

  return `Eres el Asistente Virtual de "Fisioterapia Chepén".
Tu objetivo es orientar a los pacientes de manera experta.

DATOS EN TIEMPO REAL:
- Servicios y Precios: ${serviciosStr}
- Información de Staff: ${especialistasStr}

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
};

export const landingChat = onRequest(
  { region: "us-central1", timeoutSeconds: 60 },
  async (req, res) => {
    // ── CORS explícito ────────────────────────────────────────────────────────
    res.set("Access-Control-Allow-Origin",  "*");
    res.set("Access-Control-Allow-Methods", "POST, OPTIONS");
    res.set("Access-Control-Allow-Headers", "Content-Type");

    if (req.method === "OPTIONS") { res.status(204).end(); return; }

    const apiKey = process.env.GEMINI_API_KEY;
    if (!apiKey) {
      res.status(500).json({ error: "Clave Gemini no configurada en el servidor." });
      return;
    }

    const { userQuery, clinicData } = req.body as {
      userQuery:  string;
      clinicData: ClinicData;
    };

    if (!userQuery || typeof userQuery !== "string" || userQuery.trim().length === 0) {
      res.status(400).json({ error: "El campo 'userQuery' es requerido." });
      return;
    }

    const systemPrompt = buildSystemPrompt(clinicData ?? {});
    let lastError: unknown;

    for (let attempt = 1; attempt <= 3; attempt++) {
      try {
        const genAI  = new GoogleGenerativeAI(apiKey);
        const model  = genAI.getGenerativeModel({ model: "gemini-2.5-flash" });
        const chat   = model.startChat({
          history: [
            { role: "user",  parts: [{ text: "Hola" }] },
            { role: "model", parts: [{ text: systemPrompt }] },
          ],
        });
        const result = await chat.sendMessage(userQuery);
        res.json({ text: result.response.text() || "Lo siento, no pude procesar tu solicitud." });
        return;
      } catch (err: unknown) {
        lastError = err;
        const msg = String((err as { message?: string })?.message ?? "");
        const isTransient = msg.includes("503") || msg.includes("429");
        if (isTransient && attempt < 3) {
          await new Promise((r) => setTimeout(r, attempt * 2000));
          continue;
        }
        break;
      }
    }

    const errorMsg = String((lastError as { message?: string })?.message ?? "");
    if (errorMsg.includes("503"))
      res.status(503).json({ error: "El asistente está con alta demanda. Espera unos segundos e intenta de nuevo." });
    else if (errorMsg.includes("429"))
      res.status(429).json({ error: "Se alcanzó el límite de consultas. Intenta en unos minutos." });
    else
      res.status(500).json({ error: "Dificultades técnicas. Por favor intenta de nuevo más tarde." });
  }
);
