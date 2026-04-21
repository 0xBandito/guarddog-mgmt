import { Routes, Route, Navigate } from "react-router-dom";
import Layout from "./components/Layout";
import HomePage from "./pages/HomePage";
import ServicesIndexPage from "./pages/ServicesIndexPage";
import ServicePage from "./pages/ServicePage";
import WhyPage from "./pages/WhyPage";
import PillarPage from "./pages/PillarPage";
import AboutPage from "./pages/AboutPage";
import ContactPage from "./pages/ContactPage";
import "./App.css";

export default function App() {
  return (
    <>
      <link href="https://fonts.googleapis.com/css2?family=Archivo+Black&family=Manrope:wght@400;500;600;700&display=swap" rel="stylesheet" />
      <Routes>
        <Route element={<Layout />}>
          <Route path="/" element={<HomePage />} />
          <Route path="/services" element={<ServicesIndexPage />} />
          <Route path="/services/:slug" element={<ServicePage />} />
          {/* Old pillar URLs now live under Why Us. Keep them routable so old links don't 404. */}
          <Route path="/services/athlete-development" element={<Navigate to="/why-guard-dogs/athlete-development" replace />} />
          <Route path="/services/wealth-strategy" element={<Navigate to="/why-guard-dogs/wealth-strategy" replace />} />
          <Route path="/services/tax-compliance" element={<Navigate to="/why-guard-dogs/tax-compliance" replace />} />
          <Route path="/services/lifestyle-experiences" element={<Navigate to="/why-guard-dogs/lifestyle-experiences" replace />} />
          <Route path="/why-guard-dogs" element={<WhyPage />} />
          <Route path="/why-guard-dogs/:slug" element={<PillarPage />} />
          <Route path="/about" element={<AboutPage />} />
          <Route path="/contact" element={<ContactPage />} />
        </Route>
      </Routes>
    </>
  );
}
