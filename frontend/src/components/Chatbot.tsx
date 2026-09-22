import { useState, useRef, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { MessageSquare, X, Send, Bot, User } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

interface ChatMessage {
  role: 'user' | 'model';
  text: string;
}

const Chatbot = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [inputValue, setInputValue] = useState('');
  const [sessionId, setSessionId] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  const chatContainerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 50) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };

    window.addEventListener('scroll', handleScroll);

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  useEffect(() => {
    // Generate a unique session ID when the component mounts
    setSessionId(`session_${Date.now()}_${Math.random().toString(36).substring(2)}`);
    // Add a welcome message from the bot
    setMessages([
      { role: 'model', text: '¡Hola! Soy tu asistente virtual. ¿En qué puedo ayudarte hoy?' }
    ]);
  }, []);

  useEffect(() => {
    // Scroll to the bottom of the chat container when new messages are added
    if (chatContainerRef.current) {
      chatContainerRef.current.scrollTop = chatContainerRef.current.scrollHeight;
    }
  }, [messages]);

  const handleSendMessage = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!inputValue.trim() || isLoading) return;

    const userMessage: ChatMessage = { role: 'user', text: inputValue };
    setMessages((prev) => [...prev, userMessage]);
    setInputValue('');
    setIsLoading(true);

    try {
      const response = await fetch('/api/chat', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          prompt: inputValue,
          // We pass the history *before* adding the new user message
          // because the session on the backend will be updated with the prompt.
          history: (() => {
            // Filtra todos los mensajes hasta el primer mensaje de usuario
            const mapped = messages.map((msg) => ({
              role: msg.role,
              parts: [{ text: msg.text }],
            }));
            const firstUserIdx = mapped.findIndex(m => m.role === 'user');
            if (firstUserIdx === -1) return []; // No hay mensajes de usuario
            // Solo envía el historial desde el primer mensaje de usuario en adelante
            return mapped.slice(firstUserIdx);
          })(),
          sessionId: sessionId,
        }),
      });

      if (!response.ok) {
        throw new Error('Network response was not ok');
      }

      const data = await response.json();
      const botMessage: ChatMessage = { role: 'model', text: data.response };
      setMessages((prev) => [...prev, botMessage]);
    } catch (error) {
      console.error('Error sending message:', error);
      const lower = userMessage.text.toLowerCase();
      let fallbackText = 'Soy el asistente virtual de la E.E.S.T. N°7 "Manuel Sadosky" de Banfield. ¿En qué puedo orientarte?';
      if (lower.includes('inscrip')) {
        fallbackText = 'Las inscripciones se encuentran abiertas para el próximo ciclo lectivo. Podés descargar la planilla oficial de la DGCyE en la sección "Inscripciones" de nuestra web y presentarla en la Secretaría (Manuel Acevedo 1864, Banfield).';
      } else if (lower.includes('carrera') || lower.includes('orientaci') || lower.includes('especialidad')) {
        fallbackText = 'La E.E.S.T. N°7 ofrece dos especialidades técnicas de nivel superior: Técnico en Programación y Técnico en Multimedios (ambas de 4 años), precedidas por los 3 años de Ciclo Básico común.';
      } else if (lower.includes('contacto') || lower.includes('telefono') || lower.includes('donde') || lower.includes('direcci') || lower.includes('ubicaci') || lower.includes('mail') || lower.includes('correo')) {
        fallbackText = 'Estamos ubicados en Manuel Acevedo 1864, Banfield, Provincia de Buenos Aires (a 4 cuadras de la estación). Teléfonos: (011) 4248-6259 / 11 6523-3593. Emails oficiales: tecnica7lomasdezamora@abc.gob.ar / eet7lz@yahoo.com.ar. Horario: lunes a viernes de 07:30 a 18:00 hs.';
      } else if (lower.includes('horario')) {
        fallbackText = 'Los horarios generales son: Turno Mañana de 07:30 a 12:00 hs y Turno Tarde de 13:00 a 17:30 hs, con contraturnos de talleres y laboratorios según la división.';
      } else if (lower.includes('historia')) {
        fallbackText = 'Fundada en 1911, la E.E.S.T. N°7 cuenta con más de un siglo de trayectoria técnica en la región sur del Gran Buenos Aires, llevando con orgullo el nombre del ilustre científico argentino Dr. Manuel Sadosky.';
      } else if (lower.includes('instagram') || lower.includes('redes') || lower.includes('red social')) {
        fallbackText = 'Nuestro Instagram oficial es @tecnica7ldz (https://www.instagram.com/tecnica7ldz/). ¡Seguinos para enterarte de todas las novedades y eventos!';
      } else if (lower.includes('web') || lower.includes('sitio') || lower.includes('pagina')) {
        fallbackText = 'El sitio web oficial de la institución es https://tecnica7ldz.edu.ar.';
      }
      const errorMessage: ChatMessage = {
        role: 'model',
        text: fallbackText,
      };
      setMessages((prev) => [...prev, errorMessage]);
    } finally {
      setIsLoading(false);
    }
  };

  // Sugerencias de preguntas
  const suggestions = [
    "¿Cuándo abren las inscripciones?",
    "¿Qué carreras hay?",
    "¿Cómo contacto a la escuela?",
    "¿Cuál es la historia de la escuela?",
    "¿Cuáles son los horarios de clases?"
  ];

  return (
    <>
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 50, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 50, scale: 0.9 }}
            transition={{ duration: 0.3 }}
            className="fixed bottom-24 right-5 w-80 h-[450px] z-50"
          >
            <Card className="h-full flex flex-col shadow-lg bg-white">
              <CardHeader className="flex flex-row items-center justify-between p-4 border-b">
                <div className="flex items-center space-x-2">
                  <Bot className="h-6 w-6 text-primary" />
                  <CardTitle className="text-lg font-semibold">Asistente Virtual</CardTitle>
                </div>
                <Button variant="ghost" size="icon" onClick={() => setIsOpen(false)}>
                  <X className="h-5 w-5" />
                </Button>
              </CardHeader>
              <CardContent className="flex-grow p-4 overflow-y-auto" ref={chatContainerRef}>
                <div className="space-y-4">
                  {/* Sugerencias de preguntas */}
                  {messages.length === 1 && (
                    <div className="mb-4 flex flex-wrap gap-2 justify-center">
                      {suggestions.map((s, i) => (
                        <button
                          key={i}
                          type="button"
                          className="bg-primary/10 text-primary px-3 py-1 rounded-full text-xs hover:bg-primary/20 transition"
                          onClick={() => setInputValue(s)}
                        >
                          {s}
                        </button>
                      ))}
                    </div>
                  )}
                  {messages.map((msg, index) => (
                    <div key={index} className={`flex items-start gap-3 ${msg.role === 'user' ? 'justify-end' : ''}`}>
                      {msg.role === 'model' && <Bot className="h-6 w-6 text-primary flex-shrink-0" />}
                      <div className={`rounded-lg px-3 py-2 max-w-[80%] ${msg.role === 'user' ? 'bg-primary text-primary-foreground' : 'bg-muted'}`}>
                        <p className="text-sm">{msg.text}</p>
                      </div>
                      {msg.role === 'user' && <User className="h-6 w-6 text-muted-foreground flex-shrink-0" />}
                    </div>
                  ))}
                  {isLoading && (
                    <div className="flex items-start gap-3">
                      <Bot className="h-6 w-6 text-primary flex-shrink-0" />
                      <div className="rounded-lg px-3 py-2 bg-muted">
                        <p className="text-sm">...</p>
                      </div>
                    </div>
                  )}
                </div>
              </CardContent>
              <CardFooter className="p-4 border-t">
                <form onSubmit={handleSendMessage} className="flex w-full items-center space-x-2">
                  <Input
                    type="text"
                    placeholder="Escribe un mensaje..."
                    value={inputValue}
                    onChange={(e) => setInputValue(e.target.value)}
                    className="flex-grow"
                    disabled={isLoading}
                  />
                  <Button type="submit" size="icon" disabled={isLoading}>
                    <Send className="h-5 w-5 " />
                  </Button>
                </form>
              </CardFooter>
            </Card>
          </motion.div>
        )}
      </AnimatePresence>
      <motion.div
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
        className="fixed bottom-5 right-5 z-50 "
      >
        <Button
          size="lg"
          className="rounded-full h-16 w-16 shadow-lg"
          onClick={() => setIsOpen(!isOpen)}
        >
          {isOpen ? <X className="h-8 w-8 text-white" /> : <MessageSquare className={`h-8 w-8 ${isScrolled ? 'text-black' : 'text-white'}`} />}
        </Button>
      </motion.div>
    </>
  );
};

export default Chatbot;
