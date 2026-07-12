import { Route, Routes, useLocation } from "react-router-dom";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import PageTransition from "./components/PageTransition";
import Home from "./pages/Home";
import Company from "./pages/Company";
import Projects from "./pages/Projects";
import ProjectDetail from "./pages/ProjectDetail";
import Contact from "./pages/Contact";

export default function App() {
  const location = useLocation();

  return (
    <div className="flex min-h-screen flex-col bg-cream text-ink">
      <Navbar />
      <main className="flex-1">
        <PageTransition key={location.pathname}>
          <Routes location={location}>
            <Route path="/" element={<Home />} />
            <Route path="/company" element={<Company />} />
            <Route path="/projects" element={<Projects />} />
            <Route path="/projects/:slug" element={<ProjectDetail />} />
            <Route path="/contact" element={<Contact />} />
          </Routes>
        </PageTransition>
      </main>
      <Footer />
    </div>
  );
}
