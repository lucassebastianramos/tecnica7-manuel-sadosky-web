import { Request, Response } from 'express';
import { startChat, sendMessage } from '../services/gemini.service';

// In-memory session store for simplicity.
// For production, you would use a more robust session management solution (e.g., Redis, database).
const sessions: { [sessionId: string]: any } = {};

export const handleChat = async (req: Request, res: Response) => {
  const { prompt, history, sessionId } = req.body;

  // Prompt engineering: instrucción de sistema para limitar el asistente
  const datosActuales = `
Dirección: Manuel Acevedo 1864, Banfield, Provincia de Buenos Aires (a 4 cuadras de la estación)
Teléfono oficial: (011) 4248-6259
Teléfono adicional: 11 6523-3593
Correo electrónico: tecnica7lomasdezamora@abc.gob.ar / eet7lz@yahoo.com.ar
Instagram: https://www.instagram.com/tecnica7ldz/
Orientaciones: Técnico en Programación y Técnico en Multimedios
Horarios de atención: lunes a viernes de 07:30 a 18:00hs
`;
  const schoolName = 'Escuela de Educación Secundaria Técnica N°7 "Manuel Sadosky" de Banfield, Lomas de Zamora';
  const website = "www.tecnica7banfield.edu.ar";
  const systemInstruction = `Eres un asistente virtual exclusivamente para la ${schoolName}. Tu única función es responder preguntas relacionadas con esta escuela, como horarios, inscripciones, materias, historia de la escuela, y eventos. No respondas ninguna pregunta que no esté directamente relacionada con la escuela. Si te preguntan sobre cualquier otro tema, debes responder amablemente que solo puedes proporcionar información sobre la escuela. Utiliza la siguiente información actualizada como tu principal fuente de conocimiento:\n${datosActuales}`;
  const finalPrompt = `${systemInstruction}\n\nPregunta del usuario: ${prompt}`;

  if (!prompt || !sessionId) {
    return res.status(400).json({ error: 'Prompt and sessionId are required.' });
  }

  try {
    // Retrieve or create a new chat session
    if (!sessions[sessionId]) {
      const initialHistory = history || [];
      sessions[sessionId] = startChat(initialHistory);
    }

    const chatSession = sessions[sessionId];
    // Usar el prompt modificado con la instrucción de sistema
    const responseText = await sendMessage(chatSession, finalPrompt);

    res.json({ response: responseText });
  } catch (error) {
    console.error('Chat handling error:', error);
    res.status(500).json({ error: 'Failed to handle chat request.' });
  }
};
