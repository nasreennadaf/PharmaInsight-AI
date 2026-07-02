import { Link, useLocation } from "react-router-dom";
import { FaArrowRight } from "react-icons/fa";

const NAV_LINKS = [
  { label: "Drug Explorer", path: "/drug-explorer" },
  { label: "Compare Drugs", path: "/compare-drugs" },
  { label: "AI Center",     path: "/ai-center" },
  { label: "Reports",       path: "/reports" },
];

export default function Navbar() {
  const { pathname } = useLocation();

  return (
    <nav className="fixed top-0 left-0 w-full z-50 bg-[#09090B]/90 backdrop-blur-md border-b border-white/[0.06]">
      <div className="max-w-7xl mx-auto h-14 flex items-center justify-between px-8">

        {/* Logo */}
        <Link to="/" className="flex items-center gap-2.5 shrink-0">
          <div className="w-6 h-6 rounded-md bg-[#00D4FF] flex items-center justify-center">
            <span className="text-[#09090B] text-xs font-black">P</span>
          </div>
          <span className="text-sm font-bold text-white tracking-tight">PharmaInsight</span>
        </Link>

        {/* Nav links */}
        <div className="hidden lg:flex items-center gap-1">
          {NAV_LINKS.map(l => (
            <Link
              key={l.path}
              to={l.path}
              className={`px-4 py-1.5 rounded-lg text-sm transition-all ${
                pathname === l.path
                  ? "text-white bg-white/8"
                  : "text-[#71717A] hover:text-white hover:bg-white/5"
              }`}
            >
              {l.label}
            </Link>
          ))}
        </div>

        {/* CTA */}
        <Link
          to="/dashboard"
          className="flex items-center gap-2 px-4 py-2 rounded-lg bg-[#00D4FF] text-[#09090B] text-xs font-bold hover:bg-[#00BFEA] transition shrink-0"
        >
          Open Dashboard <FaArrowRight className="text-[10px]" />
        </Link>

      </div>
    </nav>
  );
}