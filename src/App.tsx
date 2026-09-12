import { RouterProvider, useRouter } from './lib/router';
import { motion, AnimatePresence } from 'motion/react';

// Layout components
import Header from './components/layout/Header';
import Footer from './components/layout/Footer';

// Homepage modules
import Hero from './components/home/Hero';
import ClientMarquee from './components/home/ClientMarquee';
import Stats from './components/home/Stats';
import ServicesOverview from './components/home/Services';
import SelectedWork from './components/home/SelectedWork';
import LabPreview from './components/home/LabPreview';
import Philosophy from './components/home/Philosophy';
import Capabilities from './components/home/Capabilities';
import Process from './components/home/Process';
import TechStack from './components/home/TechStack';
import AboutPreview from './components/home/AboutPreview';
import FinalCTA from './components/home/FinalCTA';

// Page components
import WorkPage from './pages/Work';
import CaseStudyPage from './pages/CaseStudy';
import ServicesPage from './pages/Services';
import LabPage from './pages/Lab';
import AboutPage from './pages/About';
import ContactPage from './pages/Contact';
import LegalPage from './pages/Legal';
import AdminDashboardPage from './pages/Admin';
import AdminBlogsPage from './pages/AdminBlogs';
import NewBlogPage from './pages/AdminNewBlog';
import EditBlogPage from './pages/AdminEditBlog';
import BlogPage from './pages/Blog';
import BlogPostPage from './pages/BlogPost';
import { GoogleOAuthProvider } from '@react-oauth/google';

// Replace with a real Client ID in production.
const GOOGLE_CLIENT_ID = import.meta.env.VITE_GOOGLE_CLIENT_ID || "1234567890-placeholder.apps.googleusercontent.com";

function MainAppContent() {
  const { path } = useRouter();

  // Simple SPA dynamic router switch
  const renderActiveRoute = () => {
    if (path === '/') {
      return (
        <div key="homepage">
          <Hero />
          <ClientMarquee />
          <Stats/>
          <ServicesOverview/>
          <SelectedWork/>
          <LabPreview/>
          <Philosophy/>
          <Capabilities/>
          <Process/>
          <TechStack/>
          <AboutPreview/>
          <FinalCTA/>
        </div>
      );
    }

    if (path === '/work') {
      return <WorkPage key="work-list" />;
    }

    if (path.startsWith('/work/')) {
      const slug = path.split('/work/')[1] || '';
      return <CaseStudyPage key={`case-study-${slug}`} slug={slug} />;
    }

    if (path === '/services') {
      return <ServicesPage key="services" />;
    }

    if (path === '/lab') {
      return <LabPage key="lab" />;
    }

    if (path === '/blog') {
      return <BlogPage key="blog-list" />;
    }

    if (path.startsWith('/blog/')) {
      const slug = path.split('/blog/')[1] || '';
      return <BlogPostPage key={`blog-post-${slug}`} slug={slug} />;
    }

    if (path === '/about') {
      return <AboutPage key="about" />;
    }

    if (path === '/contact') {
      return <ContactPage key="contact" />;
    }

    if (path === '/privacy') {
      return <LegalPage key="privacy" type="privacy" />;
    }

    if (path === '/terms') {
      return <LegalPage key="terms" type="terms" />;
    }

    if (path === '/admin') {
      return <AdminDashboardPage key="admin" />;
    }

    if (path === '/admin/blogs') {
      return <AdminBlogsPage key="admin-blogs" />;
    }

    if (path === '/admin/blogs/new') {
      return <NewBlogPage key="admin-blogs-new" />;
    }

    if (path.startsWith('/admin/blogs/edit/')) {
      const id = path.split('/admin/blogs/edit/')[1] || '';
      return <EditBlogPage key={`admin-blogs-edit-${id}`} blogId={id} />;
    }

    // Fallback 404
    return (
      <div key="404" className="pt-40 pb-24 text-center">
        <h2 className="text-3xl font-display font-medium text-white mb-4">404 // ROUTE_NOT_FOUND</h2>
        <p className="text-sm text-studio-text-secondary">The requested operations pipeline is offline.</p>
      </div>
    );
  };

  return (
    <div className="flex flex-col min-h-screen bg-studio-bg text-studio-text-primary overflow-x-hidden selection:bg-studio-accent selection:text-white">
      {/* Header element */}
      <Header />

      {/* Main routed viewport container */}
      <div className="flex-1">
        <AnimatePresence mode="wait">
          <motion.div
            key={path}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.45, ease: [0.16, 1, 0.3, 1] }}
          >
            {renderActiveRoute()}
          </motion.div>
        </AnimatePresence>
      </div>

      {/* Footer element */}
      <Footer />
    </div>
  );
}

export default function App() {
  return (
    <GoogleOAuthProvider clientId={GOOGLE_CLIENT_ID}>
      <RouterProvider>
        <MainAppContent />
      </RouterProvider>
    </GoogleOAuthProvider>
  );
}
