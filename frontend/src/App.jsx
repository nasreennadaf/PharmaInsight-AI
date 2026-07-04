import { BrowserRouter, Routes, Route, useLocation } from "react-router-dom";

import Navbar from "./components/Navbar";

import Landing from "./pages/Landing";
import Dashboard from "./pages/Dashboard";
import DrugExplorer from "./pages/DrugExplorer";
import CompareDrugs from "./pages/CompareDrugs";
import AICenter from "./pages/AICenter";
import MarketIntelligence from "./pages/MarketIntelligence";
import Reports from "./pages/Reports";
import About from "./pages/About";

function Layout() {
  const location = useLocation();

  const hideNavbar = location.pathname === "/dashboard";

  return (
    <>
      {!hideNavbar && <Navbar />}

      <Routes>
        <Route path="/" element={<Landing />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/drug-explorer" element={<DrugExplorer />} />
        <Route path="/compare-drugs" element={<CompareDrugs />} />
        <Route path="/ai-center" element={<AICenter />} />
        <Route path="/market-intelligence" element={<MarketIntelligence />} />
        <Route path="/reports" element={<Reports />} />
        <Route path="/about" element={<About />} />
      </Routes>
    </>
  );
}

export default function App() {
  return (
    <BrowserRouter>
      <Layout />
    </BrowserRouter>
  );
}