import { useState } from 'react';
import { Mail, MapPin, Clock, Send, MessageCircle, AlertCircle, CheckCircle, Facebook, Instagram, ExternalLink } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import PageHeader from '@/components/PageHeader';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion"

const ContactoPage = () => {
  const [formData, setFormData] = useState({
    nombre: '',
    Email: '',
    telefono: '',
    asunto: '',
    comentario: ''
  });
  const [status, setStatus] = useState({ loading: false, error: '', success: '' });

  const contactInfo = [
    {
      icon: Mail,
      title: "Email",
      details: ["tecnica7lomasdezamora@abc.gob.ar", "eet7lz@yahoo.com.ar"],
      description: "Te respondemos en 24hs"
    },
    {
      icon: MapPin,
      title: "Dirección",
      details: ["Manuel Acevedo 1864, Banfield", "Provincia de Buenos Aires"],
      description: "a 4 cuadras de la estación"
    },
    {
      icon: Clock,
      title: "Horarios",
      details: ["Lunes a Viernes: 07:30 a 18:00", "Sábados y Domingos: Cerrado"],
      description: "Horario de atención de Secretaría"
    }
  ];

  const socialLinks = [
    {
      icon: Instagram,
      name: "Instagram",
      url: "https://www.instagram.com/tecnica7ldz/",
    },
    {
      icon: Facebook,
      name: "Facebook",
      url: "https://www.facebook.com/tecnica7.banfield.3",
    }
  ]

  const faqItems = [
    {
      question: "¿Cuáles son los requisitos de inscripción?",
      answer: "Para inscribirte, necesitás presentar tu DNI, certificado de estudios primarios completos y completar el formulario de inscripción en nuestra secretaría."
    },
    {
      question: "¿La escuela tiene algún costo?",
      answer: "No, somos una escuela pública y la educación es gratuita. Solo se solicita una colaboración anual a la cooperadora para el mantenimiento de los talleres y equipamiento."
    },
    {
      question: "¿Qué título obtengo al egresar?",
      answer: "Al finalizar tus estudios, obtendrás el título de Técnico en la especialidad que elijas (Programación o Multimedios), con validez nacional."
    },
    {
      question: "¿Hay pasantías o prácticas profesionalizantes?",
      answer: "Sí, en el último año de la carrera, los estudiantes realizan prácticas profesionalizantes en empresas y organizaciones del sector, aplicando los conocimientos adquiridos."
    }
  ]

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!formData.nombre || !formData.Email || !formData.comentario) {
      setStatus({ loading: false, error: 'Por favor, completá todos los campos obligatorios.', success: '' });
      return;
    }
    setStatus({ loading: true, error: '', success: '' });
    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData)
      });
      const data = await response.json();
      if (!response.ok) {
        throw new Error(data.message || 'Error al enviar el formulario.');
      }
      setStatus({ loading: false, error: '', success: data.message });
      setFormData({ nombre: '', Email: '', telefono: '', asunto: '', comentario: '' });
    } catch (error) {
      setStatus({ loading: false, error: error instanceof Error ? error.message : 'Error al enviar el formulario.', success: '' });
    }
  };

  return (
    <div className="flex flex-col min-h-screen">
      <main className="flex-grow pb-20">
        <PageHeader
          badge="Contacto"
          title="Contactá a la"
          highlight="Técnica 7"
          description="¿Tenés dudas sobre nuestras carreras o el proceso de inscripción? Estamos aquí para ayudarte a dar el primer paso hacia tu futuro técnico."
          breadcrumb={[{ label: 'Contacto' }]}
        />
        <section id="contacto" className="bg-background pt-16">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid lg:grid-cols-2 gap-12">
              {/* Contact Information */}
              <div className="space-y-8">
                <div className="space-y-6">
                  <h3 className="font-heading font-bold text-2xl text-foreground">
                    Información de Contacto
                  </h3>

                  <div className="grid gap-6">
                    {contactInfo.map((info, index) => (
                      <Card key={index} className="card-elegant">
                        <CardContent className="p-6">
                          <div className="flex items-start space-x-4">
                            <div className="w-12 h-12 bg-gradient-primary rounded-lg flex items-center justify-center flex-shrink-0">
                              <info.icon className="h-6 w-6 text-white" />
                            </div>
                            <div className="space-y-2">
                              <h4 className="font-heading font-bold text-lg text-foreground">
                                {info.title}
                              </h4>
                              <div className="space-y-1">
                                {info.details.map((detail, idx) => (
                                  <p key={idx} className="text-foreground font-medium">
                                    {detail}
                                  </p>
                                ))}
                              </div>
                              <p className="text-sm text-muted-foreground">
                                {info.description}
                              </p>
                            </div>
                          </div>
                        </CardContent>
                      </Card>
                    ))}
                  </div>
                </div>

                {/* Social Media */}
                <div className="space-y-6">
                  <h3 className="font-heading font-bold text-2xl text-foreground">
                    Seguinos en Redes
                  </h3>
                  <div className="grid grid-cols-2 gap-4">
                    {socialLinks.map(link => (
                      <a key={link.name} href={link.url} target="_blank" rel="noopener noreferrer">
                        <Card className="card-elegant hover:bg-muted/50 transition-colors">
                          <CardContent className="p-4 flex items-center gap-4">
                            <link.icon className="h-8 w-8 text-primary" />
                            <span className="font-semibold">{link.name}</span>
                          </CardContent>
                        </Card>
                      </a>
                    ))}
                  </div>
                </div>


                {/* Map */}
                <Card className="card-elegant overflow-hidden">
                  <div className="p-3.5 sm:p-4 bg-muted/40 border-b border-border flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                    <div className="flex items-center gap-2 text-xs sm:text-sm font-semibold text-foreground">
                      <MapPin className="h-4 w-4 text-primary shrink-0" />
                      <span>Manuel Acevedo 1864, Banfield &bull; Provincia de Buenos Aires (a 4 cuadras de la estación)</span>
                    </div>
                    <a
                      href="https://maps.google.com/?q=Manuel+Acevedo+1864,+Banfield,+Provincia+de+Buenos+Aires"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-xs text-primary hover:underline font-semibold flex items-center gap-1 shrink-0"
                    >
                      <span>Abrir en Google Maps</span>
                      <ExternalLink className="h-3 w-3" />
                    </a>
                  </div>
                  <CardContent className="p-0">
                    <iframe
                      src="https://maps.google.com/maps?q=Manuel+Acevedo+1864,+Banfield,+Provincia+de+Buenos+Aires&t=&z=16&ie=UTF8&iwloc=&output=embed"
                      width="100%"
                      height="380"
                      style={{ border: 0 }}
                      allowFullScreen
                      loading="lazy"
                      referrerPolicy="no-referrer-when-downgrade"
                      title="Ubicación de Manuel Acevedo 1864, Banfield, Provincia de Buenos Aires (a 4 cuadras de la estación)"
                    />
                  </CardContent>
                </Card>
              </div>

              {/* Contact Form & FAQ */}
              <div className="space-y-8">
                <Card className="card-elegant">
                  <CardHeader>
                    <CardTitle className="font-heading text-2xl text-foreground flex items-center">
                      <MessageCircle className="mr-3 h-6 w-6 text-primary" />
                      Envianos un Mensaje
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <form onSubmit={handleSubmit} className="space-y-6">
                      <div className="grid md:grid-cols-2 gap-4">
                        <div className="space-y-2">
                          <label htmlFor="nombre" className="text-sm font-medium text-foreground">
                            Nombre *
                          </label>
                          <Input
                            id="nombre"
                            name="nombre"
                            value={formData.nombre}
                            onChange={handleChange}
                            placeholder="Tu nombre completo"
                            className="bg-surface border-input-border focus:border-primary"
                            required
                          />
                        </div>
                        <div className="space-y-2">
                          <label htmlFor="Email" className="text-sm font-medium text-foreground">
                            Email *
                          </label>
                          <Input
                            id="Email"
                            name="Email"
                            type="email"
                            value={formData.Email}
                            onChange={handleChange}
                            placeholder="tu@email.com"
                            className="bg-surface border-input-border focus:border-primary"
                            required
                          />
                        </div>
                      </div>

                      <div className="space-y-2">
                        <label htmlFor="telefono" className="text-sm font-medium text-foreground">
                          Teléfono
                        </label>
                        <Input
                          id="telefono"
                          name="telefono"
                          value={formData.telefono}
                          onChange={handleChange}
                          placeholder="Tu número de teléfono"
                          className="bg-surface border-input-border focus:border-primary"
                        />
                      </div>

                      <div className="space-y-2">
                        <label htmlFor="asunto" className="text-sm font-medium text-foreground">
                          Asunto
                        </label>
                        <Input
                          id="asunto"
                          name="asunto"
                          value={formData.asunto}
                          onChange={handleChange}
                          placeholder="¿En qué podemos ayudarte?"
                          className="bg-surface border-input-border focus:border-primary"
                        />
                      </div>

                      <div className="space-y-2">
                        <label htmlFor="comentario" className="text-sm font-medium text-foreground">
                          Mensaje *
                        </label>
                        <Textarea
                          id="comentario"
                          name="comentario"
                          value={formData.comentario}
                          onChange={handleChange}
                          placeholder="Contanos sobre tu consulta..."
                          rows={6}
                          className="bg-surface border-input-border focus:border-primary resize-none"
                          required
                        />
                      </div>

                      {status.error && (
                        <div className="flex items-center text-red-500">
                          <AlertCircle className="h-4 w-4 mr-2" />
                          <p className="text-sm">{status.error}</p>
                        </div>
                      )}
                      {status.success && (
                        <div className="flex items-center text-green-500">
                          <CheckCircle className="h-4 w-4 mr-2" />
                          <p className="text-sm">{status.success}</p>
                        </div>
                      )}

                      <Button
                        type="submit"
                        className="w-full bg-gradient-primary hover:opacity-90 font-bold py-3 btn-glow"
                        size="lg"
                        disabled={status.loading}
                      >
                        {status.loading ? 'Enviando...' : <> <Send className="mr-2 h-5 w-5" /> Enviar Mensaje </>}
                      </Button>

                      <p className="text-xs text-muted-foreground text-center">
                        * Campos obligatorios. Te responderemos en un plazo máximo de 24 horas.
                      </p>
                    </form>
                  </CardContent>
                </Card>

                <Card className="card-elegant">
                  <CardHeader>
                    <CardTitle className="font-heading text-2xl text-foreground">
                      Preguntas Frecuentes
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <Accordion type="single" collapsible className="w-full">
                      {faqItems.map((item, index) => (
                        <AccordionItem value={`item-${index}`} key={index}>
                          <AccordionTrigger>{item.question}</AccordionTrigger>
                          <AccordionContent>
                            {item.answer}
                          </AccordionContent>
                        </AccordionItem>
                      ))}
                    </Accordion>
                  </CardContent>
                </Card>
              </div>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
};

export default ContactoPage;
