import { onCall, HttpsError } from "firebase-functions/v2/https";
import { GoogleGenerativeAI } from "@google/generative-ai";

/**
 * Proxy público para el chat de la landing.
 * La clave API vive en el servidor (functions/.env).
 * No requiere autenticación porque la landing es pública.
 *
 * Request:  { userQuery: string, systemPrompt: string }
 * Response: { text: string }
 */
export const landingChat = onCall(
  {
    region:         "us-central1",
    timeoutSeconds: 60,
    cors:           ["https://fisiochepen-oficial.web.app", "http://localhost:3000"],
  },
  async (request) => {
    const apiKey = process.env.GEMINI_API_KEY;
    if (!apiKey) {
      throw new HttpsError("internal", "Clave Gemini no configurada en el servidor.");
    }

    const { userQuery, systemPrompt } = request.data as {
      userQuery:    string;
      systemPrompt: string;
    };

    if (!userQuery || typeof userQuery !== "string" || userQuery.trim().length === 0) {
      throw new HttpsError("invalid-argument", "El campo 'userQuery' es requerido.");
    }

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
        return { text: result.response.text() || "Lo siento, no pude procesar tu solicitud." };
      } catch (err: unknown) {
        lastError = err;
        const msg = String((err as { message?: string })?.message ?? "");
        const isTransient = msg.includes("503") || msg.includes("429");
        if (isTransient && attempt < 3) {
          await new Promise((res) => setTimeout(res, attempt * 2000));
          continue;
        }
        break;
      }
    }

    const errorMsg = String((lastError as { message?: string })?.message ?? "");
    if (errorMsg.includes("503"))
      throw new HttpsError("unavailable", "El asistente está con alta demanda. Espera unos segundos e intenta de nuevo.");
    if (errorMsg.includes("429"))
      throw new HttpsError("resource-exhausted", "Se alcanzó el límite de consultas. Intenta en unos minutos.");

    throw new HttpsError("internal", "Dificultades técnicas. Por favor intenta de nuevo más tarde.");
  }
);
