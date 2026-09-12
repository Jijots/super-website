import { Suspense, lazy, useState } from "react";
import { Route, Routes, useLocation } from "react-router-dom";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import PageTransition from "./components/PageTransition";
import IntroSplash from "./components/IntroSplash";
import { IntroProvider } from "./context/IntroContext";
import Home from "./pages/Home";
import Company from "./pages/Company";
import Projects from "./pages/Projects";
import ProjectDetail from "./pages/ProjectDetail";
import Services from "./pages/Services";
import News from "./pages/News";

// Kept out of the main bundle so visitors never download the editor.
const AdminApp = lazy(() => import("./admin/AdminApp"));

export default function App() {
  const location = useLocation();

  // The manager is a tool, not a page, so it skips the navbar, footer and
  // intro splash entirely. Split into its own component so the site's hooks
  // are never called conditionally.
  if (location.pathname.startsWith("/admin")) {
    return (
      <div className="min-h-screen bg-cream text-ink">
        <Suspense
          fallback={<p className="px-6 py-16 text-sm uppercase tracking-wide text-ink/40">Loading...</p>}
        >
          <AdminApp />
        </Suspense>
      </div>
    );
  }

  return <SiteApp />;
}

function SiteApp() {
  const location = useLocation();
  const [introDone, setIntroDone] = useState(() => location.pathname !== "/");
  const [showSplash, setShowSplash] = useState(() => location.pathname === "/");

  return (
    <IntroProvider done={introDone}>
      <div
        className={`flex min-h-screen flex-col bg-cream text-ink transition-opacity duration-500 ${
          introDone ? "opacity-100" : "opacity-0"
        }`}
      >
        <Navbar />
        <main className="flex-1">
          <PageTransition key={location.pathname}>
            <Routes location={location}>
              <Route path="/" element={<Home />} />
              <Route path="/company" element={<Company />} />
              <Route path="/projects" element={<Projects />} />
              <Route path="/projects/:slug" element={<ProjectDetail />} />
              <Route path="/services" element={<Services />} />
              <Route path="/news" element={<News />} />
            </Routes>
          </PageTransition>
        </main>
        <Footer />
      </div>
      {showSplash && (
        <IntroSplash
          onComplete={() => setIntroDone(true)}
          onFinished={() => setShowSplash(false)}
        />
      )}
    </IntroProvider>
  );
}
