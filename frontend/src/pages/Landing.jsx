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

      {/* ── Hero: headline left, image right ── */}
      <section className="max-w-7xl mx-auto px-8 pt-28 pb-16">
        <div className="grid lg:grid-cols-2 gap-12 items-center min-h-[calc(100vh-7rem)]">

          {/* Left: copy */}
          <div className="flex flex-col justify-center">

            <div className="flex items-center gap-2.5 mb-8">
              <span className="w-1.5 h-1.5 rounded-full bg-[#00D4FF] animate-pulse" />
              <span className="text-[10px] font-medium text-[#71717A] uppercase tracking-[4px]">
                Pharmaceutical Intelligence Platform
              </span>
            </div>

            <h1
              style={{ fontFamily: "'DM Serif Display', serif", lineHeight: 1.08 }}
              className="text-[52px] lg:text-[68px] font-normal text-white mb-6"
            >
              Drug analytics
              <br />
              <span className="italic text-[#A1A1AA]">that actually</span>
              <br />
              <span style={{ color: "#00D4FF" }}>moves decisions.</span>
            </h1>

            <p className="text-[15px] text-[#71717A] leading-7 max-w-md mb-10">
              Real patient review data, AI-powered synthesis, and commercial
              intelligence — built for pharmaceutical teams who need answers, not more dashboards.
            </p>

            <div className="flex items-center gap-4 mb-14">
              <Link
                to="/dashboard"
                className="flex items-center gap-2 px-6 py-3 bg-[#00D4FF] text-[#09090B] rounded-lg font-semibold text-sm hover:bg-[#00BFEA] transition"
              >
                Open Dashboard <FaArrowRight className="text-xs" />
              </Link>
              <Link
                to="/ai-center"
                className="px-6 py-3 border border-white/10 rounded-lg text-sm text-[#A1A1AA] hover:text-white hover:border-white/20 transition"
              >
                Try AI Reports
              </Link>
            </div>

            {/* Inline stats row */}
            <div className="flex gap-8 pt-8 border-t border-white/[0.06]">
              {[
                { value: stats.reviews.toLocaleString(), label: "Patient reviews" },
                { value: stats.drugs.toLocaleString(),   label: "Drugs tracked" },
                { value: stats.conditions.toLocaleString(), label: "Conditions" },
                { value: `${stats.rating}/10`,           label: "Avg rating" },
              ].map((s, i) => (
                <div key={i}>
                  <div className="text-xl font-bold text-white tabular-nums">{s.value}</div>
                  <div className="text-[11px] text-[#52525B] mt-0.5">{s.label}</div>
                </div>
              ))}
            </div>
          </div>

          {/* Right: hero image */}
          <div className="relative hidden lg:block">
            <div className="relative rounded-2xl overflow-hidden border border-white/[0.07]">
              <img
                src={hero}
                alt="PharmaInsight dashboard preview"
                className="w-full object-cover h-[560px]"
              />
              {/* subtle bottom fade so image bleeds into page bg */}
              <div className="absolute inset-0 bg-gradient-to-t from-[#09090B]/60 via-transparent to-transparent" />
            </div>

            {/* One floating stat chip — just one, not two competing */}
            <div className="absolute bottom-6 left-6 bg-[#111]/90 backdrop-blur border border-white/10 rounded-xl px-5 py-4">
              <div className="text-[10px] text-[#52525B] uppercase tracking-widest mb-1">Live intelligence</div>
              <div className="text-2xl font-bold text-[#00D4FF] tabular-nums">
                {stats.reviews.toLocaleString()}
              </div>
              <div className="text-xs text-[#71717A]">patient reviews analyzed</div>
            </div>
          </div>

        </div>
      </section>

      {/* ── Live data ticker ── */}
      <div className="border-y border-white/[0.06] bg-white/[0.015] overflow-hidden">
        <div
          className="flex w-max"
          style={{ animation: "marquee 20s linear infinite" }}
        >
          {[...tickerItems, ...tickerItems, ...tickerItems].map((item, i) => (
            <div key={i} className="flex items-center gap-8 px-10 py-3.5 shrink-0">
              <span className="text-[10px] font-medium uppercase tracking-[3px] text-[#52525B]">
                {item.label}
              </span>
              <span className="text-sm font-semibold text-[#00D4FF] tabular-nums">
                {item.value}
              </span>
              <span className="w-px h-3 bg-white/10" />
            </div>
          ))}
        </div>
      </div>

      {/* ── Capabilities grid ── */}
      <section className="max-w-7xl mx-auto px-8 py-24">

        <div className="flex items-baseline justify-between border-t border-white/[0.06] pt-10 mb-12">
          <h2
            style={{ fontFamily: "'DM Serif Display', serif" }}
            className="text-3xl font-normal text-white"
          >
            What it does
          </h2>
          <span className="text-[10px] text-[#3F3F46] uppercase tracking-widest">
            4 core capabilities
          </span>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-px bg-white/[0.06] rounded-xl overflow-hidden">
          {CAPABILITIES.map((c, i) => (
            <div
              key={i}
              className="bg-[#09090B] p-8 hover:bg-white/[0.02] transition-colors group cursor-default"
            >
              <span className="text-[10px] font-bold uppercase tracking-[3px] text-[#00D4FF] mb-4 block">
                {c.tag}
              </span>
              <h3
                style={{ fontFamily: "'DM Serif Display', serif" }}
                className="text-xl font-normal text-white mb-3 group-hover:text-[#00D4FF] transition-colors"
              >
                {c.title}
              </h3>
              <p className="text-sm text-[#71717A] leading-6">{c.body}</p>
            </div>
          ))}
        </div>
      </section>

      {/* ── CTA strip ── */}
      <section className="border-t border-white/[0.06]">
        <div className="max-w-7xl mx-auto px-8 py-16 flex flex-col lg:flex-row items-center justify-between gap-8">
          <h2
            style={{ fontFamily: "'DM Serif Display', serif" }}
            className="text-3xl font-normal text-white"
          >
            Ready to look at your portfolio differently?
          </h2>
          <Link
            to="/dashboard"
            className="flex items-center gap-2 px-8 py-4 bg-[#00D4FF] text-[#09090B] rounded-lg font-bold text-sm hover:bg-[#00BFEA] transition shrink-0"
          >
            Open Dashboard <FaArrowRight className="text-xs" />
          </Link>
        </div>
      </section>

      {/* ── Footer ── */}
      <footer className="border-t border-white/[0.06] py-6">
        <div className="max-w-7xl mx-auto px-8 flex items-center justify-between">
          <span className="text-xs text-[#3F3F46]">© 2026 PharmaInsight AI</span>
          <span className="text-xs text-[#3F3F46]">React · FastAPI · Gemini AI</span>
        </div>
      </footer>

      <style>{`
        @keyframes marquee {
          from { transform: translateX(0); }
          to   { transform: translateX(-33.333%); }
      `}</style>

    </div>
  );
}