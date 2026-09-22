import { Shield } from "lucide-react";
import { motion } from "framer-motion";

const PoliticaDePrivacidad = () => {
  return (
    <div className="flex flex-col min-h-screen relative overflow-hidden bg-background">
      <main className="flex-grow container mx-auto px-4 sm:px-6 lg:px-8 pt-32 pb-24">
        <motion.div
          className="relative mx-auto w-fit"
          initial={{ scale: 0.8, rotate: -5 }}
          animate={{ scale: 1, rotate: 0 }}
          transition={{ duration: 0.8, ease: "backOut" }}
        >
          <motion.div
            className="w-28 h-28 bg-gradient-to-br from-primary to-blue-700 rounded-3xl flex items-center justify-center mx-auto shadow-xl relative overflow-hidden"
            whileHover={{ scale: 1.1, rotate: 5 }}
            transition={{ duration: 0.3 }}
          >
            <motion.div
              className="absolute inset-0 bg-gradient-to-r from-white/20 to-transparent"
              animate={{ x: [-100, 200] }}
              transition={{ repeat: Infinity, duration: 2, ease: "linear" }}
            />
            <Shield className="h-14 w-14 text-white relative z-10" />
          </motion.div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          <h1 className="font-heading font-bold text-5xl lg:text-6xl text-foreground mb-4 text-center mt-16">
            Política de <span className="text-primary">Privacidad</span>
          </h1>
          <motion.div
            className="w-24 h-1 bg-primary/40 mx-auto rounded-full mb-6"
            initial={{ width: 0 }}
            animate={{ width: 96 }}
            transition={{ duration: 0.8, delay: 0.4 }}
          />
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="max-w-4xl mx-auto bg-white/95 backdrop-blur-sm rounded-xl shadow-lg p-12 mb-8 border border-gray-200"
        >
          <div className="space-y-12">
            <section>
              <h2 className="text-2xl font-bold mb-4 text-foreground">Introducción</h2>
              <p className="text-gray-700 mb-4 leading-relaxed">
                En la Escuela de Educación Secundaria Técnica N°7 &ldquo;Manuel Sadosky&rdquo; (Banfield, Lomas de Zamora) nos comprometemos a proteger la privacidad de los usuarios de nuestro sitio web y plataforma institucional. Esta política describe cómo recopilamos, usamos y protegemos su información personal.
              </p>
            </section>
            <section>
              <h2 className="text-2xl font-bold mb-4 text-foreground">Información que Recopilamos</h2>
              <ul className="list-disc pl-6 text-gray-700 space-y-2">
                <li>Datos de contacto proporcionados en formularios (nombre, correo electrónico, teléfono, etc.).</li>
                <li>Información de navegación y uso del sitio (cookies técnicas, dirección IP, tipo de dispositivo).</li>
                <li>Datos académicos o administrativos requeridos para la gestión escolar y procesos de inscripción.</li>
              </ul>
            </section>
            <section>
              <h2 className="text-2xl font-bold mb-4 text-foreground">Uso de la Información</h2>
              <ul className="list-disc pl-6 text-gray-700 space-y-2">
                <li>Gestionar inscripciones, consultas y comunicaciones institucionales con la comunidad educativa.</li>
                <li>Mejorar la experiencia del usuario, accesibilidad y seguridad del sitio web.</li>
                <li>Cumplir con las obligaciones legales y normativas de la Dirección General de Cultura y Educación (DGCyE).</li>
              </ul>
            </section>
            <section>
              <h2 className="text-2xl font-bold mb-4 text-foreground">Protección de la Información</h2>
              <p className="text-gray-700 mb-4 leading-relaxed">
                Implementamos medidas técnicas y organizativas para proteger los datos personales contra accesos no autorizados, alteraciones, divulgación o destrucción indebida.
              </p>
            </section>
            <section>
              <h2 className="text-2xl font-bold mb-4 text-foreground">Compartir Información</h2>
              <p className="text-gray-700 mb-4 leading-relaxed">
                No comercializamos ni compartimos información personal con terceros para fines publicitarios. La información solo podrá remitirse a organismos educativos oficiales en cumplimiento de la normativa vigente.
              </p>
            </section>
            <section>
              <h2 className="text-2xl font-bold mb-4 text-foreground">Derechos de los Usuarios</h2>
              <ul className="list-disc pl-6 text-gray-700 space-y-2">
                <li>Acceder, rectificar o solicitar la actualización de sus datos personales.</li>
                <li>Solicitar información sobre el tratamiento de sus datos.</li>
                <li>Ejercer los derechos reconocidos por la Ley Nacional de Protección de Datos Personales N° 25.326.</li>
              </ul>
            </section>
            <section>
              <h2 className="text-2xl font-bold mb-4 text-foreground">Cambios en la Política</h2>
              <p className="text-gray-700 mb-4 leading-relaxed">
                Nos reservamos el derecho de modificar esta política de privacidad según las adecuaciones pedagógicas o normativas pertinentes. Los cambios serán publicados en esta página con vigencia inmediata.
              </p>
            </section>
            <section>
              <h2 className="text-2xl font-bold mb-4 text-foreground">Contacto Institucional</h2>
              <p className="text-gray-700 mb-4 leading-relaxed">
                Para consultas sobre privacidad o tratamiento de datos, puede comunicarse a través de los canales oficiales: correo electrónico <a href="mailto:tecnica7lomasdezamora@abc.gob.ar" className="text-primary font-medium hover:underline">tecnica7lomasdezamora@abc.gob.ar</a> o <a href="mailto:eet7lz@yahoo.com.ar" className="text-primary font-medium hover:underline">eet7lz@yahoo.com.ar</a>, o en la Secretaría escolar sita en Manuel Acevedo 1864, Banfield (Provincia de Buenos Aires, a 4 cuadras de la estación).
              </p>
            </section>
            <section className="mt-12 pt-6 border-t border-gray-200">
              <p className="text-sm text-gray-500 italic">
                Última actualización: {new Date().getFullYear()} — E.E.S.T. N°7 &ldquo;Manuel Sadosky&rdquo;
              </p>
            </section>
          </div>
        </motion.div>
      </main>
    </div>
  );
};

export default PoliticaDePrivacidad;
