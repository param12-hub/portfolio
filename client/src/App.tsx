import React from 'react';
import { BrowserRouter, Routes, Route, useLocation } from 'react-router-dom';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { AuthProvider } from './context/AuthContext';
import { ThemeProvider } from './context/ThemeContext';
import { SoundProvider } from './context/SoundContext';
import { CommandPaletteProvider } from './context/CommandPaletteContext';
import { ParticleBackground } from './components/3d/ParticleBackground';
import { Navbar } from './components/layout/Navbar';
import { Footer } from './components/layout/Footer';
import { CommandPalette } from './components/common/CommandPalette';
import { TerminalDrawer } from './components/common/TerminalDrawer';
import { PageTransition } from './components/layout/PageTransition';
import { ErrorBoundary } from './components/common/ErrorBoundary';

// Pages
import { Home } from './pages/Home';
import { About } from './pages/About';
import { Skills } from './pages/Skills';
import { Projects } from './pages/Projects';
import { Experience } from './pages/Experience';
import { Services } from './pages/Services';
import { Education } from './pages/Education';
import { Certifications } from './pages/Certifications';
import { Gallery } from './pages/Gallery';
import { Achievements } from './pages/Achievements';
import { Blog } from './pages/Blog';
import { Resume } from './pages/Resume';
import { Testimonials } from './pages/Testimonials';
import { FAQ } from './pages/FAQ';
import { Contact } from './pages/Contact';
import { Privacy } from './pages/Privacy';
import { Terms } from './pages/Terms';
import { Login } from './pages/Login';
import { Dashboard } from './pages/Dashboard';
import { NotFound } from './pages/NotFound';

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 1000 * 60 * 5,
      refetchOnWindowFocus: false,
    },
  },
});

const LayoutWrapper: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const location = useLocation();
  const isDashboard = location.pathname.startsWith('/dashboard');

  return (
    <div className="relative min-h-screen flex flex-col selection:bg-indigo-500 selection:text-white">
      <ParticleBackground />
      {!isDashboard && <Navbar />}
      <main className="flex-1">
        <PageTransition key={location.pathname}>
          {children}
        </PageTransition>
      </main>
      {!isDashboard && <Footer />}
      <CommandPalette />
      <TerminalDrawer />
    </div>
  );
};

export const App: React.FC = () => {
  return (
    <ErrorBoundary fallback={
      <div className="min-h-screen bg-slate-950 text-white flex flex-col items-center justify-center p-6 text-center">
        <h1 className="text-2xl font-bold text-indigo-400">Portfolio & CMS</h1>
        <p className="text-sm text-slate-400 mt-2">Loading application resources...</p>
      </div>
    }>
      <QueryClientProvider client={queryClient}>
        <AuthProvider>
          <ThemeProvider>
            <SoundProvider>
              <CommandPaletteProvider>
                <BrowserRouter>
                  <LayoutWrapper>
                    <Routes>
                      <Route path="/" element={<Home />} />
                      <Route path="/about" element={<About />} />
                      <Route path="/skills" element={<Skills />} />
                      <Route path="/projects" element={<Projects />} />
                      <Route path="/experience" element={<Experience />} />
                      <Route path="/services" element={<Services />} />
                      <Route path="/education" element={<Education />} />
                      <Route path="/certifications" element={<Certifications />} />
                      <Route path="/gallery" element={<Gallery />} />
                      <Route path="/achievements" element={<Achievements />} />
                      <Route path="/blog" element={<Blog />} />
                      <Route path="/resume" element={<Resume />} />
                      <Route path="/testimonials" element={<Testimonials />} />
                      <Route path="/faq" element={<FAQ />} />
                      <Route path="/contact" element={<Contact />} />
                      <Route path="/privacy" element={<Privacy />} />
                      <Route path="/terms" element={<Terms />} />
                      <Route path="/login" element={<Login />} />
                      <Route path="/dashboard/*" element={<Dashboard />} />
                      <Route path="*" element={<NotFound />} />
                    </Routes>
                  </LayoutWrapper>
                </BrowserRouter>
              </CommandPaletteProvider>
            </SoundProvider>
          </ThemeProvider>
        </AuthProvider>
      </QueryClientProvider>
    </ErrorBoundary>
  );
};

export default App;
