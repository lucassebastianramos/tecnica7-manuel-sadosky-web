import { Suspense, lazy } from "react";
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AuthProvider } from "./context/AuthContext";
import ScrollToTop from "./components/ScrollToTop";
import ProtectedRoute from "./components/ProtectedRoute";
import Index from "./pages/Index";
import logo from "@/assets/logo.png";

const CicloBasico = lazy(() => import("./pages/CicloBasico"));
const Programacion = lazy(() => import("./pages/Programacion"));
const Multimedios = lazy(() => import("./pages/Multimedios"));
const Historia = lazy(() => import("./pages/Historia"));
const Radio = lazy(() => import("./pages/Radio"));
const NotFound = lazy(() => import("./pages/NotFound"));
const LoginPage = lazy(() =>
  import("./pages/Login").then((module) => ({ default: module.LoginPage }))
);
const AdminLayout = lazy(() => import("./components/layouts/AdminLayout"));
const AdminDashboard = lazy(() => import("./pages/admin/AdminDashboard"));
const AdminTeachersPage = lazy(() => import("./pages/admin/TeachersPage"));
const AdminStudentsPage = lazy(() => import("./pages/admin/StudentsPage"));
const CoursesPage = lazy(() => import("./pages/admin/CoursesPage"));
const ReportsPage = lazy(() => import("./pages/admin/ReportsPage"));
const NewsPage = lazy(() => import("./pages/admin/NewsPage"));
const SettingsAdminPage = lazy(() => import("./pages/admin/SettingsAdminPage"));
const BibliotecaDigital = lazy(() => import("./pages/BibliotecaDigital"));
const BolsaTrabajo = lazy(() => import("./pages/BolsaTrabajo"));
const CalendarioAcademico = lazy(() => import("./pages/CalendarioAcademico"));
const CampusVirtual = lazy(() => import("./pages/CampusVirtual"));
const ReglamentoInterno = lazy(() => import("./pages/ReglamentoInterno"));
const SistemaGestion = lazy(() => import("./pages/SistemaGestion"));
const CentroEstudiantes = lazy(() => import("./pages/CentroEstudiantes"));
const PoliticaDePrivacidad = lazy(() => import("./pages/politica-de-privacidad"));
const TermsOfUsePage = lazy(() => import("./pages/TermsOfUsePage"));
const Dashboard = lazy(() => import("./pages/Dashboard"));
const ContactoPage = lazy(() => import("./pages/Contacto"));
const InscripcionPage = lazy(() => import("./pages/InscripcionPage"));
const TourVirtual = lazy(() => import("./pages/TourVirtual"));
const Noticias = lazy(() => import("./pages/Noticias"));
const MyGrades = lazy(() => import("./pages/campus/MyGrades"));
const Materials = lazy(() => import("./pages/campus/Materials"));
const MyCoursesPage = lazy(() => import("./pages/campus/MyCoursesPage"));

const queryClient = new QueryClient();

const PageLoader = () => (
  <div
    className="flex min-h-screen flex-col items-center justify-center gap-4 bg-background"
    role="status"
    aria-live="polite"
    aria-label="Cargando página"
  >
    <img src={logo} alt="" className="h-16 w-16 animate-pulse" />
    <span className="text-sm font-medium text-muted-foreground">Cargando…</span>
  </div>
);

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <AuthProvider>
        <BrowserRouter>
          <ScrollToTop />
          <Suspense fallback={<PageLoader />}>
            <Routes>
              <Route path="/" element={<Index />} />
              <Route path="/ciclo-basico" element={<CicloBasico />} />
              <Route path="/programacion" element={<Programacion />} />
              <Route path="/multimedios" element={<Multimedios />} />
              <Route path="/historia" element={<Historia />} />
              <Route path="/radio" element={<Radio />} />
              <Route path="/login" element={<LoginPage />} />
              <Route path="/campus-virtual" element={<CampusVirtual />} />
              <Route path="/biblioteca-digital" element={<BibliotecaDigital />} />
              <Route path="/bolsa-trabajo" element={<BolsaTrabajo />} />
              <Route path="/calendario-academico" element={<CalendarioAcademico />} />
              <Route path="/reglamento-interno" element={<ReglamentoInterno />} />
              <Route path="/sistema-gestion" element={<SistemaGestion />} />
              <Route path="/centro-estudiantes" element={<CentroEstudiantes />} />
              <Route path="/politica-de-privacidad" element={<PoliticaDePrivacidad />} />
              <Route path="/terminos-de-uso" element={<TermsOfUsePage />} />
              <Route path="/contacto" element={<ContactoPage />} />
              <Route path="/inscripcion" element={<InscripcionPage />} />
              <Route path="/tour-virtual" element={<TourVirtual />} />
              <Route path="/noticias" element={<Noticias />} />

              {/* Rutas Protegidas */}
              <Route element={<ProtectedRoute />}>
                <Route path="/dashboard" element={<Dashboard />} />
                <Route path="/sistema-de-gestion" element={<Dashboard />} />
                <Route path="/campus/mis-cursos" element={<MyCoursesPage />} />
                <Route path="/campus/calificaciones" element={<MyGrades />} />
                <Route path="/campus/materiales" element={<Materials />} />
              </Route>

              {/* Rutas Protegidas de Administración */}
              <Route element={<ProtectedRoute allowedRoles={['DIRECTOR']} />}>
                <Route path="/admin" element={<AdminLayout />}>
                  <Route index element={<AdminDashboard />} />
                  <Route path="teachers" element={<AdminTeachersPage />} />
                  <Route path="students" element={<AdminStudentsPage />} />
                  <Route path="courses" element={<CoursesPage />} />
                  <Route path="reports" element={<ReportsPage />} />
                  <Route path="news" element={<NewsPage />} />
                  <Route path="settings" element={<SettingsAdminPage />} />
                </Route>
              </Route>

              {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
              <Route path="*" element={<NotFound />} />
            </Routes>
          </Suspense>
        </BrowserRouter>
      </AuthProvider>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
