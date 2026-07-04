import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import api from "../services/api";
import hero from "../assets/hero.jpg";
import { FaArrowRight } from "react-icons/fa";

const CAPABILITIES = [
  {
    tag: "Analysis",
    title: "Patient review intelligence",
    body: "159,000+ reviews processed. Surface efficacy signals, sentiment drift, and adverse patterns that raw data hides.",
  },
  {
    tag: "Market",
    title: "Competitive positioning",
    body: "Map your portfolio against 3,400 drugs across 811 conditions. Identify gaps before competitors do.",
  },
  {
    tag: "AI",
    title: "Gemini-powered reports",
    body: "Generate board-ready executive briefs and launch-readiness assessments in under 60 seconds.",
  },
  {
    tag: "Safety",
    title: "Risk signal detection",
    body: "Automated low-sentiment flagging across your catalogue. Know which drugs need attention before reviews compound.",
  },
];

export default function Landing() {
  const [stats, setStats] = useState({ reviews: 0, drugs: 0, conditions: 0, rating: 0 });

  useEffect(() => {
    api.get("/dashboard/kpis").then(r => setStats(r.data)).catch(() => {});
  }, []);

  const tickerItems = [
    { label: "Patient Reviews", value: stats.reviews.toLocaleString() },
    { label: "Drugs Tracked",   value: stats.drugs.toLocaleString() },
    { label: "Conditions",      value: stats.conditions.toLocaleString() },
    { label: "Avg Rating",      value: `${stats.rating} / 10` },
    { label: "Status",          value: "Live" },
  ];

  return (
    <div
      className="min-h-screen bg-[#09090B] text-white overflow-x-hidden"
      style={{ fontFamily: "'DM Sans', sans-serif" }}
    >

      {/* ── Hero ── */}
      <section className="max-w-7xl mx-auto px-8 pt-24 pb-16">
        <div
          className="grid gap-16 items-center"
          style={{
            gridTemplateColumns: "1fr 1fr",
            minHeight: "calc(100vh - 6rem)",
          }}
        >

          {/* Left: copy */}
          <div className="flex flex-col justify-center">

            <div className="flex items-center gap-2.5 mb-8">
              <span className="w-1.5 h-1.5 rounded-full bg-[#00D4FF] animate-pulse" />
              <span
                className="text-[10px] font-medium text-[#71717A] uppercase"
                style={{ letterSpacing: "4px" }}
              >
                Pharmaceutical Intelligence Platform
              </span>
            </div>

            <h1
              style={{
                fontFamily: "'DM Serif Display', serif",
                lineHeight: 1.08,
                fontSize: "clamp(40px, 5vw, 68px)",
                textAlign: "left",
              }}
              className="font-normal text-white mb-6"
            >
              Drug analytics
              <br />
              <span style={{ fontStyle: "italic", color: "#A1A1AA" }}>that actually</span>
              <br />
              <span style={{ color: "#00D4FF" }}>moves decisions.</span>
            </h1>

            <p
              className="text-[15px] text-[#71717A] leading-7 mb-10"
              style={{ maxWidth: "420px", textAlign: "left" }}
            >
              Real patient review data, AI-powered synthesis, and commercial
              intelligence — built for pharmaceutical teams who need answers,
              not more dashboards.
            </p>

            <div className="flex items-center gap-4 mb-12">
              <Link
                to="/dashboard"
                className="flex items-center gap-2 px-6 py-3 rounded-lg font-semibold text-sm transition"
                style={{ background: "#00D4FF", color: "#09090B" }}
              >
                Open Dashboard <FaArrowRight style={{ fontSize: "11px" }} />
              </Link>
              <Link
                to="/ai-center"
                className="px-6 py-3 rounded-lg text-sm text-[#A1A1AA] transition"
                style={{ border: "1px solid rgba(255,255,255,0.1)" }}
              >
                Try AI Reports
              </Link>
            </div>

            {/* Stats row */}
            <div
              className="pt-8"
              style={{
                display: "grid",
                gridTemplateColumns: "repeat(4, 1fr)",
                gap: "1.5rem",
                borderTop: "1px solid rgba(255,255,255,0.06)",
              }}
            >
              {[
                { value: stats.reviews.toLocaleString(), label: "Patient reviews" },
                { value: stats.drugs.toLocaleString(),   label: "Drugs tracked" },
                { value: stats.conditions.toLocaleString(), label: "Conditions" },
                { value: `${stats.rating}/10`,           label: "Avg rating" },
              ].map((s, i) => (
                <div key={i} style={{ display: "flex", flexDirection: "column", gap: "2px" }}>
                  <div
                    style={{ fontFamily: "'DM Serif Display', serif", fontSize: "22px", color: "#fff" }}
                    className="tabular-nums"
                  >
                    {s.value}
                  </div>
                  <div style={{ fontSize: "11px", color: "#52525B" }}>{s.label}</div>
                </div>
              ))}
            </div>
          </div>

          {/* Right: hero image */}
          <div style={{ position: "relative", display: "flex", alignItems: "center" }}>
            <div
              style={{
                position: "relative",
                borderRadius: "16px",
                overflow: "hidden",
                border: "1px solid rgba(255,255,255,0.07)",
                width: "100%",
              }}
            >
              <img
                src={hero}
                alt="PharmaInsight dashboard preview"
                style={{ width: "100%", height: "540px", objectFit: "cover", display: "block" }}
              />
              <div
                style={{
                  position: "absolute",
                  inset: 0,
                  background: "linear-gradient(to top, rgba(9,9,11,0.5), transparent)",
                }}
              />
            </div>

            {/* Floating chip */}
            <div
              style={{
                position: "absolute",
                bottom: "24px",
                left: "24px",
                background: "rgba(13,13,13,0.95)",
                backdropFilter: "blur(12px)",
                border: "1px solid rgba(255,255,255,0.08)",
                borderRadius: "12px",
                padding: "16px 20px",
              }}
            >
              <div style={{ fontSize: "10px", color: "#52525B", textTransform: "uppercase", letterSpacing: "3px", marginBottom: "4px" }}>
                Live
              </div>
              <div
                style={{ fontFamily: "'DM Serif Display', serif", fontSize: "24px", color: "#00D4FF" }}
                className="tabular-nums"
              >
                {stats.reviews.toLocaleString()}
              </div>
              <div style={{ fontSize: "11px", color: "#71717A", marginTop: "2px" }}>
                patient reviews analyzed
              </div>
            </div>
          </div>

        </div>
      </section>

      {/* ── Ticker ── */}
      <div style={{ borderTop: "1px solid rgba(255,255,255,0.06)", borderBottom: "1px solid rgba(255,255,255,0.06)", background: "rgba(255,255,255,0.015)", overflow: "hidden" }}>
        <div
          style={{ display: "flex", width: "max-content", animation: "marquee 20s linear infinite" }}
        >
          {[...tickerItems, ...tickerItems, ...tickerItems].map((item, i) => (
            <div key={i} style={{ display: "flex", alignItems: "center", gap: "32px", padding: "14px 40px", flexShrink: 0 }}>
              <span style={{ fontSize: "10px", fontWeight: 500, textTransform: "uppercase", letterSpacing: "3px", color: "#52525B" }}>
                {item.label}
              </span>
              <span style={{ fontSize: "14px", fontWeight: 600, color: "#00D4FF" }} className="tabular-nums">
                {item.value}
              </span>
              <span style={{ width: "1px", height: "12px", background: "rgba(255,255,255,0.1)" }} />
            </div>
          ))}
        </div>
      </div>

      {/* ── Capabilities ── */}
      <section className="max-w-7xl mx-auto px-8 py-24">
        <div
          style={{ display: "flex", alignItems: "baseline", justifyContent: "space-between", borderTop: "1px solid rgba(255,255,255,0.06)", paddingTop: "40px", marginBottom: "48px" }}
        >
          <h2 style={{ fontFamily: "'DM Serif Display', serif", fontSize: "30px", fontWeight: 400, color: "#fff" }}>
            What it does
          </h2>
          <span style={{ fontSize: "10px", color: "#3F3F46", textTransform: "uppercase", letterSpacing: "4px" }}>
            4 core capabilities
          </span>
        </div>

        <div
          style={{
            display: "grid",
            gridTemplateColumns: "1fr 1fr",
            gap: "1px",
            background: "rgba(255,255,255,0.06)",
            borderRadius: "12px",
            overflow: "hidden",
          }}
        >
          {CAPABILITIES.map((c, i) => (
            <div
              key={i}
              className="group"
              style={{ background: "#09090B", padding: "32px", cursor: "default", transition: "background 0.2s" }}
              onMouseEnter={e => e.currentTarget.style.background = "rgba(255,255,255,0.02)"}
              onMouseLeave={e => e.currentTarget.style.background = "#09090B"}
            >
              <span style={{ fontSize: "10px", fontWeight: 700, textTransform: "uppercase", letterSpacing: "3px", color: "#00D4FF", display: "block", marginBottom: "16px" }}>
                {c.tag}
              </span>
              <h3 style={{ fontFamily: "'DM Serif Display', serif", fontSize: "20px", fontWeight: 400, color: "#fff", marginBottom: "12px" }}>
                {c.title}
              </h3>
              <p style={{ fontSize: "14px", color: "#71717A", lineHeight: 1.6 }}>{c.body}</p>
            </div>
          ))}
        </div>
      </section>

      {/* ── Footer ── */}
      <footer style={{ borderTop: "1px solid rgba(255,255,255,0.06)", padding: "24px 0" }}>
        <div className="max-w-7xl mx-auto px-8" style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
          <span style={{ fontSize: "12px", color: "#3F3F46" }}>© 2026 PharmaInsight AI</span>
          <span style={{ fontSize: "12px", color: "#3F3F46" }}>React · FastAPI · Gemini AI</span>
        </div>
      </footer>

      <style>{`
        @keyframes marquee {
          from { transform: translateX(0); }
          to   { transform: translateX(-33.333%); }
        }
      `}</style>

    </div>
  );
}