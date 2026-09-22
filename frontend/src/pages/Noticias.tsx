import { useState, useMemo } from 'react';
import { motion } from 'framer-motion';
import { Instagram, Newspaper, ExternalLink, ArrowRight, Calendar, Search } from 'lucide-react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import escudotec from '@/assets/escudotec.png';
import { schoolNewsData } from '@/lib/newsData';

type CategoryFilter = 'Todas' | 'Especialidades' | 'Institucional' | 'Comunidad' | 'Innovación';

const Noticias = () => {
  const [selectedCategory, setSelectedCategory] = useState<CategoryFilter>('Todas');
  const [searchTerm, setSearchTerm] = useState('');

  const filteredNews = useMemo(() => {
    const term = searchTerm.toLowerCase().trim();
    return schoolNewsData.filter((item) => {
      const matchesCategory = selectedCategory === 'Todas' || item.category === selectedCategory;
      const matchesSearch =
        !term ||
        item.title.toLowerCase().includes(term) ||
        item.summary.toLowerCase().includes(term) ||
        item.category.toLowerCase().includes(term);
      return matchesCategory && matchesSearch;
    });
  }, [selectedCategory, searchTerm]);

  const categories: CategoryFilter[] = ['Todas', 'Especialidades', 'Institucional', 'Comunidad', 'Innovación'];

  return (
    <div className="flex flex-col min-h-screen bg-slate-50 text-foreground">
      <main className="flex-grow container mx-auto px-4 sm:px-6 lg:px-8 pt-32 pb-24">
        {/* Header Hero */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-center mb-12 max-w-3xl mx-auto space-y-4"
        >
          <div className="w-20 h-20 bg-gradient-to-br from-primary to-blue-700 rounded-3xl flex items-center justify-center mx-auto shadow-lg">
            <Newspaper className="h-10 w-10 text-white" />
          </div>
          <h1 className="font-heading text-4xl md:text-5xl font-extrabold text-slate-900 tracking-tight">
            Noticias y <span className="text-primary">Novedades</span>
          </h1>
          <p className="text-lg sm:text-xl text-slate-600 leading-relaxed">
            Publicaciones oficiales, proyectos de taller, eventos y la vida diaria de la{" "}
            <strong className="text-slate-900">E.E.S.T. N°7 &ldquo;Manuel Sadosky&rdquo;</strong> en Banfield.
          </p>
        </motion.div>

        {/* Instagram Featured Banner */}
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, delay: 0.1 }}
          className="max-w-4xl mx-auto mb-12"
        >
          <div className="relative overflow-hidden rounded-3xl border border-slate-200 bg-white p-6 sm:p-8 shadow-sm flex flex-col md:flex-row items-center justify-between gap-6">
            <div className="flex items-center gap-4 text-center md:text-left">
              <img
                src={escudotec}
                alt="Escudo Técnica 7"
                className="h-16 w-16 rounded-full border-2 border-pink-500 object-contain shadow-xs shrink-0"
              />
              <div className="space-y-1">
                <div className="flex items-center justify-center md:justify-start gap-2">
                  <h2 className="font-heading text-xl font-bold text-slate-900">@tecnica7banfield</h2>
                  <Instagram className="w-5 h-5 text-pink-500" />
                </div>
                <p className="text-sm text-slate-600">
                  Canal oficial de Instagram: fotos en vivo de los talleres, historias y comunicados escolares.
                </p>
              </div>
            </div>

            <Button
              asChild
              className="bg-gradient-to-r from-pink-600 to-rose-600 hover:from-pink-700 hover:to-rose-700 text-white font-semibold rounded-xl shadow-sm shrink-0"
            >
              <a
                href="https://www.instagram.com/tecnica7banfield/"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2"
              >
                <Instagram className="w-4 h-4" />
                <span>Seguir Cuenta Oficial</span>
                <ExternalLink className="w-3.5 h-3.5" />
              </a>
            </Button>
          </div>
        </motion.div>

        {/* Filter and Search Bar */}
        <div className="max-w-6xl mx-auto mb-8 flex flex-col md:flex-row items-center justify-between gap-4">
          {/* Category Tabs */}
          <div className="flex flex-wrap justify-center items-center gap-2">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`px-3.5 py-1.5 rounded-xl text-xs sm:text-sm font-semibold transition-all duration-200 ${
                  selectedCategory === cat
                    ? 'bg-primary text-white shadow-xs scale-105'
                    : 'bg-white text-slate-700 border border-slate-200 hover:bg-slate-100'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>

          {/* Search Box */}
          <div className="relative w-full md:w-72">
            <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
            <input
              type="text"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder="Buscar noticia..."
              className="w-full pl-10 pr-4 py-2 rounded-xl border border-slate-300 bg-white text-sm text-slate-900 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition-all shadow-xs"
            />
          </div>
        </div>

        {/* Publications Grid */}
        <div className="max-w-6xl mx-auto">
          {filteredNews.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
              {filteredNews.map((news, index) => (
                <motion.article
                  key={news.id}
                  initial={{ opacity: 0, y: 15 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3, delay: index * 0.05 }}
                  className="group flex flex-col overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-xs transition-all duration-300 hover:-translate-y-1.5 hover:shadow-lg hover:border-primary/40"
                >
                  {/* Image */}
                  <div className="relative h-52 w-full overflow-hidden bg-slate-100">
                    <img
                      src={news.image}
                      alt={news.title}
                      loading="lazy"
                      className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-60" />
                    <div className="absolute top-3 left-3">
                      <Badge variant="default" className="bg-primary/95 text-white font-semibold shadow-xs">
                        {news.category}
                      </Badge>
                    </div>
                    <div className="absolute bottom-3 left-3 text-white text-xs font-medium flex items-center gap-1.5 bg-black/40 px-2.5 py-1 rounded-md backdrop-blur-xs">
                      <Calendar className="w-3.5 h-3.5 text-cyan-300" />
                      <span>{news.date}</span>
                    </div>
                  </div>

                  {/* Body */}
                  <div className="flex flex-1 flex-col justify-between p-5 sm:p-6 space-y-4">
                    <div className="space-y-2.5">
                      <h3 className="font-heading text-lg sm:text-xl font-bold text-slate-900 leading-snug group-hover:text-primary transition-colors">
                        {news.title}
                      </h3>
                      <p className="text-sm text-slate-600 line-clamp-3 leading-relaxed">
                        {news.summary}
                      </p>
                    </div>

                    {/* Actions */}
                    <div className="pt-4 border-t border-slate-100 flex items-center justify-between gap-3">
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
                          <span>Ver sección</span>
                          <ArrowRight className="w-3.5 h-3.5" />
                        </Link>
                      )}
                    </div>
                  </div>
                </motion.article>
              ))}
            </div>
          ) : (
            <div className="text-center py-16 bg-white rounded-2xl border border-slate-200 max-w-md mx-auto space-y-3">
              <Newspaper className="w-10 h-10 text-slate-400 mx-auto" />
              <h3 className="text-lg font-bold text-slate-800">No se encontraron publicaciones</h3>
              <p className="text-sm text-slate-500">
                No hay noticias que coincidan con los filtros seleccionados.
              </p>
              <Button
                variant="outline"
                size="sm"
                onClick={() => {
                  setSelectedCategory('Todas');
                  setSearchTerm('');
                }}
              >
                Limpiar búsqueda
              </Button>
            </div>
          )}
        </div>
      </main>
    </div>
  );
};

export default Noticias;
