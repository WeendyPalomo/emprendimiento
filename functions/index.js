const { onRequest } = require("firebase-functions/v2/https");
const { OpenAI } = require("openai");
const cors = require("cors");

// Inicializa CORS para permitir peticiones desde cualquier origen (útil para desarrollo)
const corsHandler = cors({ origin: true });

exports.chat = onRequest(
  {
    secrets: ["OPENAI_API_KEY"],
    region: "us-central1",
  },
  (req, res) => {
    corsHandler(req, res, async () => {
      if (req.method !== "POST") {
        return res.status(405).send("Método no permitido");
      }

      const openai = new OpenAI({
        apiKey: process.env.OPENAI_API_KEY,
      });

      const userMessage = req.body.message;
      if (!userMessage) {
        return res.status(400).json({ error: "Mensaje requerido" });
      }

      try {
        const completion = await openai.chat.completions.create({
          model: "gpt-3.5-turbo",
          messages: [
            {
              role: "system",
              content:
                "Eres un asistente legal especializado en consultas para emprendedores en Ecuador. Responde de forma clara, respetuosa y breve.",
            },
            { role: "user", content: userMessage },
          ],
        });

        const respuesta = completion.choices[0].message.content;
        res.status(200).json({ answer: respuesta });
      } catch (error) {
        console.error("Error OpenAI:", error);
        res.status(500).json({ error: "Error interno con OpenAI" });
      }
    });
  }
);
