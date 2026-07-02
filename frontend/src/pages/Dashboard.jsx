import { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import {
  FaHome, FaChartBar, FaFlask, FaBalanceScale,
  FaRobot, FaChartLine, FaFileAlt, FaInfoCircle, FaCheckCircle, FaStar,
} from "react-icons/fa";
import api from "../services/api";

const sidebarItems = [
  { label: "Home",                path: "/",                    icon: <FaHome /> },
  { label: "Dashboard",           path: "/dashboard",           icon: <FaChartBar /> },
  { label: "Drug Explorer",       path: "/drug-explorer",       icon: <FaFlask /> },
  { label: "Compare Drugs",       path: "/compare-drugs",       icon: <FaBalanceScale /> },
  { label: "AI Center",           path: "/ai-center",           icon: <FaRobot /> },
  { label: "Market Intelligence", path: "/market-intelligence", icon: <FaChartLine /> },
  { label: "Reports",             path: "/reports",             icon: <FaFileAlt /> },
  { label: "About",               path: "/about",               icon: <FaInfoCircle /> },
];

function StatBar({ value, max, color = "bg-[#00D4FF]/50" }) {
  const pct = Math.min(100, Math.round((value / max) * 100));
  return (
    <div className="w-full h-px bg-white/[0.06] rounded-full overflow-hidden">
      <div className={`h-full rounded-full ${color}`} style={{ width: `${pct}%` }} />
    </div>
  );
}

export default function Dashboard() {
  const location = useLocation();
  const [kpis, setKpis]                     = useState({ reviews: 0, drugs: 0, conditions: 0, rating: 0 });
  const [chartData, setChartData]           = useState([]);
  const [topDrugs, setTopDrugs]             = useState([]);
  const [ratingDist, setRatingDist]         = useState({ labels: [], values: [] });
  const [loading, setLoading]               = useState(true);

  useEffect(() => {
    (async () => {
      try {
        const [k, ch, td, rd] = await Promise.all([
          api.get("/dashboard/kpis"),
          api.get("/dashboard/charts"),
          api.get("/dashboard/top-drugs"),
          api.get("/dashboard/rating-distribution"),
        ]);
        setKpis(k.data);
        setChartData(
          ch.data.labels.map((label, i) => ({
            condition: label.length > 16 ? label.slice(0, 15) + "…" : label,
            reviews: ch.data.values[i],
          }))
        );
        setTopDrugs(td.data);
        setRatingDist(rd.data);
      } catch (e) {
        console.error(e);
      } finally {
        setLoading(false);
      }
    })();
  }, []);

  const maxChart = chartData[0]?.reviews || 1;
  const maxRating = Math.max(...(ratingDist.values || [1]));

  // Group ratings into Low (1-4), Medium (5-7), High (8-10)
  const ratingGroups = (() => {
    const labels = ratingDist.labels || [];
    const values = ratingDist.values || [];
    let low = 0, mid = 0, high = 0;
    labels.forEach((l, i) => {
      const r = parseFloat(l);
      if (r <= 4) low += values[i];
      else if (r <= 7) mid += values[i];
      else high += values[i];
    });
    const total = low + mid + high || 1;
    return [
      { label: "High rated", range: "8–10", count: high, pct: Math.round((high / total) * 100), color: "bg-emerald-500/70" },
      { label: "Mid rated",  range: "5–7",  count: mid,  pct: Math.round((mid  / total) * 100), color: "bg-amber-500/70" },
      { label: "Low rated",  range: "1–4",  count: low,  pct: Math.round((low  / total) * 100), color: "bg-rose-500/70" },
    ];
  })();

  return (
    <div
      className="flex min-h-screen bg-[#09090B] text-white"
      style={{ fontFamily: "'DM Sans', sans-serif" }}
    >

      {/* ── Sidebar ── */}
      <aside className="w-56 shrink-0 border-r border-white/[0.06] flex flex-col py-7 px-4 gap-8">
        <div className="flex items-center gap-2.5 px-2">
          <div className="w-6 h-6 rounded bg-[#00D4FF] flex items-center justify-center shrink-0">
            <span className="text-[#09090B] text-xs font-black">P</span>
          </div>
          <div>
            <div className="text-sm font-bold leading-none">PharmaInsight</div>
            <div className="text-[9px] text-[#3F3F46] tracking-widest uppercase mt-0.5">Analytics Pro</div>
          </div>
        </div>

        <nav className="flex-1 space-y-0.5">
          {sidebarItems.map((item) => {
            const active = location.pathname === item.path;
            return (
              <Link
                key={item.label}
                to={item.path}
                className={`flex items-center gap-3 px-3 py-2.5 rounded-lg text-[13px] font-medium transition-all ${
                  active
                    ? "bg-[#00D4FF]/10 text-[#00D4FF]"
                    : "text-[#52525B] hover:bg-white/[0.04] hover:text-[#A1A1AA]"
                }`}
              >
                <span className="text-sm">{item.icon}</span>
                {item.label}
              </Link>
            );
          })}
        </nav>

        <div className="rounded-xl border border-white/[0.07] bg-white/[0.02] p-4 space-y-3">
          <div className="text-[10px] font-bold text-[#00D4FF] uppercase tracking-wider">Enterprise</div>
          <p className="text-[11px] text-[#52525B] leading-5">
            Unlock molecular predictive modeling and advanced pipeline scoring.
          </p>
          <button className="w-full py-2 rounded-lg bg-[#00D4FF] text-[#09090B] text-xs font-bold hover:bg-[#00BFEA] transition">
            Upgrade plan
          </button>
        </div>
      </aside>

      {/* ── Main ── */}
      <main className="flex-1 min-w-0 flex flex-col">

        <header className="flex items-center justify-between px-8 py-5 border-b border-white/[0.06]">
          <div>
            <h1
              style={{ fontFamily: "'DM Serif Display', serif" }}
              className="text-2xl font-normal text-white"
            >
              Intelligence Dashboard
            </h1>
            <div className="flex items-center gap-1.5 mt-1 text-[11px] text-[#00D4FF]/70">
              <FaCheckCircle className="text-[9px]" />
              <span>Connected · live data</span>
            </div>
          </div>
          <div className="text-xs text-[#3F3F46]">
            {new Date().toLocaleDateString("en-US", {
              weekday: "long", year: "numeric",
              month: "long", day: "numeric",
            })}
          </div>
        </header>

        <div className="flex-1 overflow-y-auto p-8 space-y-6">

          {/* ── KPIs ── */}
          <div className="grid grid-cols-2 xl:grid-cols-4 gap-3">
            {[
              { label: "Patient Reviews",    value: kpis.reviews.toLocaleString(),    accent: "bg-[#00D4FF]" },
              { label: "Drugs Catalogued",   value: kpis.drugs.toLocaleString(),      accent: "bg-purple-500" },
              { label: "Conditions Tracked", value: kpis.conditions.toLocaleString(), accent: "bg-violet-500" },
              { label: "Avg Drug Rating",    value: kpis.rating,                      accent: "bg-emerald-500" },
            ].map((k, i) => (
              <div key={i} className="rounded-xl bg-white/[0.02] border border-white/[0.06] px-5 py-4 relative overflow-hidden">
                <div className="text-[10px] font-medium text-[#52525B] uppercase tracking-widest mb-3">
                  {k.label}
                </div>
                <div
                  style={{ fontFamily: "'DM Serif Display', serif" }}
                  className="text-3xl font-normal text-white"
                >
                  {loading ? <span className="opacity-20">—</span> : k.value}
                </div>
                <div className={`absolute bottom-0 left-0 h-[2px] w-12 ${k.accent}`} />
              </div>
            ))}
          </div>

          {/* ── Row 2: Conditions chart + Top Drugs ── */}
          <div className="grid grid-cols-3 gap-4">

            {/* Conditions bar chart */}
            <div className="col-span-2 rounded-xl bg-white/[0.02] border border-white/[0.06] p-6 flex flex-col min-h-[300px]">
              <div className="flex items-center justify-between mb-6">
                <div>
                  <h3
                    style={{ fontFamily: "'DM Serif Display', serif" }}
                    className="text-lg font-normal"
                  >
                    Top Conditions by Volume
                  </h3>
                  <p className="text-[11px] text-[#52525B] mt-0.5">
                    Live · patient review distribution
                  </p>
                </div>
                <span className="text-[9px] px-2 py-1 rounded-full bg-[#00D4FF]/10 text-[#00D4FF] font-bold uppercase tracking-wide">
                  Live
                </span>
              </div>

              <div className="flex-1 flex flex-col justify-end gap-2.5">
                {loading
                  ? Array(6).fill(0).map((_, i) => (
                      <div key={i} className="h-5 rounded bg-white/[0.04] animate-pulse" />
                    ))
                  : chartData.map((item, i) => {
                      const pct = Math.round((item.reviews / maxChart) * 100);
                      return (
                        <div key={i} className="flex items-center gap-3">
                          <span className="text-[10px] text-[#52525B] w-28 truncate shrink-0 text-right">
                            {item.condition}
                          </span>
                          <div className="flex-1 h-5 bg-white/[0.03] rounded overflow-hidden">
                            <div
                              className="h-full rounded transition-all duration-700"
                              style={{
                                width: `${pct}%`,
                                background: `rgba(0,212,255,${Math.max(0.2, 0.85 - i * 0.08)})`,
                              }}
                            />
                          </div>
                          <span className="text-[10px] text-[#00D4FF] tabular-nums w-14 shrink-0">
                            {item.reviews >= 1000
                              ? `${(item.reviews / 1000).toFixed(1)}k`
                              : item.reviews}
                          </span>
                        </div>
                      );
                    })}
              </div>
            </div>

            {/* Top Drugs by Rating */}
            <div className="rounded-xl bg-white/[0.02] border border-white/[0.06] p-6 flex flex-col">
              <div className="flex items-center justify-between mb-5">
                <h3
                  style={{ fontFamily: "'DM Serif Display', serif" }}
                  className="text-lg font-normal"
                >
                  Top Drugs
                </h3>
                <span className="text-[9px] px-2 py-1 rounded-full bg-[#00D4FF]/10 text-[#00D4FF] font-bold uppercase tracking-wide">
                  Live
                </span>
              </div>
              <div className="flex-1 space-y-3 overflow-y-auto">
                {loading
                  ? Array(6).fill(0).map((_, i) => (
                      <div key={i} className="h-8 rounded bg-white/[0.03] animate-pulse" />
                    ))
                  : topDrugs.map((drug, i) => (
                      <div key={i} className="flex items-center justify-between gap-2">
                        <div className="min-w-0">
                          <div className="text-[12px] text-[#A1A1AA] truncate max-w-[130px]">
                            {drug.drugName}
                          </div>
                          <div className="text-[10px] text-[#3F3F46] mt-0.5">
                            {drug.reviews.toLocaleString()} reviews
                          </div>
                        </div>
                        <div className="flex items-center gap-1 shrink-0">
                          <FaStar className="text-amber-400 text-[9px]" />
                          <span className="text-[11px] font-semibold text-amber-400 tabular-nums">
                            {drug.average_rating}
                          </span>
                        </div>
                      </div>
                    ))}
              </div>
            </div>

          </div>

          {/* ── Row 3: Rating Distribution ── */}
          <div className="rounded-xl bg-white/[0.02] border border-white/[0.06] p-6">
            <div className="flex items-center justify-between mb-6 pb-5 border-b border-white/[0.06]">
              <div>
                <h2
                  style={{ fontFamily: "'DM Serif Display', serif" }}
                  className="text-xl font-normal"
                >
                  Rating Distribution
                </h2>
                <p className="text-[11px] text-[#52525B] mt-0.5">
                  How patients rate drugs across the catalogue
                </p>
              </div>
              <span className="text-[9px] px-2 py-1 rounded-full bg-[#00D4FF]/10 text-[#00D4FF] font-bold uppercase tracking-wide">
                Live
              </span>
            </div>

            <div className="grid grid-cols-3 gap-6">

              {/* Summary buckets */}
              <div className="col-span-1 space-y-4">
                {loading
                  ? Array(3).fill(0).map((_, i) => (
                      <div key={i} className="h-12 rounded bg-white/[0.03] animate-pulse" />
                    ))
                  : ratingGroups.map((g, i) => (
                      <div key={i} className="space-y-2">
                        <div className="flex items-center justify-between">
                          <div>
                            <span className="text-[12px] text-[#A1A1AA]">{g.label}</span>
                            <span className="text-[10px] text-[#3F3F46] ml-2">{g.range}</span>
                          </div>
                          <span className="text-[11px] font-semibold text-white tabular-nums">
                            {g.pct}%
                          </span>
                        </div>
                        <div className="w-full h-1.5 bg-white/[0.04] rounded-full overflow-hidden">
                          <div
                            className={`h-full rounded-full ${g.color} transition-all duration-700`}
                            style={{ width: `${g.pct}%` }}
                          />
                        </div>
                        <div className="text-[10px] text-[#3F3F46]">
                          {g.count.toLocaleString()} reviews
                        </div>
                      </div>
                    ))}
              </div>

              {/* Full rating breakdown bars */}
              <div className="col-span-2 flex items-end gap-1.5 h-32">
                {loading
                  ? Array(10).fill(0).map((_, i) => (
                      <div key={i} className="flex-1 rounded-t bg-white/[0.04] animate-pulse h-full" />
                    ))
                  : ratingDist.labels.map((label, i) => {
                      const pct = Math.round((ratingDist.values[i] / maxRating) * 100);
                      const r = parseFloat(label);
                      const color = r >= 8
                        ? "rgba(52,211,153,0.6)"
                        : r >= 5
                        ? "rgba(251,191,36,0.6)"
                        : "rgba(251,113,133,0.6)";
                      return (
                        <div key={i} className="flex-1 flex flex-col items-center gap-1">
                          <div
                            className="w-full rounded-t transition-all duration-700"
                            style={{ height: `${pct}%`, background: color, minHeight: "4px" }}
                          />
                          <span className="text-[9px] text-[#3F3F46]">{label}</span>
                        </div>
                      );
                    })}
              </div>

            </div>
          </div>

        </div>
      </main>
    </div>
  );
}