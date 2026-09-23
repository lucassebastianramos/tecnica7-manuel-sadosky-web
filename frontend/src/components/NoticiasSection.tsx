import { useState, useMemo } from 'react';
import { motion } from 'framer-motion';
import { Instagram, Newspaper, ExternalLink, ArrowRight, Sparkles, Calendar } from 'lucide-react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import escudotec from '@/assets/escudotec.png';
import { schoolNewsData } from '@/lib/newsData';

type CategoryFilter = 'Todas' | 'Especialidades' | 'Institucional' | 'Comunidad' | 'Innovación';

const NoticiasSection = () => {
  const [selectedCategory, setSelectedCategory] = useState<CategoryFilter>('Todas');

  const filteredNews = useMemo(() => {
    if (selectedCategory === 'Todas') return schoolNewsData;
    return schoolNewsData.filter((item) => item.category === selectedCategory);
  }, [selectedCategory]);

  const categories: CategoryFilter[] = ['Todas', 'Especialidades', 'Institucional', 'Comunidad', 'Innovación'];

  return (
    <section id="noticias" className="bg-surface py-20" aria-labelledby="noticias-title">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <motion.div
          className="mb-12 space-y-4 text-center"
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.5 }}
          transition={{ duration: 0.3 }}
        >
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-primary/10 text-primary text-xs sm:text-sm font-semibold mb-1">
            <Newspaper className="w-4 h-4" />
            <span>Actualidad Institucional y Talleres</span>
          </div>
          <h2 id="noticias-title" className="font-heading text-4xl font-bold text-foreground lg:text-5xl">
            Novedades y <span className="text-primary">Publicaciones</span>
          </h2>
          <p className="mx-auto max-w-2xl text-lg sm:text-xl text-muted-foreground">
            Enterate de las actividades, proyectos técnicos y el día a día de la comunidad de la Técnica 7 en Banfield.
          </p>
        </motion.div>

        {/* Category Filter Tabs */}
        <div className="flex flex-wrap justify-center items-center gap-2 mb-10">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-semibold transition-all duration-200 ${
                selectedCategory === cat
                  ? 'bg-primary text-primary-foreground shadow-md scale-105'
                  : 'bg-card text-muted-foreground border border-border hover:bg-muted/70 hover:text-foreground'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* News Grid */}
        <motion.div
          layout
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8"
        >
          {filteredNews.map((news, index) => (
            <motion.article
              layout
              key={news.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: index * 0.05 }}
              className="group flex flex-col overflow-hidden rounded-2xl border border-border bg-card shadow-sm transition-all duration-300 hover:-translate-y-1.5 hover:shadow-xl hover:border-primary/40"
            >
              {/* Image with Tag */}
              <div className="relative h-52 w-full overflow-hidden bg-slate-100">
                <img
                  src={news.image}
                  alt={news.title}
                  loading="lazy"
                  className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-60" />
                <div className="absolute top-3 left-3">
                  <Badge variant="default" className="bg-primary/95 text-white font-semibold shadow-sm">
                    {news.category}
                  </Badge>
                </div>
                <div className="absolute bottom-3 left-3 text-white text-xs font-medium flex items-center gap-1.5 bg-black/40 px-2.5 py-1 rounded-md backdrop-blur-xs">
                  <Calendar className="w-3.5 h-3.5 text-cyan-300" />
                  <span>{news.date}</span>
                </div>
              </div>

              {/* Content */}
              <div className="flex flex-1 flex-col justify-between p-5 sm:p-6 space-y-4">
                <div className="space-y-2.5">
                  <h3 className="font-heading text-lg sm:text-xl font-bold text-foreground leading-snug group-hover:text-primary transition-colors">
                    {news.title}
                  </h3>
                  <p className="text-sm text-muted-foreground line-clamp-3 leading-relaxed">
                    {news.summary}
                  </p>
                </div>

                {/* Actions */}
                <div className="pt-4 border-t border-border/70 flex items-center justify-between gap-3">
                  <a
                    href={news.instagramUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1.5 text-xs sm:text-sm font-semibold text-pink-600 hover:text-pink-700 transition-colors"
                  >
                    <Instagram className="w-4 h-4" />
                    <span>Ver en Instagram</span>
                    <ExternalLink className="w-3 h-3 ml-0.5 opacity-70" />
                  </a>

                  {news.internalUrl && (
                    <Link
                      to={news.internalUrl}
                      className="inline-flex items-center gap-1 text-xs sm:text-sm font-semibold text-primary hover:underline"
                    >
                      <span>Más info</span>
                      <ArrowRight className="w-3.5 h-3.5" />
                    </Link>
                  )}
                </div>
              </div>
            </motion.article>
          ))}
        </motion.div>

        {/* View all news CTA under grid */}
        <div className="mt-10 text-center">
          <Button
            asChild
            variant="outline"
            size="lg"
            className="border-2 border-primary/40 hover:border-primary text-primary hover:bg-primary hover:text-primary-foreground font-bold px-8 py-3 rounded-xl shadow-xs transition-all duration-200"
          >
            <Link to="/noticias" className="flex items-center gap-2">
              <span>Ver Todas las Noticias</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
          </Button>
        </div>

        {/* Official Instagram Live Channel Card */}
        <motion.div
          className="mt-14 max-w-3xl mx-auto"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.4 }}
        >
          <div className="relative overflow-hidden rounded-3xl border border-border bg-gradient-to-r from-blue-900 via-indigo-900 to-slate-900 p-6 sm:p-8 text-white shadow-xl">
            <div className="absolute top-0 right-0 -mt-8 -mr-8 w-40 h-40 bg-pink-500/20 rounded-full blur-2xl pointer-events-none" />

            <div className="flex flex-col sm:flex-row items-center justify-between gap-6">
              <div className="flex items-center gap-4 text-center sm:text-left">
                <img
                  src={escudotec}
                  alt="Escudo de la Técnica 7"
                  className="h-16 w-16 rounded-2xl border-2 border-pink-500/80 bg-white/10 p-1 shadow-md object-contain shrink-0"
                />
                <div className="space-y-1">
                  <div className="flex items-center justify-center sm:justify-start gap-2">
                    <span className="font-heading text-lg sm:text-xl font-bold">@tecnica7ldz</span>
                    <Instagram className="w-4 h-4 text-pink-400" />
                  </div>
                  <p className="text-xs sm:text-sm text-white/80 max-w-md">
                    Seguí el día a día de las prácticas de taller, actos escolares y novedades en nuestra cuenta oficial de Instagram.
                  </p>
                </div>
              </div>

              <div className="flex flex-col sm:flex-row gap-3 w-full sm:w-auto shrink-0">
                <Button
                  asChild
                  className="bg-gradient-to-r from-pink-600 to-rose-600 hover:from-pink-700 hover:to-rose-700 text-white font-semibold shadow-md rounded-xl"
                >
                  <a
                    href="https://www.instagram.com/tecnica7ldz/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center justify-center gap-2"
                  >
                    <Instagram className="w-4 h-4" />
                    <span>Seguir en Instagram</span>
                    <ExternalLink className="w-3.5 h-3.5 ml-1" />
                  </a>
                </Button>
                <Button
                  asChild
                  className="border-2 border-white bg-white/10 hover:bg-white text-white hover:text-slate-900 font-bold rounded-xl shadow-md transition-all duration-200"
                >
                  <Link to="/noticias" className="flex items-center justify-center gap-2">
                    <span>Ver Todas</span>
                    <ArrowRight className="w-4 h-4" />
                  </Link>
                </Button>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default NoticiasSection;
