import { useEffect, useState } from 'react';
import { Link, NavLink, useLocation } from 'react-router-dom';
import { AnimatePresence, motion } from 'framer-motion';
import { Menu, X, Phone, Mail, MapPin, LogOut, LayoutDashboard } from 'lucide-react';
import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { useAuth } from '@/hooks/useAuth';
import { cn } from '@/lib/utils';
import logo from '../assets/logo.png';

const navLinks = [
  { name: 'Inicio', href: '/' },
  { name: 'Ciclo Básico', href: '/ciclo-basico' },
  { name: 'Programación', href: '/programacion' },
  { name: 'Multimedios', href: '/multimedios' },
  { name: 'Historia', href: '/historia' },
  { name: 'Radio', href: '/radio' },
  { name: 'Centro de Estudiantes', href: '/centro-estudiantes' },
  { name: 'Contacto', href: '/contacto' },
];

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { isAuthenticated, user, logout } = useAuth();
  const location = useLocation();

  useEffect(() => {
    setIsMenuOpen(false);
  }, [location.pathname]);

  useEffect(() => {
    if (!isMenuOpen) return;
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') setIsMenuOpen(false);
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isMenuOpen]);

  const UserNav = () => {
    if (!isAuthenticated || !user) {
      return (
        <Button asChild>
          <Link to="/login">Login</Link>
        </Button>
      );
    }

    return (
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="ghost" className="relative h-10 w-10 rounded-full" aria-label="Menú de usuario">
            <Avatar className="h-10 w-10">
              <AvatarFallback>{user.email.charAt(0).toUpperCase()}</AvatarFallback>
            </Avatar>
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent className="w-56" align="end" forceMount>
          <DropdownMenuLabel className="font-normal">
            <div className="flex flex-col space-y-1">
              <p className="text-sm font-medium leading-none capitalize">{user.role}</p>
              <p className="text-xs leading-none text-muted-foreground">
                {user.email}
              </p>
            </div>
          </DropdownMenuLabel>
          <DropdownMenuSeparator />
          <DropdownMenuItem asChild>
            <Link to="/dashboard" className="flex items-center">
              <LayoutDashboard className="mr-2 h-4 w-4" />
              <span>Dashboard</span>
            </Link>
          </DropdownMenuItem>
          <DropdownMenuItem onClick={logout}>
            <LogOut className="mr-2 h-4 w-4" />
            <span>Cerrar sesión</span>
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    );
  };

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-gradient-to-b from-gray-100 to-white backdrop-blur-sm border-b border-border">
      {/* Top contact bar */}
      <div className="bg-primary text-primary-foreground py-1 text-xs">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 flex justify-between items-center">
          <div className="flex items-center space-x-4">
            <div className="flex items-center space-x-1">
              <Phone className="h-3 w-3" aria-hidden="true" />
              <span>(011) 4248-6259</span>
            </div>
            <div className="flex items-center space-x-1">
              <Phone className="h-3 w-3" aria-hidden="true" />
              <span>11 6523-3593</span>
            </div>
            <div className="flex items-center space-x-1">
              <Mail className="h-3 w-3" aria-hidden="true" />
              <span>eet7lz@yahoo.com.ar</span>
            </div>
            <div className="hidden lg:flex items-center space-x-1">
              <Mail className="h-3 w-3" aria-hidden="true" />
              <span>tecnica7lomasdezamora@abc.gob.ar</span>
            </div>
          </div>
          <div className="hidden md:flex items-center space-x-1">
            <MapPin className="h-3 w-3" aria-hidden="true" />
            <span>Manuel Acevedo 1864, Banfield (a 4 cuadras de la estación)</span>
          </div>
        </div>
      </div>

      {/* Main navigation */}
      <nav className="container mx-auto px-4 sm:px-6 lg:px-8 py-4" aria-label="Navegación principal">
        <div className="flex items-center justify-between">
          {/* Logo and title */}
          <Link to="/" className="flex items-center space-x-3">
            <img src={logo} alt="Logo de la E.E.S.T. N°7" className="h-12 w-12" />
            <div>
              <h1 className="font-heading font-bold text-base sm:text-lg text-foreground leading-tight">
                E.E.S.T. N°7
              </h1>
              <p className="text-xs sm:text-sm text-primary font-semibold">
                &ldquo;Manuel Sadosky&rdquo; &bull; Banfield
              </p>
            </div>
          </Link>

          {/* Desktop navigation */}
          <div className="hidden md:flex items-center space-x-4">
            {navLinks.map((link) => (
              <NavLink
                key={link.name}
                to={link.href}
                end={link.href === '/'}
                className={({ isActive }) =>
                  cn(
                    'link-animated font-medium transition-colors hover:text-primary',
                    isActive ? 'text-primary' : 'text-foreground'
                  )
                }
              >
                {link.name}
              </NavLink>
            ))}
            <Button
              asChild
              variant="default"
              className="bg-gradient-primary hover:opacity-90 btn-glow font-semibold text-white shadow-sm"
            >
              <Link to="/inscripcion">Inscripciones</Link>
            </Button>
            <UserNav />
          </div>

          {/* Mobile menu button */}
          <button
            type="button"
            onClick={() => setIsMenuOpen((open) => !open)}
            className="md:hidden p-2 rounded-lg hover:bg-secondary transition-colors"
            aria-expanded={isMenuOpen}
            aria-controls="mobile-navigation"
            aria-label={isMenuOpen ? 'Cerrar menú de navegación' : 'Abrir menú de navegación'}
          >
            {isMenuOpen ? <X className="h-6 w-6" aria-hidden="true" /> : <Menu className="h-6 w-6" aria-hidden="true" />}
          </button>
        </div>

        {/* Mobile navigation */}
        <AnimatePresence initial={false}>
          {isMenuOpen && (
            <motion.div
              id="mobile-navigation"
              key="mobile-navigation"
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: 'auto', opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ duration: 0.25, ease: 'easeInOut' }}
              className="md:hidden overflow-hidden"
            >
              <div className="flex flex-col py-4 border-t border-border">
                {navLinks.map((link) => (
                  <NavLink
                    key={link.name}
                    to={link.href}
                    end={link.href === '/'}
                    className={({ isActive }) =>
                      cn(
                        'font-medium py-3 transition-colors hover:text-primary',
                        isActive ? 'text-primary' : 'text-foreground'
                      )
                    }
                  >
                    {link.name}
                  </NavLink>
                ))}
                <Button
                  asChild
                  variant="default"
                  className="bg-gradient-primary hover:opacity-90 w-full font-semibold mt-4 text-white shadow-sm"
                >
                  <Link to="/inscripcion">Inscripciones</Link>
                </Button>
                <div className="pt-4 mt-4 border-t border-border">
                  {isAuthenticated && user ? (
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-3">
                        <Avatar className="h-10 w-10">
                          <AvatarFallback>{user.email.charAt(0).toUpperCase()}</AvatarFallback>
                        </Avatar>
                        <div>
                          <p className="text-sm font-medium leading-none capitalize">{user.role}</p>
                          <p className="text-xs leading-none text-muted-foreground">
                            {user.email}
                          </p>
                        </div>
                      </div>
                      <Button variant="ghost" size="icon" onClick={logout} aria-label="Cerrar sesión">
                        <LogOut className="h-5 w-5" aria-hidden="true" />
                      </Button>
                    </div>
                  ) : (
                    <Button asChild className="w-full">
                      <Link to="/login">Login</Link>
                    </Button>
                  )}
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </nav>
    </header>
  );
};

export default Header;
