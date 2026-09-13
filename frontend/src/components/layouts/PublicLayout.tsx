import { Outlet } from 'react-router-dom';
import Header from '@/components/Header';
import Footer from '@/components/Footer';

const PublicLayout = () => (
  <div className="flex min-h-screen flex-col">
    <Header />
    <main id="contenido-principal" className="flex-1">
      <Outlet />
    </main>
    <Footer />
  </div>
);

export default PublicLayout;
