import { Link, useLocation } from "react-router-dom";
import { FaArrowRight } from "react-icons/fa";

const NAV_LINKS = [
  { label: "Drug Explorer", path: "/drug-explorer" },
  { label: "Compare Drugs", path: "/compare-drugs" },
  { label: "AI Center", path: "/ai-center" },
  { label: "Reports", path: "/reports" },
];

export default function Navbar() {
  const { pathname } = useLocation();

  return (
    <nav
      className="fixed top-0 left-0 right-0 z-[9999]"
      style={{
        background: "#09090B",
        height: "64px",
        borderBottom: "1px solid #27272A",
      }}
    >
      <div
        style={{
          maxWidth: "1280px",
          margin: "0 auto",
          height: "64px",
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          padding: "0 32px",
        }}
      >
        <Link
          to="/"
          style={{
            color: "white",
            fontWeight: 700,
            textDecoration: "none",
            fontSize: "18px",
          }}
        >
          PharmaInsight AI
        </Link>

        <div style={{ display: "flex", gap: "24px" }}>
          {NAV_LINKS.map((item) => (
            <Link
              key={item.path}
              to={item.path}
              style={{
                color: pathname === item.path ? "#00D4FF" : "#A1A1AA",
                textDecoration: "none",
                fontSize: "15px",
              }}
            >
              {item.label}
            </Link>
          ))}
        </div>

        <Link
          to="/dashboard"
          style={{
            background: "#00D4FF",
            color: "#09090B",
            padding: "10px 18px",
            borderRadius: "8px",
            textDecoration: "none",
            fontWeight: 700,
            display: "flex",
            alignItems: "center",
            gap: "8px",
          }}
        >
          Dashboard <FaArrowRight />
        </Link>
      </div>
    </nav>
  );
}