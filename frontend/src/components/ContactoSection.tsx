import { Mail, MapPin, Clock, Send, MessageCircle, ExternalLink } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';

const ContactoSection = () => {
  const contactInfo = [
    {
      icon: Mail,
      title: "Email",
      details: ["tecnica7lomasdezamora@abc.gob.ar", "eet7lz@yahoo.com.ar"],
      description: "Respondemos tus consultas institucionales"
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

  return (
    <section id="contacto" className="py-20 bg-background">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center space-y-4 mb-16">
          <h2 className="font-heading font-bold text-4xl lg:text-5xl text-foreground">
            <span className="text-primary">Contactanos</span>
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            ¿Tenés dudas sobre nuestras carreras o el proceso de inscripción? 
            Estamos aquí para ayudarte a dar el primer paso hacia tu futuro técnico.
          </p>
        </div>

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
                  height="280"
                  style={{ border: 0 }}
                  allowFullScreen
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                  title="Ubicación de Manuel Acevedo 1864, Banfield, Provincia de Buenos Aires (a 4 cuadras de la estación)"
                />
              </CardContent>
            </Card>
          </div>

          {/* Contact Form */}
          <div className="space-y-8">
            <Card className="card-elegant">
              <CardHeader>
                <CardTitle className="font-heading text-2xl text-foreground flex items-center">
                  <MessageCircle className="mr-3 h-6 w-6 text-primary" />
                  Envianos un Mensaje
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="grid md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <label className="text-sm font-medium text-foreground">
                      Nombre *
                    </label>
                    <Input 
                      placeholder="Tu nombre completo"
                      className="bg-surface border-input-border focus:border-primary"
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-medium text-foreground">
                      Email *
                    </label>
                    <Input 
                      type="email"
                      placeholder="tu@email.com"
                      className="bg-surface border-input-border focus:border-primary"
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <label className="text-sm font-medium text-foreground">
                    Teléfono
                  </label>
                  <Input 
                    placeholder="Tu número de teléfono"
                    className="bg-surface border-input-border focus:border-primary"
                  />
                </div>

                <div className="space-y-2">
                  <label className="text-sm font-medium text-foreground">
                    Asunto
                  </label>
                  <Input 
                    placeholder="¿En qué podemos ayudarte?"
                    className="bg-surface border-input-border focus:border-primary"
                  />
                </div>

                <div className="space-y-2">
                  <label className="text-sm font-medium text-foreground">
                    Mensaje *
                  </label>
                  <Textarea 
                    placeholder="Contanos sobre tu consulta..."
                    rows={6}
                    className="bg-surface border-input-border focus:border-primary resize-none"
                  />
                </div>

                <Button 
                  className="w-full bg-gradient-primary hover:opacity-90 font-bold py-3 btn-glow"
                  size="lg"
                >
                  <Send className="mr-2 h-5 w-5" />
                  Enviar Mensaje
                </Button>

                <p className="text-xs text-muted-foreground text-center">
                  * Campos obligatorios. Te responderemos en un plazo máximo de 24 horas.
                </p>
              </CardContent>
            </Card>

            {/* Quick Actions */}
            <div>
              <Button 
                asChild
                className="w-full bg-primary text-primary-foreground hover:bg-primary/90 font-bold py-3 shadow-xs rounded-xl"
                size="lg"
              >
                <a href="mailto:tecnica7lomasdezamora@abc.gob.ar">
                  <Mail className="mr-2 h-5 w-5" />
                  Enviar Email Oficial
                </a>
              </Button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ContactoSection;